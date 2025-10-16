import transporter from '../transporter.js';

const mailAdressSender = process.env.MAIL_ADRESS;
const mailAliasSender = process.env.MAIL_ALIAS;

const sendMail = async (mailAdress, subject, text) => {
  await transporter.sendMail({
    from: `"${mailAliasSender}" <${mailAdressSender}>`, // sender address
    to: mailAdress,
    subject: subject,
    text: text,
  });
};

export default sendMail;
