/**
 * Change Tracking Middleware
 * Tracks requests and marks changes when mutations occur
 */
const changeTracker = require('../services/changeTracking');

/**
 * Middleware to track changes after mutations
 */
const trackChanges = (req, res, next) => {
  // Store original json method
  const originalJson = res.json.bind(res);

  // Override json to track changes
  res.json = function(data) {
    // Mark changes based on HTTP method and route
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const route = req.route?.path || req.path;
      
      // Determine entity type from route
      if (route.includes('/ads') || route.includes('/ad')) {
        if (req.method === 'DELETE' || req.method === 'POST') {
          // Creating or deleting ad - invalidate all ad caches
          changeTracker.markChanged('ad');
        } else if (req.params.adId) {
          // Updating specific ad
          changeTracker.markChanged('ad', req.params.adId);
        }
      } else if (route.includes('/user') && !route.includes('/user_profile')) {
        if (req.method === 'DELETE' || (req.method === 'POST' && route.includes('/create'))) {
          changeTracker.markChanged('user');
        } else if (req.params.user_id) {
          changeTracker.markChanged('user', req.params.user_id);
        }
      } else if (route.includes('/user_profile')) {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          changeTracker.markChanged('user_profile');
          if (req.params.userId) {
            changeTracker.markChanged('user_profile', req.params.userId);
          }
        }
      }
    }

    return originalJson(data);
  };

  next();
};

/**
 * Middleware to check if GET request needs DB access
 */
const shouldAccessDB = (req, res, next) => {
  // Only GET requests need this check
  if (req.method !== 'GET') {
    return next();
  }

  // Add flag to request
  req._changeTracking = {
    shouldCheckCache: true,
    skipDB: false
  };

  next();
};

module.exports = {
  trackChanges,
  shouldAccessDB
};


