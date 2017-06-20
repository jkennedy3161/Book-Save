module.exports = function() {
  return function(err, req, res, next) {
    if (err) {
      res.json('error: ' + err.message);
    }
  };
};