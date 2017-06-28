var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: {type: String, unique: true},
  authors: [{type: String}],
  description: String,
  thumbnail: String,
  smallThumbnail: String
});

module.exports = mongoose.model('book', BookSchema);