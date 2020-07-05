# tracing-logger > examples > apollo-server-express

This example demonstrates how to initialise the tracing-logger for use with Apollo Server.

The logger is initialised once, and can subsequently be accessed in any file - tracing data will be automatically included on all log messages.

## Run the Example
```bash
npm install
node index.js
```

Navigate to http://localhost:4000/graphql and run the following query:
```
{
  books {
    title
    author
  }
}
```

Try including a correlation id in the HTTP Headers:
```json
{ "x-correlation-id": "a71cabcc-7f89-451b-b72c-baeee9f3c7c5" }
```

The example auth token is generated on jwt.io from the format below, for a normal use case this would be passed in as a header.
```json
{
  "name": "Annette McCullough",
  "userId": "38e2c385-bd20-4e98-91b7-930d22959989"
}
```

Observe the console output, all tracing values set are automatically include on every log message:
```bash
{
  "timestamp":"2020-06-22T21:13:36.082Z",
  "tracing":{
    "x-correlation-id":"a71cabcc-7f89-451b-b72c-baeee9f3c7c5",
    "user-name":"Annette McCullough",
    "user-id":"38e2c385-bd20-4e98-91b7-930d22959989"
  },
  "message":{
    "query":"{ books { title author }}",
    "variables":{

    }
  },
  "level":"info"
}
{
  "timestamp":"2020-06-22T21:13:36.105Z",
  "tracing":{
    "x-correlation-id":"a71cabcc-7f89-451b-b72c-baeee9f3c7c5",
    "user-name":"Annette McCullough",
    "user-id":"38e2c385-bd20-4e98-91b7-930d22959989"
  },
  "message":"Fetching All Of The Data: [{\"title\":\"Wuthering Heights\",\"author\":\"Emily Brontë\"},{\"title\":\"Jurassic Park\",\"author\":\"Michael Crichton\"}]",
  "level":"debug"
}
{
  "timestamp":"2020-06-22T21:13:36.105Z",
  "tracing":{
    "x-correlation-id":"a71cabcc-7f89-451b-b72c-baeee9f3c7c5",
    "user-name":"Annette McCullough",
    "user-id":"38e2c385-bd20-4e98-91b7-930d22959989"
  },
  "message":"Returning Books.",
  "level":"info"
}
{
  "timestamp":"2020-06-22T21:13:36.105Z",
  "tracing":{
    "x-correlation-id":"a71cabcc-7f89-451b-b72c-baeee9f3c7c5",
    "user-name":"Annette McCullough",
    "user-id":"38e2c385-bd20-4e98-91b7-930d22959989"
  },
  "message":[
    {
      "title":"Wuthering Heights",
      "author":"Emily Brontë"
    },
    {
      "title":"Jurassic Park",
      "author":"Michael Crichton"
    }
  ],
  "level":"debug"
}
```
