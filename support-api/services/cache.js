/**
 * Cache Service with Change Tracking
 * Only serves cached data if no changes occurred
 */
const changeTracker = require('./changeTracking');

class CacheService {
  constructor() {
    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes default TTL
  }

  /**
   * Generate cache key from request
   */
  generateKey(prefix, ...params) {
    const paramStr = params.map(p => 
      typeof p === 'object' ? JSON.stringify(p) : String(p)
    ).join(':');
    return `${prefix}:${paramStr}`;
  }

  /**
   * Get cached data if valid
   */
  get(cacheKey, entityType) {
    const cached = this.cache.get(cacheKey);
    if (!cached) {
      return null;
    }

    // Check if data has changed
    const currentVersion = changeTracker.getVersion(entityType);
    if (currentVersion > cached.version) {
      // Data changed, invalidate cache
      this.cache.delete(cacheKey);
      return null;
    }

    // Check TTL
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache with change tracking
   */
  set(cacheKey, data, entityType, ttl = null) {
    const version = changeTracker.getVersion(entityType);
    const expiresAt = Date.now() + (ttl || this.cacheTTL);
    
    this.cache.set(cacheKey, {
      data,
      version,
      expiresAt,
      entityType
    });

    // Also set cache version in change tracker
    changeTracker.setCacheVersion(cacheKey, version);
  }

  /**
   * Invalidate cache for entity type
   */
  invalidate(entityType) {
    changeTracker.invalidateCache(entityType);
    
    // Remove all related cache entries
    for (const [key, value] of this.cache) {
      if (value.entityType === entityType || key.includes(entityType)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
const cacheService = new CacheService();

module.exports = cacheService;


