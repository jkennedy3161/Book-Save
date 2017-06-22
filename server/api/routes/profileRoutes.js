var router = require('express').Router();

router.route('/')
  .get(function(req, res) {
    res.json({ok: true});
  })
  .post(function(req, res) {
    res.json({ok: true});
  })

module.exports = router;