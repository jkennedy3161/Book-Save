var express = require('express');
var app = express();
var mongoose = require('mongoose');

var api = require('./api/api');
var err = require('./middleware/err');
var config = require('./config/config');
// handles serving static assets and returning json body from requests
require('./middleware/middleware')(app, express);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

// setup routes
app.use('/api', api);

// global err handling middleware
app.use(err());

module.exports = app;