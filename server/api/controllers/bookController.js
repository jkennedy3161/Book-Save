var Book = require('../models/bookModel');
var User = require('../models/userModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Book.findById(id)
    .populate('owners')
    .exec()
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
  console.log(req.user);
  Book.find()
    .populate('owners')
    .exec()
    .then(function(books) {
      var userBooks = books.filter(function(book) {
        return ('' + book.owners[0]._id === '' + req.user._id);
      })
      res.json(userBooks);
    }, function(err) {
      next(err);
    })
};

exports.getOne = function(req, res, next) {
  var book = req.book;
  res.json(book);
};

exports.put = function(req, res, next) {
  var book = req.book;

  var update = req.body;

  _.merge(book, update);

  book.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
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

exports.delete = function(req, res, next) {
  req.book.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};