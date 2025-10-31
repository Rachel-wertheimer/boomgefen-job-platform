const pool = require("./db");

exports.insertUserDetails = async (details, userId) => {
  const [result] = await pool.query(
    `INSERT INTO user_profiles (user_id, age, website, password, occupation)
       VALUES (?, ?, ?, ?, ?)`,
    [userId, details.age, details.website, details.password, details.occupation]
  );
  return result;
};

// exports.getUserByEmail = async (email) => {
//   const [rows] = await pool.query(
//     `SELECT email
//      FROM users
//      WHERE LOWER(email) = ?`,
//     [email.toLowerCase()]
//   );
//   return rows[0];
// };
exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT id, email, temporary_password
     FROM users
     WHERE LOWER(email) = ?`,
    [email.toLowerCase()]
  );
  return rows[0];
};


exports.updateTemporaryPassword = async (code,userId) => {
  await pool.query(
    `UPDATE user_profiles SET temporary_password = ? WHERE user_id = ?`,
    [code, userId]
  );
};

exports.updatePassword = async (hashedPassword ,userId) => {
  await pool.query(
    `UPDATE user_profiles 
     SET password = ?, temporary_password = NULL 
     WHERE user_id = ?`,
    [hashedPassword, userId]
  );
};
