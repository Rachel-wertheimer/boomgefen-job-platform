const { CreateUserProfilesBL } = require("../BL/user_profiles");
const asyncHandler = require("../middleware/asyncHandler");

exports.CreateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        console.log(`Start CreateUserProfile`);
        const userId = Number(req.params.userId);
        const details = req.body;
        const result = await CreateUserProfilesBL(details, userId);
        res.status(201).json({ message: 'User details inserted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
        return next('CreateUser failed', 404);

    }
}

)