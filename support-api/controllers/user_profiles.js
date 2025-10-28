const { CreateUserProfilesBL, getUserByEmailBL, updateTemporaryPasswordBL, updatePasswordBL } = require("../BL/user_profiles");
const asyncHandler = require("../middleware/asyncHandler");
const { sendMail } = require("./mail");

exports.CreateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    console.log(`Start CreateUserProfile`);
    const userId = Number(req.params.userId);
    const details = req.body;
    const result = await CreateUserProfilesBL(details, userId);
    res.status(201).json({ message: 'User details inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
    return next('CreateUser failed', 404);
  }
}
)

exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getUserByEmailBL(email);
    if (!result)
      return res.status(200).json({ message: "אם המייל קיים – נשלח קוד לאיפוס" });

    // הכנת "request" מלאכותי עבור sendMail
    const fakeReq = {
      body: {
        to: result.email,
        subject: "קוד לאיפוס סיסמה",
        text: `קוד האימות שלך הוא: ${result.code}`,
      },
    };

    // קריאה לפונקציה הקיימת
    await sendMail(fakeReq, res);

    // אין צורך לשלוח שוב res.status כאן כי sendMail שולחת כבר תגובה
  } catch (err) {
    console.error("שגיאה בשליחת קוד איפוס:", err);
    res.status(500).json({ error: "שגיאה בשליחת קוד איפוס" });
  }
};


exports.updateTemporaryPassword = async (req, res) => {
  const { email, code } = req.body;
  const isValid = await updateTemporaryPasswordBL(email, code);
  if (!isValid)
    return res.status(400).json({ message: "קוד לא תקף או שגוי" });
  res.status(200).json({ message: "קוד תקף, ניתן לשנות סיסמה" });
};

exports.updatePassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const success = await updatePasswordBL(email, code, newPassword);
  if (!success)
    return res.status(400).json({ message: "קוד לא תקף או שפג תוקף" });
  res.status(200).json({ message: "הסיסמה עודכנה בהצלחה" });
};

