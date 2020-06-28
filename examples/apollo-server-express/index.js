const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');

const serverConfig = require('./server-config');
const plugin = require('./plugins');

// Import the tracing-logger package
// const logger = require('@annettemccullough/tracing-logger')
const logger = require('../..');

const app = express();

// Initialise the logger, this will create a tracing namespace
// is unique to the current request.  If that request contains
// an `x-correlation-id` header the value will be added to the
// tracing object on the logger, otherwise a new uuid will be
// gernated and used.
app.use(logger.init());

const apollo = new ApolloServer({
  ...serverConfig, // this serverConfig uses the logger, go see!
  plugins: [plugin], // this plugin uses the logger, go see!
  context: async ({ req }) => {
    // Go to jwt.io and create a jwt in the format { "name": "---", "userId": "---" }
    // Uncomment the line below and call the server with the jwt in an
    // authorisation header - the decoded values will be added to all log
    // messages.

    // const authHeader = req.headers.authorisation;
    const authHeader = require('./auth-header');

    const decodedToken = jwt.decode(authHeader.replace('Bearer ', ''));

    // Pluck the relevant values off the decoded token for use
    // on all log messages.
    logger.tracing.set('user-name', decodedToken.name);
    logger.tracing.set('user-id', decodedToken.userId);
  },
});

apollo.applyMiddleware({ app });

const server = http.createServer(app);

server.listen('4000', () => {
  logger.info('🚀  Server ready');
});
