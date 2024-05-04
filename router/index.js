const { Router } = require('express');
const userRouter = require('./userRouter');
const countryRouter = require('./countryRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/country', countryRouter);

module.exports = router;
