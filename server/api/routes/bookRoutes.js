var bookController = require('../controllers/bookController');
var router = require('express').Router();

var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', bookController.params);

router.route('/')
  .get(checkUser, bookController.get)
  .post(checkUser, bookController.post);

router.route('/:id')
  .get(bookController.getOne)
  .put(checkUser, bookController.put)
  .delete(checkUser, bookController.delete)

module.exports = router;