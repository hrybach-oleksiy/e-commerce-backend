const { Router } = require('express');
const userRouter = require('./userRouter');
const countryRouter = require('./country-router');

const router = new Router();

router.use('/user', userRouter);
router.use('/countries', countryRouter);

module.exports = router;
