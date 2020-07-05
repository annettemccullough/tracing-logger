const winston = require('winston');

const { combine, timestamp, printf } = winston.format;

const formatter = require('./formatter');

// process.env.NODE_ENV = 'production'; // uncomment to set logLevel to info
const logLevel = (process.env.NODE_ENV === 'production') ? 'info' : 'debug';
const transports = {
  console: new winston.transports.Console({
    level: logLevel,
  }),
};

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  transports: [transports.console],
  format: combine(timestamp(), printf(formatter)),
});

module.exports = {
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

logger.exitOnError = false;
