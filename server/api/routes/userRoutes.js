var router = require('express').Router();
var userController = require('../controllers/userController');

router.param('id', userController.params);

router.route('/')
  .get(userController.get)
  .post(userController.post);

module.exports = router;