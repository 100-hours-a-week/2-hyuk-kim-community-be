const { userSchema } = require('../schemas/userSchema');
const { validateMiddleware } = require('../middlewares/validateMiddleware');

const express = require("express");
const userRoute = express.Router();
const userController = require("./../Controller/UserController.js");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require('../middlewares/imageMiddleware');

userRoute.post("/auth/login", validateMiddleware(userSchema.login), userController.login); // O
userRoute.post("/users/signup", validateMiddleware(userSchema.register), upload.single('image'), userController.signup); // O
userRoute.use(authMiddleware); // 이 아래서부터는 모두 middleware 적용한다는 의미!! -> Login 뺴고 다 필요하니까 이렇게 일괄 적용 !!
userRoute.post("/auth/logout", userController.logout);
userRoute.delete("/users", userController.signout); //
// userRoute.get("/users/:userId/profile", userController.getProfile); // O
userRoute.get("/users/profile", userController.getProfile); // O
userRoute.patch("/users/profile", validateMiddleware(userSchema.updateProfile), upload.single('image'), userController.updateProfile); // O
userRoute.patch("/users/password", validateMiddleware(userSchema.updatePassword), userController.updatePasswordById); // O

module.exports = userRoute;
