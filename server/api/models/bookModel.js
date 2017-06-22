var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: {type: String, unique: true},
  author: String,
  description: String,
  imageLinks: [{type: String}]
});

module.exports = mongoose.model('book', BookSchema);