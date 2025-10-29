const express = require('express');
const { CreateUserProfile, getUserByEmail, updateTemporaryPassword, updatePassword } = require('../controllers/user_profiles');
const router = express.Router();

router.post('/insert/:userId', CreateUserProfile);
router.post('/getUserByEmail', getUserByEmail);
router.post('/updateTemporaryPassword', updateTemporaryPassword);
router.post('/updatePassword', updatePassword);

module.exports = router;


