var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var override = require('method-override');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(express.static('client'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};