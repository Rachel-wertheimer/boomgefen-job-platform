const express = require('express');
const { getAllApprovedAds, getAllAds, getAllNotApprovedAds, createAds, toggleApprovedController, toggleRelevantController, getAllNotRelevantAds, updateAdContentController } = require('../controllers/ads');
const router = express.Router();

router.get('/getAllApprovedAds', getAllApprovedAds);
router.get('/getAllNotApprovedAds', getAllNotApprovedAds);
router.get('/getAllNotRelevantAds', getAllNotRelevantAds);
router.get('/getAll', getAllAds);
router.post('/createAds', createAds);
router.put('/toggleApproved/:adId', toggleApprovedController);
router.put('/toggleRelevant/:adId', toggleRelevantController);
router.put('/updateContent/:adId', updateAdContentController);
// router.delete('/deleteAd/:adId',);
module.exports = router;


