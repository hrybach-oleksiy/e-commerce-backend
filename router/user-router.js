const express = require('express');
const userController = require('../controllers/user-controller');
const { auth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.route('/registration').post(userController.registration);
userRouter.route('/activation/:link').get(userController.activation);
userRouter.route('/login').post(userController.login);
userRouter.route('/logout').post(userController.logout);
userRouter.route('/refresh').get(userController.refresh);
userRouter.route('/check-email').post(userController.checkEmail);
userRouter.route('/:userID').patch(auth, userController.update);
userRouter.route('/:userID/addresses/:type').post(auth, userController.addAddress);
userRouter.route('/:userID/addresses/:type/:id').delete(auth, userController.deleteAddress);
userRouter.route('/:userID/addresses/:type/:id').put(auth, userController.updateAddress);

module.exports = userRouter;
