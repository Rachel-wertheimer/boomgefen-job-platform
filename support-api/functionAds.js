const pool = require("./db");

exports.get_approved_ads = async () => {
  const [result] = await pool.query(
    `SELECT * FROM ads WHERE approved = TRUE`,
  );
  return result;
}

exports.get_Not_approved_ads = async () => {
  const [result] = await pool.query(
    `SELECT * FROM ads WHERE approved = False`,
  );
  return result;
}
exports.get_Not_relevant_ads = async () => {
  const [result] = await pool.query(
    `SELECT * FROM ads WHERE is_relevant = False`,
  );
  return result;
}

exports.get_ads = async () => {
  const [result] = await pool.query(
    `SELECT * FROM ads`,
  );
  return result;
}

exports.addAd = async (adData) => {
  const { id_user, company, type, goal, description } = adData;
  const query = 'INSERT INTO ads (id_user, company, type, goal, description, approved) VALUES (?, ?, ?, ?, ?, 0)';
  const params = [id_user, company, type, goal, description];
  const result = await pool.execute(query, params); // החלף את 'db.execute' בפונקציה שלך
  const newAdId = result[0].insertId;
  return { id: newAdId, ...adData, approved: 0 };
};

exports.get_ad_by_id = async (adId) => {
  const [rows] = await pool.query(`SELECT approved ,is_relevant FROM ads WHERE id = ?`, [adId]);
  return rows[0];
};

exports.update_ad_approved = async (adId, newApproved) => {
  await pool.query(`UPDATE ads SET approved = ? WHERE id = ?`, [newApproved, adId]);
  return { id: adId, approved: newApproved };
};

exports.update_ad_is_relevant = async (adId, is_relevant) => {
  await pool.query(`UPDATE ads SET is_relevant = ? WHERE id = ?`, [is_relevant, adId]);
  return { id: adId, is_relevant: is_relevant };
};

exports.update_ad_content = async (adId, adData) => {
  const { company, type, goal, description } = adData;
  await pool.query(
    `UPDATE ads SET company = ?, type = ?, goal = ?, description = ? WHERE id = ?`,
    [company, type, goal, description, adId]
  );
  
  const [rows] = await pool.query(`SELECT * FROM ads WHERE id = ?`, [adId]);
  return rows[0];
};