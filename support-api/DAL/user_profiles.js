const functionDB = require('../functionUserProfile');

exports.CreateUserProfilesDAL = async (details, userId) => {
    try {
        console.log('start create_user');
        const result = await functionDB.insertUserDetails(details, userId);
        console.log('end create_user');
        return result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.getUserByEmailDAL = async (email) => {
    try {
        console.log('start getUserByEmailDAL');
        const result = await functionDB.getUserByEmail(email);
        console.log('end getUserByEmailDAL');
        return result;
    }
    catch (error) {
        console.error('Error getUserByEmailDAL:', error);
        throw error;
    }
};
exports.updateTemporaryPasswordDAL = async (code,userId ) => {
    try {
        console.log('start updateTemporaryPasswordDAL');
        const result = await functionDB.updateTemporaryPassword(code, userId);
        console.log('end updateTemporaryPasswordDAL');
        return result;
    }
    catch (error) {
        console.error('Error updateTemporaryPasswordDAL:', error);
        throw error;
    }
};
exports.updatePasswordDAL = async (userId , hash) => {
    try {
        console.log('start updatePasswordDAL');
        const result = await functionDB.updatePassword(userId , hash);
        console.log('end updatePasswordDAL');
        return result;
    }
    catch (error) {
        console.error('Error updatePassword:', error);
        throw error;
    }
};
