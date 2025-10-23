const pool = require("./db"); // חיבור MySQL

exports.insertUser = async (user) => {
  const [result] = await pool.query(
    `INSERT INTO users (full_name, email, phone, type, is_agree, is_subscribed, subscription_start, subscription_end)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.full_name,
      user.email,
      user.phone,
      user.type,
      user.is_agree,
      user.is_subscribed,
      user.subscription_start,
      user.subscription_end,
    ]
  );
  return result.insertId;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.email, u.type, d.password ,u.full_name,u.is_subscribed,u.subscription_start , u.subscription_end
     FROM users u
     LEFT JOIN user_profiles d ON u.id = d.user_id
     WHERE LOWER(u.email) = ?`,
    [email.toLowerCase()]
  );
  return rows[0];
};

exports.getUserDetailsByID = async (ID) => {
  const [rows] = await pool.query(
    `SELECT email, phone 
     FROM users 
     WHERE id = ?`,
    [ID]
  );
  return rows[0]; // מחזיר את הרשומה הראשונה (כי ID הוא ייחודי)
};

exports.update_subscription = async (adId) => {
  const startDate = new Date(); // התאריך הנוכחי
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1); // חודש קדימה

  await pool.query(
    `UPDATE users SET subscription_start = ?, subscription_end = ? WHERE id = ?`,
    [startDate, endDate, adId]
  );
  return { endDate: endDate };
};

exports.deleteUserByID = async (userId) => {
  try {
    await pool.query(
      `DELETE FROM user_profiles WHERE user_id = ?`,
      [userId]
    );
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );
    return { deletedRows: result.affectedRows };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
