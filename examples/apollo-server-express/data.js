// Import the tracing-logger package, this will automatically
// have access to the tracing namespace intialise in index.js
// const logger = require('tracing-logger');
const logger = require('../..');

const books = [
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const fetchAll = () => {
  logger.debug(`Fetching All Of The Data: ${JSON.stringify(books)}`);
  return books;
};

const callDownstream = () => {
  // As the tracing namespace is globally available on the current
  // thread, the values can be forwarded to any calls downstream to
  // facilitate tracing through multiple services.
  // const xCorrelationId = logger.tracing.get('x-correlation-id');
  // const userId = logger.tracing.get('user-id');
  // const userName = logger.tracing.get('user-name');

  // All set tracing values can be retrieved at once
  // const tracing = logger.tracing.getAll();

  // attach the tracing attributes to the request headers
  // before making calls downstream
};

module.exports = { fetchAll, callDownstream };
