var Book = require('../models/bookModel');

exports.params = function(req, res, next, id) {
  Book.findById(id)
    .then(function(book) {
      if (!book) {
        next(new Error('no book with that id found...'));
      } else {
        req.book = book;
        next();
      }
    }, function(err) {
      next(err);
    })
};

exports.get = function(req, res, next) {
  Book.find({})
    .then(function(books) {
      res.json(books);
    }, function(err) {
      next(err);
    })
};

exports.getOne = function(req, res, next) {
  var book = req.book;
  res.json(book);
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