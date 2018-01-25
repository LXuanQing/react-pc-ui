const _ = require('lodash')

module.exports = function webpackConfig(config, webpack) {
  config.externals = [];

  _.set(config, 'output.publicPath', './')

  config.resolve.extensions = (config.resolve.extensions || ['', '.js', '.jsx', '.json']).concat(['.ts', '.tsx'])
};
