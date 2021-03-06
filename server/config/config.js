var _ = require('lodash');
var dev = require('./development');
var test = require('./testing');
var prod = require('./production');

// default config obj for our api
var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  //port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
  db: {url: 'mongodb://127.0.0.1:27017/booksave'},
  //db: {url: 'mongodb://jj:test@ec2-54-69-209-87.us-west-2.compute.amazonaws.com:27017/dummyDB'},
  expireTime: '5d',
  secrets: {
    jwt: process.env.JWT || 'sushi',
    stripe: process.env.STRIPE || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2'
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

var envConfig = require('./' + config.env);

module.exports = _.merge(config, envConfig);