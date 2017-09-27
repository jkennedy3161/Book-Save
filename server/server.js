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

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || '8080');

app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

mongoose.Promise = global.Promise;
var connection_string = config.db.url;

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  connection_string = "mongodb://" + process.env.OPENSHIFT_MONGODB_DB_HOST + ":" + process.env.OPENSHIFT_MONGODB_DB_PORT + "/booksave";
  mongoose.connect(connection_string, { useMongoClient: true });
} else {
  mongoose.connect(connection_string, { useMongoClient: true });
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

app.listen(app.get('port'), app.get('ip'), function() {
  console.log('server running on ' + app.get('ip') + ', port ' + app.get('port'));
});