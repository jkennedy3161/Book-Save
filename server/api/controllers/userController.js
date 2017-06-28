var User = require('../models/userModel.js');

exports.params = function(req, res, next, id) {
  User.findById(id)
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .then(function(user) {
      res.json(user);
    }, function(err) {
      next(err);
    })
};

exports.post = function(req, res, next) {
  var newUser = req.body;

  User.create(newUser)
    .then(function(user) {
      res.json(user);
    }, function(err) {
      next(err);
    })
};