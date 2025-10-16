import express from 'express';
import db from '../db.js';
import * as dbUtil from '../utils/dbUtils.js';
import * as ldapUtil from '../utils/ldapUtils.js';
import ResponseModel from '../models/responseModel.js';
import ErrorResponseModel from '../models/errorResponseModel.js';

const getRoute = express.Router();
const ProjectProposal = db.projectProposal;

getRoute.get('/getAllTopics', async (req, res) => {
  const allProposals = await ProjectProposal.findAll({ attributes: ['topic'] });
  return res.status(200).send(new ResponseModel(true, 'Every Topic', allProposals));
});

getRoute.get('/getIdOfCurrentProjectProposal', async (req, res) => {
  try {
    const username = req.query.ldapUsernameStudent;
    const id = await dbUtil.getIdOfCurrentProjectProposal(username);
    return res.status(200).send(new ResponseModel(true, '', { id: id }));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/getCurrentProjectProposal', async (req, res) => {
  try {
    const username = req.query.ldapUsernameStudent;
    const id = await dbUtil.getIdOfCurrentProjectProposal(username);
    const currentProposal = await ProjectProposal.findByPk(id, {
      include: db.attachment,
    });
    const proposal = dbUtil.mapProjectProposal(currentProposal);
    return res.status(200).send(new ResponseModel(true, '', proposal));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/getProjectProposalById', async (req, res) => {
  try {
    const id = req.query.id;
    const currentProposal = await ProjectProposal.findByPk(id, {
      include: db.attachment,
    });
    const proposal = dbUtil.mapProjectProposal(currentProposal);
    return res.status(200).send(new ResponseModel(true, '', proposal));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/getPastProjectProposals', async (req, res) => {
  try {
    const ldapUsername = req.query.ldapUsernameStudent;
    const pastProposals = await ProjectProposal.findAll({
      where: {
        ldapUsernameStudent: ldapUsername,
        forChecking: true,
      },
      include: db.attachment,
    });
    const proposals = pastProposals.map(dbUtil.mapProjectProposal);

    return res.status(200).send(new ResponseModel(true, '', proposals));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/verifyUserToken', async (req, res) => {
  try {
    // Nur wenn der Token valide ist, kommt man an diesem Punkt, da checkJwt keinen Fehler geworfen hat
    const data = {
      authenticated: true,
      ...req.auth,
    };
    return res.status(200).send(new ResponseModel(true, 'Token is valid', data));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/getAllTeachers', async (req, res) => {
  try {
    const data = await ldapUtil.getAllTeachers();
    return res.status(200).send(new ResponseModel(true, 'All Teachers', data));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

getRoute.get('/getAllProjectPropsalsForChecking', async (req, res) => {
  try {
    const data = req.query;
    const propsalsForChecking = await ProjectProposal.findAll({
      where: {
        ldapUsernameTeacher: data.ldapUsernameTeacher,
        forChecking: true,
        accepted: null,
      },
      include: db.attachment,
    });
    const proposals = propsalsForChecking.map(dbUtil.mapProjectProposal);
    return res
      .status(200)
      .send(new ResponseModel(true, 'All Propsals for the teacher, that have to be checked', proposals));
  } catch (error) {
    return res.status(500).send(new ErrorResponseModel(error));
  }
});

export default getRoute;
