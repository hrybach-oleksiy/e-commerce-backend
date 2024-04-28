const { Router } = require('express');
const { body } = require('express-validator');

const router = new Router();
const userController = require('../controllers/user-controller');

// User
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 7, max: 14 }),

  userController.registration,
); // User registration
router.get('/activation/:link', userController.activation); // User activation
router.post('/login', userController.login); // User login
router.post('/logout', userController.logout); // User logout
router.get('/refresh', userController.refresh); // Token Refresh

// Items
router.get('/items'); // Get all items
router.get('/items/:id'); // Get a single item by ID

module.exports = router;
