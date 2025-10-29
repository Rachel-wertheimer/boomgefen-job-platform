const { CreateUserDAL, FindUserByEmailDAL, getDetailsDAL, updateSubscriptionDAL, deleteUserDAL, generateResetTokenDAL, updatePasswordByTokenDAL } = require('../DAL/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET;

exports.CreateUserBL = async (user, details) => {
  try {
    console.log('Start registerUserBL');

    if (user.email) {
      user.email = user.email.toLowerCase();
    }

    const userId = await CreateUserDAL(user, details);
    console.log('End registerUserBL');
    return userId;
  } catch (err) {
    console.error('Error in registerUserBL', err);
    throw err;
  }
};

exports.FindUserByEmailBL = async (email, password) => {
  try {
    console.log('Start loginUserBL');

    const user = await FindUserByEmailDAL(email);
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid password');

    if (!user.is_subscribed || !user.subscription_start || !user.subscription_end) {
      return { userId: user.id, error: 'User is not subscribed' };
    }

    const today = new Date();
    const start = new Date(user.subscription_start);
    const end = new Date(user.subscription_end);
    if (today < start || today > end) {
      return { userId: user.id, error: 'Subscription expired' };
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.type,
        email: user.email,
        userName: user.full_name,
        name: user.full_name
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('End loginUserBL');
    return token;
  } catch (err) {
    console.error('Error in loginUserBL', err);
    throw err;
  }
};

exports.getDetailsBL = async (user_id) => {
  try {
    console.log(`Start getDetailsBL`);
    let result = await getDetailsDAL(user_id);
    console.log(`end getDetailsBL`);
    return result;
  }
  catch (err) {
    console.error('Error in getDetailsBL', err);
    throw err;
  }
}

exports.updateSubscriptionBL = async (adId) => {
  const updatedSub = await updateSubscriptionDAL(adId);
  return updatedSub;
};

exports.deleteUserBL = async (userId) => {
  try {
    console.log('Start deleteUserBL');
    const result = await deleteUserDAL(userId);
    console.log('End deleteUserBL');
    return result;
  } catch (err) {
    console.error('Error in deleteUserBL', err);
    throw err;
  }
};

exports.forgotPasswordBL = async (email) => {
  try {
    console.log('Start forgotPasswordBL');

    const user = await FindUserByEmailDAL(email);
    if (!user) throw new Error('User not found');

    // יצירת טוקן רנדומלי ושמירה בבסיס
    const resetToken = await generateResetTokenDAL(user.id);

    // לינק לאיפוס סיסמה (אפשר לשים דומיין אמיתי שלך)
    const resetLink = `https://yourdomain.com/reset-password?token=${resetToken}`;

    // שליחת המייל
    const subject = 'Reset your password';
    const html = `
      <p>Hello ${user.full_name},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;
    await sendEmail({ to: user.email, subject, html });

    console.log(`Reset token sent to ${email}: ${resetToken}`);

    return { success: true, message: 'Password reset token sent to your email.' };
  } catch (err) {
    console.error('Error in forgotPasswordBL', err);
    throw err;
  }
};

// exports.forgotPasswordBL = async (email) => {
//   try {
//     console.log('Start forgotPasswordBL');
//     const user = await FindUserByEmailDAL(email);
//     if (!user) {
//       throw new Error('User not found');
//     }
    
//     const resetToken = await generateResetTokenDAL(user.id);
    
//     // Send email with reset link (would need email service)
//     console.log(`Reset token generated for user ${email}: ${resetToken}`);
    
//     return { success: true, message: 'Password reset token generated. Please check your email.' };
//   } catch (err) {
//     console.error('Error in forgotPasswordBL', err);
//     throw err;
//   }
// };

exports.resetPasswordBL = async (resetToken, newPassword) => {
  try {
    console.log('Start resetPasswordBL');
    
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    const success = await updatePasswordByTokenDAL(resetToken, newPassword);
    
    if (!success) {
      throw new Error('Invalid or expired reset token');
    }
    
    return { success: true, message: 'Password reset successfully' };
  } catch (err) {
    console.error('Error in resetPasswordBL', err);
    throw err;
  }
};