const _ = require('lodash');
const { createNamespace } = require('continuation-local-storage');
const { v4 } = require('uuid');

const namespace = createNamespace(`tracing-logger:${v4()}`);
const init = () => (request, response, next) => {
  namespace.bindEmitter(request);
  namespace.bindEmitter(response);

  let xCorrelationId = _.get(request.headers, 'x-correlation-id', v4());
  xCorrelationId = xCorrelationId === "" ? v4() : xCorrelationId

  response.append('x-correlation-id', xCorrelationId);

  namespace.run(() => {
    namespace.set('x-correlation-id', xCorrelationId);
    next();
  });
};

const get = (key) => namespace.get(key);
const getAll = () => _.omit(namespace.active, 'id', '_ns_name');
const set = (key, value) => namespace.set(key, value);

module.exports = {
  init, get, getAll, set,
};
