var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  imageLinks: [{type: String}]
});

module.exports = mongoose.model('book', BookSchema);