const { Router } = require('express');
const userRouter = require('./user-router');
const countryRouter = require('./country-router');
const productRouter = require('./product-router');
const cartRouter = require('./cart-router');
const promoRouter = require('./promo-router');

const router = new Router();

router.use('/users', userRouter);
router.use('/countries', countryRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/promo', promoRouter);

module.exports = router;
