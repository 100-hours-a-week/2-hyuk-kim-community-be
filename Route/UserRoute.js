const express = require('express');
const userRoute = express.Router();
const userController = require('./../Controller/UserController.js');

userRoute.post('/auth/login', userController.login);
userRoute.post('/auth/logout', userController.logout);
userRoute.post('/users/signup', userController.signup);
userRoute.patch('/users/nickname', userController.updateNickname);
userRoute.patch('/users/password', userController.updatePassword);
userRoute.delete('/users/', userController.signout);

module.exports = userRoute;