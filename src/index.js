const logger = require('./logger');
const storage = require('./storage');

module.exports = {
  init: storage.init,
  tracing: {
    get: storage.get,
    getAll: storage.getAll,
    set: storage.set,
  },
  info: (args) => {
    logger.info(args);
  },
  log: (args) => {
    logger.log(args);
  },
  warn: (args) => {
    logger.warn(args);
  },
  debug: (args) => {
    logger.debug(args);
  },
  verbose: (args) => {
    logger.verbose(args);
  },
  error: (args) => {
    logger.error(args);
  },
};
