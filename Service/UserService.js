// const User = require("../Model/user");
const UserModel = require("../Model/UserModel");
const userModel = new UserModel();
const UserErrorCode = require("../common/codes/userErrorCode");
const {uploadImage, getImageUrl} = require("../utils/imageUploader");

module.exports.login = async (req) => {
  const { email, password } = req.body;
  const user = await validateEmail(email);
  if (user.deleteat) {
    throw UserErrorCode.createDeleteUser();
  }
  const passwordMatch = user.password === password; // 패스워드 비교하는 함수 필요!
  if (!passwordMatch) {
    throw UserErrorCode.createInvalidCredentials();
  }
  return {
    userId: user.id,
    profile: user.profile,
  };
};

module.exports.logout = async (req) => {};

module.exports.signup = async (req) => {
  console.log(req.body);
  const { email, password, nickname, image } = req.body;
  console.log(`email: ${email} password: ${password} image: ${image}`);
  await validateNewEmail(email);

  // const imageUrl = await uploadImage(req.file, "profile");

  if(!await userModel.signup(email, password, nickname, image)) {
      throw UserErrorCode.createUnexpectedError();
  }
  return {}// TF 검증 필요!
};

module.exports.signout = async (req) => {
  const { userId } = req.user?.userId;
  await validateId(userId);
  return userModel.signout(userId);
};

module.exports.getProfile = async (req) => {
  const userId  = req.user?.userId;
  console.log(req.body);
  console.log(userId);
  await validateId(userId);
  return userModel.getProfile(userId);
};

module.exports.updateProfile = async (req) => {
  const userId  = req.user?.userId;
  const { nickname, image } = req.body;
  const updates = {};
  if (nickname !== "") {
    updates.nickname = nickname;
  }
  if (image) {
    updates.profile = image
  }
  await userModel.updateProfile(userId, updates);
  return {profile: updates.profile};
};

module.exports.updatePasswordById = async (req) => {
  const userId = req.user?.userId;
  const { password } = req.body;
  await validateId(userId);
  return userModel.updatePasswordById(userId, password);
};

const validateEmail = async (email) => {
  const user = await userModel.validEmail(email);
  if (!user) throw UserErrorCode.createUserNotFound();
  return user;
};

// Id에 맞는 사용자가 있는지 검증
const validateId = async (userId) => {
  const user = await userModel.validId(userId);
  if (!user) throw UserErrorCode.createUserNotFound();
  return user;
};

// 새로운 이메일인지 검증
const validateNewEmail = async (email) => {
  const exists = await userModel.validEmail(email);
  if (exists) throw UserErrorCode.createEmailExists();
};
