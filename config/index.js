const config = require('./config');
const configTest = require('./config.test');

const cases = {
  'dev': config,
  'development': config,
  'test': configTest,
  'default': config,
};

function getConfig(type) {
  const t = type ? type.toLowerCase() : 'default';
  return cases[t];
};

exports.getConfig = getConfig;
