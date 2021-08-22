const logger = require('./logger');

let whitelist;
if (process.env.ALOWED_ORIGINS) {
  try {
    whitelist = process.env.ALOWED_ORIGINS.split(',');
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
} else {
  whitelist = '*';
}
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist === '*' || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback('CORS error');
    }
  },
};

module.exports = corsOptions;
