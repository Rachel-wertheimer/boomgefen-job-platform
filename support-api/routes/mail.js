const express = require('express');
const { sendMail, submitForm } = require('../controllers/mail');
const router = express.Router();

router.post('/sendMail',sendMail);
router.post('/submitForm',submitForm);
module.exports = router;


