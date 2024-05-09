const express = require('express');
const userController = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.route('/registration').post(userController.registration);
userRouter.route('/activation/:link').get(userController.activation);
userRouter.route('/login').post(userController.login);
userRouter.route('/logout').post(userController.logout);
userRouter.route('/refresh').get(userController.refresh);

module.exports = userRouter;
