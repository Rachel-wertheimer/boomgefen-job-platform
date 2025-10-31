const pool = require("./db");

exports.insertUserDetails = async (details, userId) => {
  const [result] = await pool.query(
    `INSERT INTO user_profiles (user_id, age, website, password, occupation)
       VALUES (?, ?, ?, ?, ?)`,
    [userId, details.age, details.website, details.password, details.occupation]
  );
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
  return rows[0]; // אם אין משתמש, יחזור undefined
};


exports.updateTemporaryPassword = async (code, userId) => {
  // קודם מעדכנים את הקוד
  await pool.query(
    `UPDATE user_profiles SET temporary_password = ? WHERE user_id = ?`,
    [code, userId]
  );

  // עכשיו שולפים את הערך המעודכן
  const [rows] = await pool.query(
    `SELECT temporary_password FROM user_profiles WHERE user_id = ?`,
    [userId]
  );

  // מחזירים את הערך של temporary_password
  return rows[0]?.temporary_password;
};


exports.updatePassword = async (userId, hashedPassword) => {
  await pool.query(
    `UPDATE user_profiles 
     SET password = ?, temporary_password = NULL 
     WHERE user_id = ?`,
    [hashedPassword, userId]
  );
};
