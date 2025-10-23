const pool = require("./db"); // חיבור MySQL

exports.insertUserDetails = async (details, userId) => {
    const [result] = await pool.query(
      `INSERT INTO user_profiles (user_id, age, website, password, occupation)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, details.age, details.website, details.password, details.occupation]
    );
    return result;
  };