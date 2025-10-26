const nodemailer = require("nodemailer");
const { handleFormSubmission } = require("../services/form");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 20000, // 20 שניות
});
transporter.verify((err, success) => {
  if (err) console.error("Gmail connection failed:", err);
  else console.log("Gmail connection successful!");
});

exports.sendMail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
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