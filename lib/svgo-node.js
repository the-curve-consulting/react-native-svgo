'use strict';

const { optimize: optimizeAgnostic } = require('./svgo.js');

// eslint-disable-next-line no-unused-vars
const loadConfig = async (_configFile, _cwd) => {
  throw new Error(
    'Not implemented error. React Native does not support dynamic imports. ' +
      'This package (`react-native-svgo`) is meant to be used with react-native, ' +
      'if you are not using react-native please consider using the original `https://github.com/svg/svgo` package.'
  );
};
exports.loadConfig = loadConfig;

const optimize = (input, config) => {
  if (config == null) {
    config = {};
  }
  if (typeof config !== 'object') {
    throw Error('Config should be an object');
  }
  return optimizeAgnostic(input, {
    ...config,
    js2svg: {
      eol: 'lf',
      ...config.js2svg,
    },
  });
};
exports.optimize = optimize;
