const express = require('express');

// Import the tracing-logger package
const logger = require('tracing-logger');
// const logger = require('../..');

const app = express();
const port = 3000;

// Initialise the logger, this will create a tracing namespace
// is unique to the current request.  If that request contains
// an `x-correlation-id` header the value will be added to the
// tracing object on the logger, otherwise a new uuid will be
// gernated and used.
app.use(logger.init());

app.get('/', (req, res) => {
  logger.info('x-correlation-id attached');

  // Further tracing values can be added as required
  logger.tracing.set('service name', 'express example');
  logger.info('service name attached');

  // All tracing values can be accessed at once,
  // this is useful when passing values to
  // downstream services
  res.send(logger.tracing.getAll());
});

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
