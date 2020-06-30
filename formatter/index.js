const storage = require('../storage');

const formatLogs = (info) => {
  const tracing = storage.getAll();

  return JSON.stringify({
    timestamp: info.timestamp,
    tracing: {
      ...tracing,
    },
    ...info,
  });
};

module.exports = formatLogs;
