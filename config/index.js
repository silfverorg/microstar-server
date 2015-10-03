import config from './config';
import config.test from './config.test';

var cases = {
  'dev': config,
  'development': config,
  'test': config.test,
  'default': config,
};

export function getConfig(type) {
  const t = type ? type.toLower() : 'default';
  return cases[t];
};
