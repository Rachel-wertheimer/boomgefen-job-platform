const { sendEmail } = require("../services/sendEmail");

async function sendDynamicEmail(req, res) {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  await sendEmail({ to, subject, text, html });
  res.status(200).json({ success: true, message: 'Email sent' });
}

module.exports = { sendDynamicEmail };
