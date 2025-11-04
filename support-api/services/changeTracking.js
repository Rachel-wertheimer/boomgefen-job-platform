/**
 * Change Tracking Service
 * Tracks changes to database entities to optimize DB access
 */
class ChangeTrackingService {
  constructor() {
    // Track change versions for different entities
    this.changeVersions = new Map();
    // Track cache keys and their versions
    this.cacheVersions = new Map();
    // Initialize with current timestamp
    this.globalVersion = Date.now();
  }

  /**
   * Get current version for an entity
   */
  getVersion(entityType, entityId = null) {
    const key = entityId ? `${entityType}:${entityId}` : entityType;
    return this.changeVersions.get(key) || this.globalVersion;
  }

  /**
   * Mark entity as changed
   */
  markChanged(entityType, entityId = null) {
    const key = entityId ? `${entityType}:${entityId}` : entityType;
    const newVersion = Date.now();
    this.changeVersions.set(key, newVersion);
    
    // Also mark related collections as changed
    if (entityType === 'ad') {
      this.changeVersions.set('ads', newVersion);
      this.changeVersions.set('approved_ads', newVersion);
      this.changeVersions.set('not_approved_ads', newVersion);
      this.changeVersions.set('not_relevant_ads', newVersion);
    } else if (entityType === 'user') {
      this.changeVersions.set('users', newVersion);
    } else if (entityType === 'user_profile') {
      this.changeVersions.set('user_profiles', newVersion);
      this.changeVersions.set('users', newVersion);
    }
    
    this.globalVersion = newVersion;
    return newVersion;
  }

  /**
   * Check if entity has changed since last check
   */
  hasChanged(entityType, entityId, lastVersion) {
    const currentVersion = this.getVersion(entityType, entityId);
    return currentVersion > lastVersion;
  }

  /**
   * Get cache key version
   */
  getCacheVersion(cacheKey) {
    return this.cacheVersions.get(cacheKey) || 0;
  }

  /**
   * Set cache version
   */
  setCacheVersion(cacheKey, version) {
    this.cacheVersions.set(cacheKey, version);
  }

  /**
   * Check if cache is still valid
   */
  isCacheValid(cacheKey, cacheVersion) {
    const currentVersion = this.getCacheVersion(cacheKey);
    return currentVersion === cacheVersion;
  }

  /**
   * Invalidate all caches for an entity type
   */
  invalidateCache(entityType) {
    this.markChanged(entityType);
    // Clear related cache versions
    for (const [key] of this.cacheVersions) {
      if (key.includes(entityType)) {
        this.cacheVersions.delete(key);
      }
    }
  }
}

// Singleton instance
const changeTracker = new ChangeTrackingService();

module.exports = changeTracker;


