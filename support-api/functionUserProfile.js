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
    `SELECT u.id, u.email, u.full_name, p.password, p.temporary_password
     FROM users u
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE LOWER(u.email) = ?`,
    [email.toLowerCase()]
  );
  return rows[0];
};

exports.updateTemporaryPassword = async (userId, code) => {
  await pool.query(
    `UPDATE user_profiles SET temporary_password = ? WHERE user_id = ?`,
    [code, userId]
  );
};

exports.updatePassword = async (userId, hashedPassword) => {
  await pool.query(
    `UPDATE user_profiles 
     SET password = ?, temporary_password = NULL 
     WHERE user_id = ?`,
    [hashedPassword, userId]
  );
};
