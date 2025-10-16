export const endpoints = Object.freeze({
    Login: '/authentication',
    AddNewProjectProposal: '/addNewProjectProposal',
    GetAllTopics: '/getAllTopics',
    GetIdOfCurrentProjectProposal: '/getIdOfCurrentProjectProposal',
    GetCurrentProjectProposal: 'getCurrentProjectProposal?ldapUsernameStudent=',
    GetPastProjectProposals: '/getPastProjectProposals?ldapUsernameStudent=',
    SetProposalForChecking: '/setProposalForChecking?ldapUsernameStudent=',
    SetProposalOutcome: '/setProposalOutcome',
    UpdateProposal: '/updateProjectProposal',
    VerifyUserToken: '/verifyUserToken',
    GetAllTeachers: '/getAllTeachers',
    GetAllProjectPropsalsForChecking: '/getAllProjectPropsalsForChecking?ldapUsernameTeacher=',
    SetProposalOutcome: '/setProposalOutcome',
    GetProposalById: 'getProjectProposalById?id='
});