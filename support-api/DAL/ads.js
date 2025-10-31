const functionDB = require('../functionAds');

exports.getAllApprovedAdsDAL = async (user, details) => {
    try {
        console.log('start getAllApprovedAdsDAL');
        const result = await functionDB.get_approved_ads();
        console.log('end getAllApprovedAdsDAL');
        return result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

exports.getAllNotApprovedAdsDAL = async () => {
    try {
        console.log('start get_not_approved_ads');
        const rows = await functionDB.get_Not_approved_ads();
        console.log('end get_not_approved_ads');
        return rows;
    } catch (error) {
        console.error('Error fetching not approved ads:', error);
        throw error;
    }
};

exports.getAllNotRelevantAdsDAL = async () => {
    try {
        console.log('start getAllNotRelevantAdsDAL');
        const rows = await functionDB.get_Not_relevant_ads();
        console.log('end getAllNotRelevantAdsDAL');
        return rows;
    } catch (error) {
        console.error('Error fetching not relevant ads:', error);
        throw error;
    }
};

exports.getAllAdsDAL = async () => {
    try {
        console.log('start get_ads');
        const rows = await functionDB.get_ads();
        console.log('end get_ads');
        return rows;
    } catch (error) {
        console.error('Error fetching approved ads:', error);
        throw error;
    }
};

exports.createAdsDAL = async (adData) => {
    try {
        console.log('start create_ad');
        const rows = await functionDB.addAd(adData);
        console.log(rows);
        console.log('end create_ad');
        return rows;
    } catch (error) {
        console.error('Error fetching create_ad:', error);
        throw error;
    }
}

exports.toggleApprovedDAL = async (adId) => {
    try {
        const ad = await functionDB.get_ad_by_id(adId);
        if (!ad) throw new Error('Ad not found');

        const newApproved = !ad.approved;
        const updatedAd = await functionDB.update_ad_approved(adId, newApproved);
        return updatedAd;
    } catch (error) {
        console.error('Error toggling approval:', error);
        throw error;
    }
};

exports.toggleRelevantDAL = async (adId) => {
    try {
        const ad = await functionDB.get_ad_by_id(adId);
        if (!ad) throw new Error('Ad not found');
        const newRelevant = !ad.is_relevant;
        const updatedAd = await functionDB.update_ad_is_relevant(adId, newRelevant);
        return updatedAd;
    } catch (error) {
        console.error('Error toggling is_relevant:', error);
        throw error;
    }
};

exports.updateAdContentDAL = async (adId, adData) => {
    try {
        console.log('start updateAdContentDAL');
        const updatedAd = await functionDB.update_ad_content(adId, adData);
        console.log('end updateAdContentDAL');
        return updatedAd;
    } catch (error) {
        console.error('Error updating ad content:', error);
        throw error;
    }
};


exports.deleteAdDAL = async (adId) => {
    try {
      const result = await functionDB.deleteAdByID(adId);
      return result;
    } catch (error) {
      throw error;
    }
  };