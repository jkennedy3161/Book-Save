var _ = require('lodash');
var dev = require('./development');
var test = require('./testing');
var prod = require('./production');

// default config obj for our api
var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

var envConfig = require('./' + config.env);

module.exports = _.merge(config, envConfig);