var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bookRouter = require('./routes/bookRoutes');

// handles serving static assets and returning json body from requests
require('./middleware/middleware')(app, express);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/books');

// setup routes
app.use('/books', bookRouter);

app.listen(3000);
console.log('server runnning');