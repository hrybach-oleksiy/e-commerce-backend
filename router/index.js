const { Router } = require('express');

const router = new Router();
const UserController = require('../controllers/user-controller');

// User Authentication
router.post('/registration', UserController.registration); // User registration
router.post('/login'); // User login
router.post('/logout'); // User logout

// Items
router.get('/items'); // Get all items
router.get('/items/:id'); // Get a single item by ID

module.exports = router;
