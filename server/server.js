var express = require('express');
var app = express();
var mongoose = require('mongoose');

var api = require('./api/api');
var err = require('./middleware/err');
var config = require('./config/config');
var auth = require('./auth/routes');
var stripe = require("stripe")(config.secrets.stripe);
// handles serving static assets and returning json body from requests
require('./middleware/middleware')(app, express);

mongoose.Promise = global.Promise;
var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  mongoose.connect(connection_string, {useMongoClient: true});
} else {
  mongoose.connect(config.db.url, { useMongoClient: true });
}

// setup routes
app.use('/api', api);
app.use('/auth', auth);

app.use('/payment', function(req, res, next) {
  //console.log(req.body)
  var token = req.body.stripeToken;

  // charge the user's card
  var charge = stripe.charges.create({
    amount: req.body.price,
    currency: 'usd',
    description: 'Payment charge for ' + req.body.name,
    source: token
  }, function(err, charge) {
    if(err) {
      next(err);
    } else
      res.json(charge);
  });
});

// global err handling middleware
app.use(err());

module.exports = app;