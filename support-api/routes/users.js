const express = require('express');
const { CreateUser, FindUserByEmail, getDetails, updateSubscriptionController, deleteUser, } = require('../controllers/users');
const router = express.Router();

router.post('/createUser', CreateUser);
router.post("/login", FindUserByEmail);
router.get('/getDetails/:user_id', getDetails);
router.put('/subscription_start/:user_id', updateSubscriptionController);
router.put('/subscription_start/:user_id', updateSubscriptionController);
router.delete('/deleteUser/:user_id', deleteUser);

module.exports = router;


