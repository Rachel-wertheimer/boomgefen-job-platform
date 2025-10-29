const { CreateUserProfilesBL, getUserByEmailBL, updateTemporaryPasswordBL, updatePasswordBL } = require("../BL/user_profiles");
const asyncHandler = require("../middleware/asyncHandler");

exports.CreateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const details = req.body;
    const result = await CreateUserProfilesBL(details, userId);
    res.status(201).json({ message: 'User details inserted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next('CreateUser failed', 404);
  }

})
exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await getUserByEmailBL(email);
    if (!result)
      return res.status(200).json({ message: "אם המייל קיים – נשלח קוד לאיפוס" });

    return res.status(200).json({ 
      message: "אם המייל קיים – נשלח קוד לאיפוס",
      code: result.code 
    });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בשליחת קוד איפוס" });
  }
};

exports.updateTemporaryPassword = async (req, res) => {
  const { email, code } = req.body;
  try {
    const isValid = await updateTemporaryPasswordBL(email, code);
    if (!isValid)
      return res.status(400).json({ message: "קוד לא תקף או שגוי" });
    res.status(200).json({ message: "קוד תקף, ניתן לשנות סיסמה" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const success = await updatePasswordBL(email, code, newPassword);
    if (!success)
      return res.status(400).json({ message: "קוד לא תקף או שפג תוקף" });
    res.status(200).json({ message: "הסיסמה עודכנה בהצלחה" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

