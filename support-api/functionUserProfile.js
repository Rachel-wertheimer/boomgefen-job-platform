const pool = require("./db");
const changeTracker = require("../services/changeTracking");

exports.insertUserDetails = async (details, userId) => {
  // Check if profile already exists
  const [existing] = await pool.query(
    `SELECT user_id FROM user_profiles WHERE user_id = ?`,
    [userId]
  );
  
  if (existing && existing.length > 0) {
    // Profile already exists, no change needed
    return { noChange: true };
  }

  const [result] = await pool.query(
    `INSERT INTO user_profiles (user_id, age, website, password, occupation)
       VALUES (?, ?, ?, ?, ?)`,
    [userId, details.age, details.website, details.password, details.occupation]
  );
  
  // Mark change
  changeTracker.markChanged('user_profile', userId);
  
  return result;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT up.user_id AS id, u.email
     FROM user_profiles up
     JOIN users u ON u.id = up.user_id
     WHERE LOWER(u.email) = ?`,
    [email.toLowerCase()]
  );
  return rows[0]; 
};


exports.updateTemporaryPassword = async (code, userId) => {
  // Check current temporary password
  const [currentRows] = await pool.query(
    `SELECT temporary_password FROM user_profiles WHERE user_id = ?`,
    [userId]
  );
  
  if (!currentRows || currentRows.length === 0) {
    throw new Error('User profile not found');
  }

  // Only update if code is different
  if (String(currentRows[0]?.temporary_password) === String(code)) {
    return code; // No change needed
  }

  await pool.query(
    `UPDATE user_profiles SET temporary_password = ? WHERE user_id = ?`,
    [code, userId]
  );

  // Mark change
  changeTracker.markChanged('user_profile', userId);

  const [rows] = await pool.query(
    `SELECT temporary_password FROM user_profiles WHERE user_id = ?`,
    [userId]
  );

  return rows[0]?.temporary_password;
};


exports.updatePassword = async (userId, hashedPassword) => {
  // Check current password
  const [currentRows] = await pool.query(
    `SELECT password FROM user_profiles WHERE user_id = ?`,
    [userId]
  );
  
  if (!currentRows || currentRows.length === 0) {
    throw new Error('User profile not found');
  }

  // Only update if password is different
  if (currentRows[0].password === hashedPassword) {
    return; // No change needed
  }

  await pool.query(
    `UPDATE user_profiles 
     SET password = ?, temporary_password = NULL 
     WHERE user_id = ?`,
    [hashedPassword, userId]
  );
  
  // Mark change
  changeTracker.markChanged('user_profile', userId);
};
