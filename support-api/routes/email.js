const express = require('express');
const { sendDynamicEmail } = require('../controllers/mail');

const router = express.Router();

router.post('/send', sendDynamicEmail);

module.exports = router;
