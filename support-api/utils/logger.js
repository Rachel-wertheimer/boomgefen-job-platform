/**
 * Logger Utility
 * כלי לוגים מרכזי - רישום אירועים ושגיאות
 */

/**
 * Log levels
 * רמות לוג
 */
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

/**
 * Logger class
 * מחלקת לוגים
 */
class Logger {
  /**
   * Log error
   * רישום שגיאה
   * @param {string} message - Error message
   * @param {Object} context - Additional context
   */
  error(message, context = {}) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, context);
  }

  /**
   * Log warning
   * רישום אזהרה
   * @param {string} message - Warning message
   * @param {Object} context - Additional context
   */
  warn(message, context = {}) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, context);
  }

  /**
   * Log info
   * רישום מידע
   * @param {string} message - Info message
   * @param {Object} context - Additional context
   */
  info(message, context = {}) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, context);
  }

  /**
   * Log debug
   * רישום דיבוג
   * @param {string} message - Debug message
   * @param {Object} context - Additional context
   */
  debug(message, context = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, context);
    }
  }
}

module.exports = new Logger();

