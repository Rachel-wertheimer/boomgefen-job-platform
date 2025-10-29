require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, text, html }) {
  const msg = { to, from: process.env.MAIL_FROM, subject, text, html };
  try {
    await sgMail.send(msg);
    console.log('Email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) console.error(error.response.body);
  }
}

module.exports = { sendEmail };
