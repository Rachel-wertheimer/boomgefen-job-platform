const functionDB = require('../functionUser');

exports.CreateUserDAL = async (user) => {
    try {
        console.log('start create_user');
        const userId = await functionDB.insertUser(user);
        console.log('end create_user');
        return userId;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

exports.FindUserByEmailDAL = async (email) => {
    try {
        console.log('start findUserByEmail DAL');
        const user = await functionDB.getUserByEmail(email); // לא { rows }
        console.log('end findUserByEmail DAL');
        return user;
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

exports.getDetailsDAL = async (userId) => {
    console.log("start get_detailsDAL");
    try {
      const result = await functionDB.getUserDetailsByID(userId);
      console.log("end get_detailsDAL");
      return result;
    } catch (err) {
      console.error("Error fetching get_detailsDAL:", err);
      throw err; 
    }
  };

exports.updateSubscriptionDAL = async (adId) => {
    try {
        const newSub = await functionDB.update_subscription(adId);
        return newSub;
    } catch (error) {
        console.error('Error update_subscription:', error);
        throw error;
    }
};

exports.deleteUserDAL = async (userId) => {
    try {
      console.log('start deleteUserDAL');
      const result = await functionDB.deleteUserByID(userId);
      console.log('end deleteUserDAL');
      return result;
    } catch (error) {
      console.error('Error deleting user in DAL:', error);
      throw error;
    }
  };

exports.generateResetTokenDAL = async (userId) => {
  try {
    console.log('start generateResetTokenDAL');
    const token = await functionDB.generateResetToken(userId);
    console.log('end generateResetTokenDAL');
    return token;
  } catch (error) {
    console.error('Error generating reset token in DAL:', error);
    throw error;
  }
};

exports.updatePasswordByTokenDAL = async (resetToken, newPassword) => {
  try {
    console.log('start updatePasswordByTokenDAL');
    const result = await functionDB.updatePasswordByToken(resetToken, newPassword);
    console.log('end updatePasswordByTokenDAL');
    return result;
  } catch (error) {
    console.error('Error updating password by token in DAL:', error);
    throw error;
  }
};