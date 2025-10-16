import db from '../db.js';

const ProjectProposal = db.projectProposal;

export const getIdOfCurrentProjectProposal = async (ldapUsernameStudent) => {
  const result = await ProjectProposal.findOne({
    attributes: ['id'],
    where: {
      ldapUsernameStudent: ldapUsernameStudent,
      forChecking: false,
      accepted: null,
    },
  });

  return result === null ? -1 : result.id;
};

export const getIdOfCheckingProjectProposal = async (ldapUsernameStudent) => {
  const result = await ProjectProposal.findOne({
    attributes: ['id'],
    where: {
      ldapUsernameStudent: ldapUsernameStudent,
      forChecking: true,
      accepted: null,
    },
  });

  return result === null ? -1 : result.id;
};

export const getUserHasSubmittedProposalForChecking = async (ldapUsernameStudent) => {
  const id = await getIdOfCheckingProjectProposal(ldapUsernameStudent);
  return id === -1 ? false : true;
};

export const mapProjectProposal = (projectProposal) => {
  if (projectProposal) {
    const mappedProposal = projectProposal.toJSON();
    mappedProposal.Attachments = mappedProposal.Attachments.map((att) => ({
      ...att,
      filedata: att.filedata.toString(), // Buffer -> Base64
    }));
    return mappedProposal;
  } else {
    return {};
  }
};
