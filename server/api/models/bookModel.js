var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: {type: String, unique: true},
  authors: [{type: String}],
  description: String,
  thumbnail: String,
  smallThumbnail: String,
  owners: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

module.exports = mongoose.model('book', BookSchema);