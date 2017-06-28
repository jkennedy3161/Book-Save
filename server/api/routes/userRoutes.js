var router = require('express').Router();
var userController = require('../controllers/userController');

router.param('id', userController.params);

router.route('/')
  .get(userController.get)
  .post(userController.post);

router.route('/:id')
  .get(userController.getOne)
  .delete(userController.delete);

module.exports = router;