var router = require('express').Router();
var userRouter = require('./routes/userRoutes');
var bookRouter = require('./routes/bookRoutes');
var profileRouter = require('./routes/profileRoutes');

// hook different model routes here
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/profile', profileRouter);

module.exports = router;
