const { getAllApprovedAdsBL, getAllAdsBL, getAllNotApprovedAdsBL, createAdsBL, toggleApprovedBL, toggleRelevantBL, getAllNotRelevantAdsBL, updateAdContentBL, deleteAdBL } = require("../BL/ads");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");

exports.getAllApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await getAllApprovedAdsBL();
    res.status(200).json({
      success: true,
      message: 'getAllApprovedAds fetched successfully',
      data: data,
    });
  }
  catch (err) {
    return next('getAllApprovedAds failed', 404);
  }
})

exports.getAllNotApprovedAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await getAllNotApprovedAdsBL();
    res.status(200).json({
      success: true,
      message: 'getAllNotApprovedAdsBL fetched successfully',
      data: data,
    });
  }
  catch (err) {
    return next('getAllNotApprovedAdsBL failed', 404);
  }
})
exports.getAllNotRelevantAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await getAllNotRelevantAdsBL();
    res.status(200).json({
      success: true,
      message: 'getAllNotRelevantAds fetched successfully',
      data: data,
    });
  }
  catch (err) {
    return next('getAllNotRelevantAds failed', 404);
  }
})

exports.getAllAds = asyncHandler(async (req, res, next) => {
  try {
    const data = await getAllAdsBL();
    res.status(200).json({
      success: true,
      message: 'getAllAds fetched successfully',
      data: data,
    });
  }
  catch (err) {
    return next('getAllAds failed', 404);
  }
})

exports.createAds = asyncHandler(async (req, res, next) => {
  try {
    const adData = {
      id_user: req.body.id_user,
      company: req.body.company,
      type: req.body.type,
      goal: req.body.goal,
      description: req.body.description
    };
    const data = await createAdsBL(adData);
    res.status(201).json({
      success: true,
      message: 'createAds fetched successfully',
      data: data,
    });
  }
  catch (err) {
    return next('createAds failed', 500);
  }
}
)

exports.toggleApprovedController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await toggleApprovedBL(adId, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.toggleRelevantController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await toggleRelevantBL(adId, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateAdContentController = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const adData = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    const updatedAd = await updateAdContentBL(adId, adData, userRole);

    res.json({ success: true, ad: updatedAd });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.deleteAd = async (req, res) => {
  try {
    const adId = Number(req.params.adId);
    const result = await deleteAdBL(adId);
    res.json({ success: true, message: 'AD deleted successfully', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};