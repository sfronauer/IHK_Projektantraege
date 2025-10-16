const urlFrontend = process.env.URL_FRONTEND;

const mailForm = (receiverName, mailText) => {
  return `Hallo ${receiverName},

${mailText}

Mit freundlichen Grüßen
Ihr Projektantragssystem`;
};

export const proposalForChecking = (studentName, teacherName) => {
  return mailForm(
    teacherName,
    `Der Schüler / Die Schülerin ${studentName} hat einen neuen Projektantrag für die Trainingsfirma gestellt.
Unter ${urlFrontend} können Sie diesen bearbeiten.`
  );
};

export const proposalRejected = (studentName) => {
  return mailForm(
    studentName,
    `Ihr Projektantrag wurde leider abgelehnt.
Die Begründung finden Sie unter ${urlFrontend}.

Bitte stellen Sie bald einen überarbeiteten Antrag.`
  );
};

export const proposalAccepted = (studentName) => {
  return mailForm(
    studentName,
    `Ihr Projektantrag wurde angenommen.
Unter ${urlFrontend} finden Sie Ihren Antrag und können, wenn vorhanden, den Kommentar des Lehrers nachlesen.

Viel Erfolg mit dem Projekt!`
  );
};
