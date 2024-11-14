const express = require("express");
const userRoute = express.Router();
const userController = require("./../Controller/UserController.js");

userRoute.post("/auth/login", userController.login);
userRoute.post("/auth/logout", userController.logout);
userRoute.post("/users/signup", userController.signup);
userRoute.get("/users/:email/nickname", userController.getNicknameByEmail);
userRoute.patch("/users/nickname", userController.updateNicknameByEmail);
userRoute.patch("/users/password", userController.updatePasswordByEmail);
userRoute.delete("/users/", userController.signout);

module.exports = userRoute;
