const pool = require("./db");
const changeTracker = require("./services/changeTracking");
// פונקציה למציאת מזהה משתמש לפי אימייל
exports.findUserIdByEmail = async (email) => {
  const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (rows.length > 0) return rows[0].id;
  return null;
};

// UPDATE של משתמש קיים
exports.updateUser = async (userId, user) => {
  await pool.query(
    `UPDATE users 
     SET full_name = ?, phone = ?, type = ?, is_agree = ?, is_subscribed = ?
     WHERE id = ?`,
    [
      user.full_name,
      user.phone,
      user.type,
      user.is_agree,
      user.is_subscribed,
      userId,
    ]
  );
};

exports.insertUser = async (user) => {
  console.log("Inserting user:", user);
  const [result] = await pool.query(
    `INSERT INTO users (full_name, email, phone, type, is_agree, is_subscribed)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      user.full_name,
      user.email,
      user.phone,
      user.type,
      user.is_agree,
      user.is_subscribed,
    ]
  );
  changeTracker.markChanged('user', result.insertId);
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
  const cache = require("./services/cache");
  const cacheKey = cache.generateKey('user_details', ID);
  const cached = cache.get(cacheKey, 'user');
  if (cached !== null) {
    return cached;
  }

  const [rows] = await pool.query(
    `SELECT email, phone 
     FROM users 
     WHERE id = ?`,
    [ID]
  );
  const result = rows[0];
  if (result) {
    cache.set(cacheKey, result, 'user', 2 * 60 * 1000);
  }
  return result;
};

exports.update_subscription = async (adId) => {
  // Check current subscription status
  const [currentRows] = await pool.query(
    `SELECT is_subscribed, subscription_start, subscription_end FROM users WHERE id = ?`,
    [adId]
  );
  
  if (!currentRows || currentRows.length === 0) {
    throw new Error('User not found');
  }

  const startDate = new Date(); 
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1); 
  const is_subscribed = true;

  const current = currentRows[0];
  
  // Check if subscription already active and not expired
  if (current.is_subscribed && current.subscription_end) {
    const currentEnd = new Date(current.subscription_end);
    if (currentEnd > new Date()) {
      // Subscription already active, check if we're just renewing
      // If end date is same or very close, no change needed
      return { endDate: currentEnd, noChange: true };
    }
  }

  await pool.query(
    `UPDATE users SET is_subscribed=? ,subscription_start = ?, subscription_end = ? WHERE id = ?`,
    [is_subscribed, startDate, endDate, adId]
  );
  
  // Mark change
  changeTracker.markChanged('user', adId);
  
  return { endDate: endDate };
};

exports.deleteUserByID = async (userId) => {
  try {
    // Check if user exists
    const [userRows] = await pool.query(`SELECT id FROM users WHERE id = ?`, [userId]);
    if (!userRows || userRows.length === 0) {
      return { deletedRows: 0, noChange: true };
    }

    await pool.query(
      `DELETE FROM user_profiles WHERE user_id = ?`,
      [userId]
    );
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );
    
    // Mark change
    changeTracker.markChanged('user', userId);
    changeTracker.markChanged('user_profile', userId);
    
    return { deletedRows: result.affectedRows };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

