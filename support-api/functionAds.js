const pool = require("./db");
const cache = require("../services/cache");
const changeTracker = require("../services/changeTracking");

exports.get_approved_ads = async () => {
  const cacheKey = cache.generateKey('approved_ads');
  const cached = cache.get(cacheKey, 'approved_ads');
  if (cached !== null) {
    return cached;
  }

  const [result] = await pool.query(
    `SELECT * FROM ads WHERE approved = TRUE ORDER BY id DESC`,
  );
  cache.set(cacheKey, result, 'approved_ads');
  return result;
}

exports.get_Not_approved_ads = async () => {
  const cacheKey = cache.generateKey('not_approved_ads');
  const cached = cache.get(cacheKey, 'not_approved_ads');
  if (cached !== null) {
    return cached;
  }

  const [result] = await pool.query(
    `SELECT * FROM ads WHERE approved = False ORDER BY id DESC`,
  );
  cache.set(cacheKey, result, 'not_approved_ads');
  return result;
}
exports.get_Not_relevant_ads = async () => {
  const cacheKey = cache.generateKey('not_relevant_ads');
  const cached = cache.get(cacheKey, 'not_relevant_ads');
  if (cached !== null) {
    return cached;
  }

  const [result] = await pool.query(
    `SELECT * FROM ads WHERE is_relevant = False ORDER BY id DESC`,
  );
  cache.set(cacheKey, result, 'not_relevant_ads');
  return result;
}

exports.get_ads = async () => {
  const cacheKey = cache.generateKey('all_ads');
  const cached = cache.get(cacheKey, 'ads');
  if (cached !== null) {
    return cached;
  }

  const [result] = await pool.query(
    `SELECT * FROM ads ORDER BY id DESC`,
  );
  cache.set(cacheKey, result, 'ads');
  return result;
}

exports.addAd = async (adData) => {
  const { id_user, company, type, goal, description } = adData;
  const query = 'INSERT INTO ads (id_user, company, type, goal, description, approved) VALUES (?, ?, ?, ?, ?, 0)';
  const params = [id_user, company, type, goal, description];
  const result = await pool.execute(query, params); 
  const newAdId = result[0].insertId;
  
  // Mark change - this will invalidate all ad caches
  changeTracker.markChanged('ad', newAdId);
  
  return { id: newAdId, ...adData, approved: 0 };
};

exports.get_ad_by_id = async (adId) => {
  const cacheKey = cache.generateKey('ad_by_id', adId);
  const cached = cache.get(cacheKey, 'ad');
  if (cached !== null) {
    return cached;
  }

  const [rows] = await pool.query(`SELECT approved ,is_relevant FROM ads WHERE id = ?`, [adId]);
  const result = rows[0];
  if (result) {
    cache.set(cacheKey, result, 'ad', 2 * 60 * 1000); // 2 min TTL for single ad
  }
  return result;
};

exports.update_ad_approved = async (adId, newApproved) => {
  // Check current state first - only update if different
  const currentAd = await exports.get_ad_by_id(adId);
  if (!currentAd) {
    throw new Error('Ad not found');
  }

  // Only update if value actually changes
  if (currentAd.approved === newApproved) {
    return { id: adId, approved: newApproved, noChange: true };
  }

  await pool.query(`UPDATE ads SET approved = ? WHERE id = ?`, [newApproved, adId]);
  
  // Mark change
  changeTracker.markChanged('ad', adId);
  
  return { id: adId, approved: newApproved };
};

exports.update_ad_is_relevant = async (adId, is_relevant) => {
  // Check current state first - only update if different
  const currentAd = await exports.get_ad_by_id(adId);
  if (!currentAd) {
    throw new Error('Ad not found');
  }

  // Only update if value actually changes
  if (currentAd.is_relevant === is_relevant) {
    return { id: adId, is_relevant: is_relevant, noChange: true };
  }

  await pool.query(`UPDATE ads SET is_relevant = ? WHERE id = ?`, [is_relevant, adId]);
  
  // Mark change
  changeTracker.markChanged('ad', adId);
  
  return { id: adId, is_relevant: is_relevant };
};

exports.update_ad_content = async (adId, adData) => {
  const { company, type, goal, description } = adData;
  
  // Get current ad data to check if anything changed
  const [currentRows] = await pool.query(`SELECT * FROM ads WHERE id = ?`, [adId]);
  if (!currentRows || currentRows.length === 0) {
    throw new Error('Ad not found');
  }
  
  const current = currentRows[0];
  
  // Check if data actually changed
  const hasChanged = 
    current.company !== company ||
    current.type !== type ||
    current.goal !== goal ||
    current.description !== description;
  
  if (!hasChanged) {
    // No change needed, return current data (already fetched)
    return { ...current, noChange: true };
  }

  // Data changed, perform update
  await pool.query(
    `UPDATE ads SET company = ?, type = ?, goal = ?, description = ? WHERE id = ?`,
    [company, type, goal, description, adId]
  );

  // Mark change
  changeTracker.markChanged('ad', adId);

  // Return updated data
  const [updatedRows] = await pool.query(`SELECT * FROM ads WHERE id = ?`, [adId]);
  return updatedRows[0];
};
exports.deleteAdByID = async (adId) => {
  // Check if ad exists first
  const [rows] = await pool.query(`SELECT id FROM ads WHERE id = ?`, [adId]);
  if (!rows || rows.length === 0) {
    return { message: 'Ad not found', noChange: true };
  }

  await pool.query(
    `DELETE FROM ads WHERE id = ?`,
    [adId]
  );
  
  // Mark change
  changeTracker.markChanged('ad', adId);
  
  return { message: 'Ad deleted successfully' };
};