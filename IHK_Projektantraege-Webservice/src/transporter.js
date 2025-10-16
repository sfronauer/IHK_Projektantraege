import nodemailer from 'nodemailer';

const host = process.env.MAIL_HOST;
const user = process.env.MAIL_USERNAME;
const pass = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: host, // for example: "smtp.gmail.com"
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: user, // for example: 'foo@gmail.com'
    pass: pass, // password or app password
  },
  tls: {
    rejectUnauthorized: false, // Disable certificate verification
  },
});

export default transporter;
