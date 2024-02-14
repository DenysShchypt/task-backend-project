import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { MAIL_FROM_UKRNET, API_KEY_UKRNET, NODE_EMAIL_HOST } = process.env;

const nodemailerConfig = {
  host: NODE_EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAIL_FROM_UKRNET,
    pass: API_KEY_UKRNET,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const { email, text } = data;

  const emailConf = {
    to: "taskpro.project@gmail.com",
    from: MAIL_FROM_UKRNET,
    subject: `${email}`,
    text,
  };

  return transport.sendMail(emailConf);
};
