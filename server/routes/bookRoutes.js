var bookRouter = require('express').Router();

bookRouter.route('/')
  .get(function(req, res) {
    res.send('inside bookRoutes');
  });

module.exports = bookRouter;