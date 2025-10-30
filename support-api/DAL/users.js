const functionDB = require('../functionUser');

exports.CreateUserDAL = async (user) => {
    try {
        const userId = await functionDB.insertUser(user);
        return userId;
    }
    catch (error) {
        throw error;
    }
};

exports.FindUserByEmailDAL = async (email) => {
    try {
        const user = await functionDB.getUserByEmail(email); 
        return user;
    }
    catch (error) {
        throw error;
    }
};

exports.getDetailsDAL = async (userId) => {
    try {
      const result = await functionDB.getUserDetailsByID(userId);
      return result;
    } catch (err) {
      throw err; 
    }
  };

exports.updateSubscriptionDAL = async (adId) => {
    try {
        const newSub = await functionDB.update_subscription(adId);
        return newSub;
    } catch (error) {
        throw error;
    }
};

exports.deleteUserDAL = async (userId) => {
    try {
      const result = await functionDB.deleteUserByID(userId);
      return result;
    } catch (error) {
      throw error;
    }
  };

