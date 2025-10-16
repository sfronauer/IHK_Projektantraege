import express from 'express';
import db from '../db.js';
import * as dbUtils from '../utils/dbUtils.js';
import ResponseModel from '../models/responseModel.js';
import ErrorResponseModel from '../models/errorResponseModel.js';
import upload from '../middleware/upload.js';
import krb5 from 'krb5';
import { getLdapUserEntry } from '../utils/ldapUtils.js';
import jwt from 'jsonwebtoken';

const postRoute = express.Router();
const ProjectProposal = db.projectProposal;
const Attachment = db.attachment;

postRoute.post('/addNewProjectProposal', upload.array('attachments'), async (req, res) => {
  try {
    const data = req.body;

    // check if the user has an accepted proposal
    const acceptedProposal = await ProjectProposal.findOne({
      attributes: ['id'],
      where: {
        ldapUsernameStudent: data.ldapUsernameStudent,
        accepted: true,
      },
    });
    if (acceptedProposal !== null) {
      return res.status(400).send(new ErrorResponseModel('The user has an accepted proposal'));
    }

    // check if there is already an open proposal
    if ((await dbUtils.getIdOfCurrentProjectProposal(data.ldapUsernameStudent)) !== -1) {
      return res.status(400).send(new ErrorResponseModel('The user already has an open proposal'));
    }

    // check if the user already has an proposal for checking
    if (await dbUtils.getUserHasSubmittedProposalForChecking(data.ldapUsernameStudent)) {
      return res.status(400).send(new ErrorResponseModel('The user already has a proposal for checking'));
    }

    const result = await db.sequelize.transaction(async (t) => {
      // Creating the new ProjectProposal
      const newProjectProposal = await ProjectProposal.create(
        {
          ldapUsernameStudent: data.ldapUsernameStudent,
          ldapUsernameTeacher: data.ldapUsernameTeacher,
          general: data.general,
          topic: data.topic,
          projectStart: data.projectStart,
          projectEnd: data.projectEnd,
          initial: data.initial,
          goal: data.goal,
          implementation: data.implementation,
          timeManagement: data.timeManagement,
          presentationTools: data.presentationTools,
        },
        { transaction: t }
      );
      // Creating the Attachments
      const files = [];
      for (let i = 0; i < data.attachments.length; i++) {
        files.push(
          await Attachment.create(
            {
              filename: data.attachments[i].filename,
              filedata: data.attachments[i].filedata,
              filetype: data.attachments[i].filetype,
            },
            { transaction: t }
          )
        );
      }
      // Set the foreignKey
      await newProjectProposal.addAttachments(files, { transaction: t });
    });
    return res.status(200).send(new ResponseModel(true, 'Data successfuly added!', {}));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

postRoute.post('/authentication', async (req, res) => {
  try {
    const ldapName = req.body.ldapUserName;
    const passwd = req.body.password;

    // Folgender Codeabschnit ist nur für die Softwareabnahm--------------------------
    if (ldapName === 'testlehr' && passwd === 'Tester1') {
      res.cookie(
        'token',
        jwt.sign(
          {
            ldapUsername: ldapName,
            role: 'teacher',
            mailAdress: 'Michael.Mielenz@edvschule-plattling.de',
          },
          process.env.TOKEN_KEY,
          { expiresIn: '7d' }
        ),
        {
          httpOnly: false,
          sameSite: 'Lax',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days in ms
        }
      );
      return res.status(200).send(new ResponseModel(true, '', { authenticated: true, role: 'teacher' }));
    }
    // -----------------------------------------------------

    try {
      await krb5.kinit({
        principal: ldapName,
        password: passwd,
      });
    } catch (error) {
      return res.status(200).send(
        new ResponseModel(false, `Username or Password is invalid: ${error}`, {
          authenticated: false,
          role: '',
        })
      );
    }

    const entry = await getLdapUserEntry(ldapName);
    if (entry === null) {
      return res
        .status(500)
        .send(
          new ResponseModel(false, `Error with the LdapServer: ${error}`, { authenticated: false, role: '' })
        );
    }

    const role = entry.dn.includes('Lehrer') ? 'teacher' : 'pupil';
    const mailAdress = entry.mail;
    const key = process.env.TOKEN_KEY;
    const data = {
      ldapUsername: ldapName,
      role: role,
      mailAdress: mailAdress,
    };
    const token = jwt.sign(data, key, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: false,
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days in ms
    });

    return res.status(200).send(new ResponseModel(true, '', { authenticated: true, role: role }));
  } catch (error) {
    return res
      .status(500)
      .send(new ResponseModel(false, `ServerError: ${error}`, { authenticated: false, role: '' }));
  }
});

export default postRoute;
