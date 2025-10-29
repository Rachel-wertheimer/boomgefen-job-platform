const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { handleFormSubmission } = require("../services/form");

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("✅ SendGrid initialized successfully!");
} else if (process.env.MAIL_USER && process.env.MAIL_PASS) {
  console.log("Using Gmail/Nodemailer");
} else {
  console.log("⚠️ Mail service disabled - no credentials provided");
}

// Legacy Gmail transporter for backward compatibility
let transporter = null;
if (process.env.MAIL_USER && process.env.MAIL_PASS && !process.env.SENDGRID_API_KEY) {
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
}

exports.sendMail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Try SendGrid first if available
    if (process.env.SENDGRID_API_KEY) {
      console.log(`📧 Sending email via SendGrid to: ${to}`);

      const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL || "boom.gefen.hevy@gmail.com",
        subject,
        text,
      };

      await sgMail.send(msg);
      console.log("✅ Email sent successfully via SendGrid");
      return res.status(200).json({ message: "המייל נשלח בהצלחה" });
    }

    // Fallback to Gmail/Nodemailer
    if (transporter) {
      await transporter.sendMail({
        from: `"BOOM & גפן" <${process.env.MAIL_USER}>`,
        to,
        subject,
        text,
      });
      return res.status(200).json({ message: "המייל נשלח בהצלחה" });
    }

    // No mail service configured
    console.log("⚠️ Mail service not available - skipping email send");
    console.log(`Would have sent: To: ${to}, Subject: ${subject}, Text: ${text}`);
    return res.status(200).json({
      message: "Mail service not configured. Please add SENDGRID_API_KEY to environment variables."
    });

  } catch (err) {
    console.error("❌ Error sending email:", err);
    return res.status(500).json({ error: "נכשל בשליחת המייל: " + err.message });
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