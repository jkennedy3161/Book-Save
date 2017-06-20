var router = require('express').Router();
var userRouter = require('./routes/userRoutes');
var bookRouter = require('./routes/bookRoutes');

// hook different model routes here
router.use('/users', userRouter);
router.use('/books', bookRouter);

module.exports = router;
