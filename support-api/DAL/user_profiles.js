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