const { Router } = require('express');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/user', userRouter);

// Items
router.get('/items'); // Get all items
router.get('/items/:id'); // Get a single item by ID

module.exports = router;
