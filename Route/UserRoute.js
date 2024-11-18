const express = require("express");
const userRoute = express.Router();
const userController = require("./../Controller/UserController.js");

userRoute.post("/auth/login", userController.login); // O
userRoute.post("/auth/logout", userController.logout);
userRoute.post("/users/signup", userController.signup); // O
userRoute.delete("/users/", userController.signout); // O
userRoute.get("/users/nickname", userController.getNicknameByEmail); // O
userRoute.patch("/users/nickname", userController.updateNicknameByEmail); // O
userRoute.patch("/users/password", userController.updatePasswordByEmail); // O

module.exports = userRoute;
