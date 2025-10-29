const nodemailer = require("nodemailer");
const { handleFormSubmission } = require("../services/form");

// Create transporter only if mail credentials are provided
let transporter = null;
if (process.env.MAIL_USER && process.env.MAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    connectionTimeout: 20000,
  });
  
  transporter.verify((err, success) => {
    if (err) console.error("Gmail connection failed:", err);
    else console.log("Gmail connection successful!");
  });
} else {
  console.log("Mail service disabled - no credentials provided");
}

exports.sendMail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    if (!transporter) {
      console.log("Mail service not available - skipping email send");
      console.log(`Would have sent: To: ${to}, Subject: ${subject}, Text: ${text}`);
      return res.status(200).json({ message: "Mail service not available in this environment" });
    }

    await transporter.sendMail({
      from: `"BOOM & גפן" <${process.env.MAIL_USER}>`, 
      to,
      subject,
      text,
    });
    res.status(200).json({ message: "המייל נשלח בהצלחה" });
  } catch (err) {
    console.error("שגיאה בשליחת מייל:", err);
    res.status(500).json({ error: "נכשל בשליחת המייל" });
  }
};

exports.submitForm = async (req, res) => {
  const formData = req.body;
  if (!formData || !formData.fullName || !formData.email) {
    return res.status(400).json({ message: 'Missing required form data.' });
  }
  try {
    await handleFormSubmission(formData);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Submission process failed:', error.message);
    res.status(500).json({ message: 'An error occurred while submitting the form.' });
  }
};