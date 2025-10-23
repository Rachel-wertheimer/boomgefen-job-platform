const { CreateUserProfilesDAL } = require("../DAL/user_profiles");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.CreateUserProfilesBL = async ( details ,userId) => {
  try {
    console.log('Start createUserProfilesBL');
    const hashedPassword = await bcrypt.hash(details.password, 10);
    details.password = hashedPassword;

    const result = await CreateUserProfilesDAL(details , userId);
    console.log('End registerUserBL');
    return result;
  } catch (err) {
    console.error('Error in registerUserBL', err);
    throw err;
  }
};