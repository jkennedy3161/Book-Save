var mongoose =  require('mongoose');
var ProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }]

});

module.exports = mongoose.model('profile', ProfileSchema);