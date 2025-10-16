import express from 'express';
import db from '../db.js';
import * as dbUtils from '../utils/dbUtils.js';
import upload from '../middleware/upload.js';
import ResponseModel from '../models/responseModel.js';
import ErrorResponseModel from '../models/errorResponseModel.js';
import sendMail from '../utils/sendMail.js';
import * as mailTexts from '../utils/mailTexts.js';
import { getLdapUserEntry } from '../utils/ldapUtils.js';

const putRoute = express.Router();
const ProjectProposal = db.projectProposal;
const Attachment = db.attachment;

putRoute.put('/updateProjectProposal', upload.array('attachments'), async (req, res) => {
  try {
    const data = req.body;
    const id = await dbUtils.getIdOfCurrentProjectProposal(data.ldapUsernameStudent);

    if (id === -1) {
      return res.status(400).send(new ErrorResponseModel('No valid project proposal to update was found'));
    }

    const result = await db.sequelize.transaction(async (t) => {
      // Update the ProjectProposal
      await ProjectProposal.update(
        {
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
        {
          where: {
            id: id,
          },
          transaction: t,
        }
      );
      // Then delete all existing Attachments
      await Attachment.destroy(
        {
          where: {
            ProjectProposalId: id,
          },
        },
        { transaction: t }
      );
      // Then create the new Attachments
      for (let i = 0; i < data.attachments.length; i++) {
        await Attachment.create(
          {
            filename: data.attachments[i].filename,
            filedata: data.attachments[i].filedata,
            filetype: data.attachments[i].filetype,
            ProjectProposalId: id,
          },
          { transaction: t }
        );
      }
    });
    return res.status(200).send(new ResponseModel(true, 'Proposal was updated!', {}));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

putRoute.put('/setProposalForChecking', async (req, res) => {
  try {
    const data = req.query;

    if (req.auth.ldapUsername !== data.ldapUsernameStudent) {
      return res.status(401).send(new ErrorResponseModel('The token is not vaild for this User'));
    }

    if (req.auth.role !== 'pupil') {
      return res.status(401).send(new ErrorResponseModel('Only Students can send ProjectProposals'));
    }

    const id = await dbUtils.getIdOfCurrentProjectProposal(data.ldapUsernameStudent);
    if (id === -1) {
      return res.status(400).send(new ErrorResponseModel('No valid project proposal to update was found'));
    }

    // Check if every required field is set to a value
    const currentProposal = (
      await ProjectProposal.findByPk(id, {
        attributes: { exclude: ['forChecking', 'accepted', 'teacherComment'] },
      })
    ).toJSON();
    if (Object.values(currentProposal).includes(null)) {
      return res.status(400).send(new ErrorResponseModel('All required Fields have to be set'));
    }

    const student = await getLdapUserEntry(data.ldapUsernameStudent);
    const teacher = await getLdapUserEntry(currentProposal.ldapUsernameTeacher);

    if (student === null || teacher === null) {
      return res
        .status(400)
        .send(new ErrorResponseModel('There has been an error with the ldapUsername or LdapServer'));
    }

    await db.sequelize.transaction(async (t) => {
      await ProjectProposal.update(
        { forChecking: true },
        {
          where: {
            id: id,
          },
          transaction: t,
        }
      );

      // send mail after adding new Entry
      const mailAdress = teacher.mail;
      const subject = 'Neuer Projektantrag';
      const text = mailTexts.proposalForChecking(student.displayName, teacher.displayName);
      // NOCH AUSKOMMENTIERT LASSEN; SONST WERDEN DIE GANZE ZEIT LEHRER ANGEMAILED!!!1!
      // await sendMail(mailAdress, subject, text);
      await sendMail('Michael.Mielenz@edvschule-plattling.de', subject, text);
    });

    return res.status(200).send(new ResponseModel(true, 'Proposal was successfully submitted!', {}));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

putRoute.put('/setProposalOutcome', async (req, res) => {
  try {
    const dataQuery = req.query;
    const dataBody = req.body;
    const id = await dbUtils.getIdOfCheckingProjectProposal(dataQuery.ldapUsernameStudent);

    if (id === -1) {
      return res.status(400).send(new ErrorResponseModel('No valid project proposal to update was found'));
    }

    const student = await getLdapUserEntry(dataQuery.ldapUsernameStudent);
    if (student === null) {
      return res
        .status(400)
        .send(new ErrorResponseModel('There has been an error with the ldapUsername or LdapServer'));
    }

    let acceptedValue;
    if (dataQuery.accepted === 'true') {
      acceptedValue = true;
    } else if (dataQuery.accepted === 'false') {
      acceptedValue = false;
    } else {
      return res.status(400).send(new ErrorResponseModel('No bool was given as a Parameter for "accepted"'));
    }

    await db.sequelize.transaction(async (t) => {
      await ProjectProposal.update(
        {
          accepted: acceptedValue,
          teacherComment: dataBody.teacherComment,
        },
        {
          where: {
            id: id,
          },
          transaction: t,
        }
      );

      const mailAdress = student.mail;
      const subject = 'Ihr Projektantrag wurde bearbeitet';
      const text = acceptedValue
        ? mailTexts.proposalAccepted(student.displayName)
        : mailTexts.proposalRejected(student.displayName);
      // NOCH AUSKOMMENTIERT LASSEN; SONST WERDEN DIE GANZE ZEIT LEUTE ANGEMAILED!!!1!
      // await sendMail(mailAdress, subject, text);
      await sendMail('Michael.Mielenz@edvschule-plattling.de', subject, text);
    });
    return res.status(200).send(new ResponseModel(true, 'The Outcome of the Proposal was set!', {}));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

export default putRoute;
