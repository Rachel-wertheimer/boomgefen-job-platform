const adsService = require("../BL/ads");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");

exports.getAllApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await adsService.getAllApprovedAdsBL();
    res.status(200).json({
      success: true,
      message: "Ads fetched successfully",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
});

exports.getAllNotApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await adsService.getAllNotApprovedAdsBL();
    res.status(200).json({
      success: true,
      message: "Not approved ads fetched successfully",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
});

exports.getAllNotRelevantAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await adsService.getAllNotRelevantAdsBL();
    res.status(200).json({
      success: true,
      message: "Not relevant ads fetched successfully",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
});

exports.getAllAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await adsService.getAllAdsBL();
    res.status(200).json({
      success: true,
      message: "All ads fetched successfully",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
});

exports.createAds = asyncHandler(async (req, res, next) => {
  try {
    const adData = {
      id_user: req.body.id_user,
      company: req.body.company,
      type: req.body.type,
      goal: req.body.goal,
      description: req.body.description,
    };

    const data = await adsService.createAdsBL(adData);
    res.status(201).json({
      success: true,
      message: "Ad created successfully",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
});

exports.toggleApprovedController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await adsService.toggleApprovedBL(adId, userRole);
    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.toggleRelevantController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await adsService.toggleRelevantBL(adId, userRole);
    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateAdContentController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const adData = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await adsService.updateAdContentBL(adId, adData, userRole);
    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const result = await adsService.deleteAdBL(adId);
    res.json({
      success: true,
      message: "Ad deleted successfully",
      result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

