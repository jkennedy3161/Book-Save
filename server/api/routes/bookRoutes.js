var bookController = require('../controllers/bookController');
var router = require('express').Router();

router.param('id', bookController.params);

router.route('/')
  .get(bookController.get)
  .post(bookController.post);

router.route('/:id')
  .get(bookController.getOne);

module.exports = router;