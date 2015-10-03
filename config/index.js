import config from './config';
import configTest from './config.test';

var cases = {
  'dev': config,
  'development': config,
  'test': configTest,
  'default': config,
};

export function getConfig(type) {
  const t = type ? type.toLowerCase() : 'default';
  return cases[t];
};
