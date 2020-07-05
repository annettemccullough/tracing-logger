const { gql } = require('apollo-server-express');
const logger = require('tracing-logger');
const data = require('./data');

// Import the tracing-logger package, this will automatically
// have access to the tracing namespace intialise in index.js
// const logger = require('../..');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {
      const books = data.fetchAll();
      logger.info('Returning Books.');
      logger.debug(books);

      return books;
    },
  },
};

module.exports = { typeDefs, resolvers };
