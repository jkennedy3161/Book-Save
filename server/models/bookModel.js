var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String
});

module.exports = mongoose.model('book', BookSchema);