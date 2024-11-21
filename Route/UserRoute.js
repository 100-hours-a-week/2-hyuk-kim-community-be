const express = require("express");
const userRoute = express.Router();
const userController = require("./../Controller/UserController.js");
const authMiddleware = require("../middlewares/authMiddleware");

userRoute.post("/auth/login", userController.login); // O
// userRoute.use(authMiddleware); // 이 아래서부터는 모두 middleware 적용한다는 의미!! -> Login 뺴고 다 필요하니까 이렇게 일괄 적용 !!
userRoute.post("/auth/logout", userController.logout);
userRoute.post("/users/signup", userController.signup); // O
userRoute.delete("/users/", userController.signout); // O
userRoute.get("/users/nickname", userController.getNicknameByEmail); // O
userRoute.patch("/users/nickname", userController.updateNicknameByEmail); // O
userRoute.patch("/users/password", userController.updatePasswordByEmail); // O

module.exports = userRoute;
