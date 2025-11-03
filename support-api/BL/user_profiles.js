const { CreateUserProfilesDAL, getUserByEmailDAL, updatePasswordDAL, updateTemporaryPasswordDAL } = require("../DAL/user_profiles");
const bcrypt = require('bcrypt');

exports.CreateUserProfilesBL = async (details, userId) => {
  try {
    console.log('Start createUserProfilesBL');
    const hashedPassword = await bcrypt.hash(details.password, 10);
    details.password = hashedPassword;

    const result = await CreateUserProfilesDAL(details, userId);
    console.log('End registerUserBL');
    return result;
  } catch (err) {
    console.error('Error in registerUserBL', err);
    throw err;
  }
};

exports.getUserByEmailBL = async (email) => {
  const user = await getUserByEmailDAL(email);
  if (!user) return null;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await updateTemporaryPasswordDAL(user.id, code);
  return { email: user.email, code };
};

exports.updateTemporaryPasswordBL = async (email, code) => {
  const user = await getUserByEmailDAL(email);
  if (!user) return false;
  const temporary_password = await updateTemporaryPasswordDAL(code, user.id);
  return String(temporary_password) === String(code);
};

exports.updatePasswordBL = async (email, newPassword) => {
  const user = await getUserByEmailDAL(email);
  if (!user) return false;
  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePasswordDAL(user.id, hashed);
  return true;
};
