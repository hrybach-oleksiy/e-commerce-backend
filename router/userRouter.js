const express = require('express');
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');

const userRouter = express.Router();

userRouter
  .route('/registration')
  .post(body('email').isEmail(), body('password').isLength({ min: 7, max: 14 }), userController.registration);

// router.post(
// 	'/registration',
// 	body('email').isEmail(),
// 	body('password').isLength({ min: 7, max: 14 }),

// 	userController.registration,
//   ); // User registration
// router.get('/activation/:link', userController.activation); // User activation
// router.post('/login', userController.login); // User login
// router.post('/logout', userController.logout); // User logout
// router.get('/refresh', userController.refresh); // Token Refresh

module.exports = userRouter;
