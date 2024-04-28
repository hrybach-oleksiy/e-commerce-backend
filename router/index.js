const { Router } = require('express');

const router = new Router();
const userController = require('../controllers/user-controller');

// User
router.post('/registration', userController.registration); // User registration
router.get('/activation/:link', userController.activation); // User activation
router.post('/login'); // User login
router.post('/logout'); // User logout
router.get('/refresh'); // Token Refresh

// Items
router.get('/items'); // Get all items
router.get('/items/:id'); // Get a single item by ID

module.exports = router;
