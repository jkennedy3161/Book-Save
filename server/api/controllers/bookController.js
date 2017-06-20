var Book = require('../models/bookModel');

exports.get = function(req, res, next) {
  Book.find({})
    .then(function(books) {
      res.json(books);
    }, function(err) {
      next(err);
    })
};

exports.post = function(req, res, next) {
  var newBook = req.body;

  Book.create(newBook)
    .then(function(book) {
      res.json(book);
    }, function(err) {
      next(err);
    });
};