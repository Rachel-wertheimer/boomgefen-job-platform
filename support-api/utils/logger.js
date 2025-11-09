const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

class Logger {
  error(message, context = {}) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, context);
  }

  warn(message, context = {}) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, context);
  }

  info(message, context = {}) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, context);
  }

  debug(message, context = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, context);
    }
  }
}

module.exports = new Logger();
