var bookController = require('../controllers/bookController');
var router = require('express').Router();

router.route('/')
  .get(bookController.get)
  .post(bookController.post);

module.exports = router;