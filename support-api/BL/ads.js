const { getAllApprovedAdsDAL, getAllAdsDAL, getAllNotApprovedAdsDAL, createAdsDAL, toggleApprovedDAL, toggleRelevantDAL, getAllNotRelevantAdsDAL, updateAdContentDAL } = require("../DAL/ads");

exports.getAllApprovedAdsBL = async () => {
  try {
    console.log(`Start getAllApproveAds BL`);
    let result = await getAllApprovedAdsDAL();
    console.log(`end getAllApprovedAs`);
    return result;
  }
  catch (err) {
    console.error('Error in getAllApprovedAdsBL', err);
    throw err;
  }
}

exports.getAllNotApprovedAdsBL = async () => {
  try {
    console.log(`Start getAllNotApproveAds`);
    let result = await getAllNotApprovedAdsDAL();
    console.log(`end getAllNotApprovedAdsBL`);
    return result;
  }
  catch (err) {
    console.error('Error in getAllNotApprovedAdsBL', err);
    throw err;
  }
}
exports.getAllNotRelevantAdsBL = async () => {
  try {
    console.log(`Start getAllNotRelevantAdsBL`);
    let result = await getAllNotRelevantAdsDAL();
    console.log(`end getAllNotRelevantAdsBL`);
    return result;
  }
  catch (err) {
    console.error('Error in getAllNotRelevantAdsBL', err);
    throw err;
  }
}

exports.getAllAdsBL = async () => {
  try {
    console.log(`Start getAllAds`);
    let result = await getAllAdsDAL();
    console.log(`end getAllAds`);
    return result;
  }
  catch (err) {
    console.error('Error in getAllApprovedAdsBL', err);
    throw err;
  }
}

exports.createAdsBL = async (adData) => {
  try {
    console.log(`Start createAdsBL`);
    let result = await createAdsDAL(adData);
    console.log(`end createAdsBL`);
    return result;
  }
  catch (err) {
    console.error('Error in createAdsBL', err);
    throw err;
  }
}

exports.toggleApprovedBL = async (adId, userRole) => {
  if (userRole !== 'MANAGER') {
    throw new Error('Unauthorized: Only admins can toggle approval');
  }

  const updatedAd = await toggleApprovedDAL(adId);
  return updatedAd;
};

exports.toggleRelevantBL = async (adId, userRole) => {
  if (userRole !== 'MANAGER') {
    throw new Error('Unauthorized: Only admins can toggle Relevance');
  }

  const updatedAd = await toggleRelevantDAL(adId);
  return updatedAd;
};

exports.updateAdContentBL = async (adId, adData, userRole) => {
  if (userRole !== 'MANAGER') {
    throw new Error('Unauthorized: Only managers can update ad content');
  }

  const updatedAd = await updateAdContentDAL(adId, adData);
  return updatedAd;
};