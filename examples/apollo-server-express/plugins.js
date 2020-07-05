// Import the tracing-logger package, this will automatically
// have access to the tracing namespace intialise in index.js
// const logger = require('tracing-logger');
const logger = require('../..');

module.exports = {
  requestDidStart(context) {
    // there is no need to pass around any tracing data, the logger appends it automatically
    logger.info({ query: context.request.query.replace(/ +/g, ' ').replace(/[\n]/g, ''), variables: context.request.variables });
  },
};
