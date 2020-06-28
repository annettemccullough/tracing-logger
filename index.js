const _ = require('lodash');

const winston = require('winston');

const { combine, timestamp, printf } = winston.format;

const { createNamespace } = require('cls-hooked');
const { v4 } = require('uuid');

const namespace = createNamespace(`tracing-logger:${v4()}`);
const init = () => (request, response, next) => {
  namespace.bindEmitter(request);
  namespace.bindEmitter(response);

  const xCorrelationId = _.get(request.headers, 'x-correlation-id', v4());
  response.append('x-correlation-id', xCorrelationId);

  namespace.run(() => {
    namespace.set('x-correlation-id', xCorrelationId);
    next();
  });
};

const get = (key) => namespace.get(key);
const getAll = () => _.omit(namespace.active, 'id', '_ns_name');
const set = (key, value) => namespace.set(key, value);

// process.env.NODE_ENV = 'production'; // uncomment to set logLevel to info
const logLevel = (process.env.NODE_ENV === 'production') ? 'info' : 'debug';
const transports = {
  console: new winston.transports.Console({
    level: logLevel,
  }),
};

const formatLogs = (info) => {
  const tracing = getAll();

  return JSON.stringify({
    timestamp: info.timestamp,
    tracing: {
      ...tracing,
    },
    ...info,
  });
};

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  transports: [transports.console],
  format: combine(timestamp(), printf(formatLogs)),
});

module.exports = {
  init,
  tracing: {
    get,
    getAll,
    set,
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

logger.exitOnError = false;
