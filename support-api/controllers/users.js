const { CreateUserBL, FindUserByEmailBL, getDetailsBL, updateSubscriptionBL, deleteUserBL, forgotPasswordBL, resetPasswordBL } = require("../BL/users");
const asyncHandler = require("../middleware/asyncHandler");

exports.CreateUser = asyncHandler(async (req, res, next) => {
  try {
    console.log(`Start CreateUser`);
    const userId = await CreateUserBL(req.body);
    res.json({ message: 'User registered', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
    return next('CreateUser failed', 404);

  }
}
)

exports.FindUserByEmail = async (req, res) => {
  try {
    console.log(`Start FindUserByEmail controller`);
    const result = await FindUserByEmailBL(req.body.email, req.body.password);
    if (result.error) {
      return res.status(200).json({ error: result.error, userId: result.userId });
    }
    res.json({ token: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDetails = asyncHandler(async (req, res, next) => {
  try {
    console.log(`Start getDetails`);
    const data = await getDetailsBL(req.params.user_id);
    res.status(200).json({
      success: true,
      message: 'getDetails fetched successfully',
      data: data,
    });
  }
  catch (err) {
    console.log('error in getDetails', err);
    return next('getDetails failed', 404);
  }
})

exports.updateSubscriptionController = async (req, res) => {
  try {
    const userId = Number(req.params.user_id); // <-- כאן

    const updatedSub = await updateSubscriptionBL(userId);

    res.json({ success: true, ad: updatedSub });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log('Start deleteUser controller');
    const userId = Number(req.params.user_id);
    const result = await deleteUserBL(userId);
    res.json({ success: true, message: 'User deleted successfully', result });
  } catch (err) {
    console.error('Error in deleteUser controller:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    console.log('Start forgotPassword controller');
    const { email } = req.body;
    const result = await forgotPasswordBL(email);
    res.json(result);
  } catch (err) {
    console.error('Error in forgotPassword controller:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log('Start resetPassword controller');
    const { resetToken, newPassword } = req.body;
    const result = await resetPasswordBL(resetToken, newPassword);
    res.json(result);
  } catch (err) {
    console.error('Error in resetPassword controller:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};