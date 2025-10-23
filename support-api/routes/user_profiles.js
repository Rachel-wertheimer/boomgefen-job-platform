const express = require('express');
const { CreateUserProfile } = require('../controllers/user_profiles');
const router = express.Router();

router.post('/insert/:userId', CreateUserProfile);

module.exports = router;


