/**
 * Ads Controller
 * בקר מודעות - טיפול בבקשות HTTP הקשורות למודעות
 */

const adsService = require("../services/adsService");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

/**
 * Get all approved ads
 * קבלת כל המודעות המאושרות
 * @route GET /api/v1/ads/getAllApprovedAds
 */
exports.getAllApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Fetching all approved ads");
    const data = await adsService.getAllApprovedAds();
    
    res.status(200).json({
      success: true,
      message: "Ads fetched successfully",
      data: data,
    });
  } catch (err) {
    logger.error("Error fetching approved ads", { error: err.message });
    return next(err);
  }
});

/**
 * Get all not approved ads
 * קבלת כל המודעות שלא אושרו
 * @route GET /api/v1/ads/getAllNotApprovedAds
 */
exports.getAllNotApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Fetching all not approved ads");
    const data = await adsService.getAllNotApprovedAds();
    
    res.status(200).json({
      success: true,
      message: "Not approved ads fetched successfully",
      data: data,
    });
  } catch (err) {
    logger.error("Error fetching not approved ads", { error: err.message });
    return next(err);
  }
});

/**
 * Get all not relevant ads
 * קבלת כל המודעות שלא רלוונטיות
 * @route GET /api/v1/ads/getAllNotRelevantAds
 */
exports.getAllNotRelevantAds = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Fetching all not relevant ads");
    const data = await adsService.getAllNotRelevantAds();
    
    res.status(200).json({
      success: true,
      message: "Not relevant ads fetched successfully",
      data: data,
    });
  } catch (err) {
    logger.error("Error fetching not relevant ads", { error: err.message });
    return next(err);
  }
});

/**
 * Get all ads (admin only)
 * קבלת כל המודעות (רק למנהלים)
 * @route GET /api/v1/ads/getAll
 */
exports.getAllAds = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Fetching all ads");
    const data = await adsService.getAllAds();
    
    res.status(200).json({
      success: true,
      message: "All ads fetched successfully",
      data: data,
    });
  } catch (err) {
    logger.error("Error fetching all ads", { error: err.message });
    return next(err);
  }
});

/**
 * Create a new ad
 * יצירת מודעה חדשה
 * @route POST /api/v1/ads/createAds
 */
exports.createAds = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Creating new ad", { company: req.body.company });
    
    const adData = {
      id_user: req.body.id_user,
      company: req.body.company,
      type: req.body.type,
      goal: req.body.goal,
      description: req.body.description,
    };

    const data = await adsService.createAds(adData);
    
    res.status(201).json({
      success: true,
      message: "Ad created successfully",
      data: data,
    });
  } catch (err) {
    logger.error("Error creating ad", { error: err.message });
    return next(err);
  }
});

/**
 * Toggle ad approval status
 * שינוי סטטוס אישור מודעה
 * @route PUT /api/v1/ads/toggleApproved/:adId
 */
exports.toggleApprovedController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);

    // Verify authentication
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token and get user role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    logger.info("Toggling ad approval", { adId, userRole });

    const updatedAd = await adsService.toggleApproved(adId, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    logger.error("Error toggling ad approval", { error: err.message });
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Toggle ad relevance status
 * שינוי סטטוס רלוונטיות מודעה
 * @route PUT /api/v1/ads/toggleRelevant/:adId
 */
exports.toggleRelevantController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);

    // Verify authentication
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token and get user role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    logger.info("Toggling ad relevance", { adId, userRole });

    const updatedAd = await adsService.toggleRelevant(adId, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    logger.error("Error toggling ad relevance", { error: err.message });
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Update ad content
 * עדכון תוכן מודעה
 * @route PUT /api/v1/ads/updateContent/:adId
 */
exports.updateAdContentController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const adData = req.body;

    // Verify authentication
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token and get user role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    logger.info("Updating ad content", { adId, userRole });

    const updatedAd = await adsService.updateAdContent(adId, adData, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    logger.error("Error updating ad content", { error: err.message });
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Delete an ad
 * מחיקת מודעה
 * @route DELETE /api/v1/ads/deleteAd/:adId
 */
exports.deleteAd = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    
    logger.info("Deleting ad", { adId });

    const result = await adsService.deleteAd(adId);
    
    res.json({
      success: true,
      message: "Ad deleted successfully",
      result,
    });
  } catch (err) {
    logger.error("Error deleting ad", { error: err.message });
    res.status(400).json({ success: false, message: err.message });
  }
};

