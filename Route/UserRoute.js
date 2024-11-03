const express = require('express');
const userRoute = express.Router();
const userController = require('./../Controller/UserController.js');

// userRoute.post('/api/auth/login', userController.login);
// userRoute.post('/api/auth/logout', userController.logout);
// userRoute.post('/api/users/signup', userController.signup);
// userRoute.patch('/api/users/nickname', userController.updateNickname);
// userRoute.patch('/api/users/password', userController.updatePassword);
// userRoute.delete('/api/users/:userId', userController.signout);

module.exports = userRoute;