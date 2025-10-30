const { CreateUserBL, FindUserByEmailBL, getDetailsBL, updateSubscriptionBL, deleteUserBL } = require("../BL/users");
const asyncHandler = require("../middleware/asyncHandler");

exports.CreateUser = asyncHandler(async (req, res, next) => {
  try {
    const userId = await CreateUserBL(req.body);
    res.json({ message: 'User registered', userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next('CreateUser failed', 404);
  }
}
)

exports.FindUserByEmail = async (req, res) => {
  try {
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
    const data = await getDetailsBL(req.params.user_id);
    res.status(200).json({
      success: true,
      message: 'getDetails fetched successfully',
      data: data,
    });
  }
  catch (err) {
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
    const userId = Number(req.params.user_id);
    const result = await deleteUserBL(userId);
    res.json({ success: true, message: 'User deleted successfully', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

