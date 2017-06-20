var router = require('express').Router();

router.route('/')
  .get(function(req, res) {
    res.send({ok: true});
  });

module.exports = router;