# tracing-logger

The tracing-logger is an opinionated implementation of the [winston](https://www.npmjs.com/package/winston) logger that simplifies tracing and correlation of log messages within a single application, and across services.

When used across multiple services, you can also enjoy a consistent log format making it more straightforward to create search facets in your log tooling.

The log level is set to `info` where `NODE_ENV` is `production`, and `debug` otherwise.

## Log Format
Each log message is created with a UTC timestamp and a `tracing` node.
This will contain an `x-correlation-id` uuid at a minimum in addition to any other values you choose to add.
```json
{
  "timestamp":"2020-06-22T21:13:36.105Z",
  "tracing":{
    "x-correlation-id":"a71cabcc-7f89-451b-b72c-baeee9f3c7c5",
    "user-id":"38e2c385-bd20-4e98-91b7-930d22959989"
  },
  "message":"some log message or data",
  "level":"debug"
}
```

The logger should be initialised and added as middleware to your server to allow it to intercept each incoming request.

The `x-correlation-id` attribute is added automatically when the logger is initialised.  
If this header is provided then the consumer provided value will be used, otherwise a new uuid will be generated and added.

Additional values can be appended to the tracing object for automatic inclusion on all log messages.

## Initialisation
```js
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const http = require('http');


const logger = require('tracing-logger')

const app = express();
app.use(logger.init());

const apollo = new ApolloServer({
  ...
  context: async ({ req }) => {
    const authHeader = req.headers.authorisation;
    const decodedToken = jwt.decode(authHeader.replace('Bearer ', ''));

    logger.tracing.set('user-name', decodedToken.name);
    logger.tracing.set('user-id', decodedToken.userId);

    logger.debug('jwt decoded');
  },
});

apollo.applyMiddleware({ app });

const server = http.createServer(app);

server.listen('4000', () => {
  logger.info('🚀  Server ready');
});
```

## Usage
```js
const logger = require('tracing-logger')

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
  const xCorrelationId = logger.tracing.get('x-correlation-id');

  // attach the xCorrelationId to the
  // `x-correlation-id` request header
  // when making downstream requests
};

module.exports = { fetchAll };
```

See [the apollo-server-express example](./examples/apollo-server-express) for a working demonstration.
