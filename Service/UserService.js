// const User = require("../Model/user");
const UserModel = require("../Model/UserModel");
const userModel = new UserModel();
const UserErrorCode = require("../common/errors/userErrorCode");

/*
검증 로직 추가 필요함!
-> 지금은 값이 존재하는지 보는데, 비밀번호 몇글자 이런 식으로 수정이 필요함!
 */

module.exports.login = async (req) => {
  const { email, password } = req.body;
  await validateFields(req.body, ["email", "password"]);
  const user = await validateEmail(email);
  const passwordMatch = user.password === password; // 패스워드 비교하는 함수 필요!
  if (!passwordMatch) {
    throw UserErrorCode.createInvalidCredentials();
  }
  return email;
};

module.exports.logout = async (req) => {};

module.exports.signup = async (req) => {
  console.log(req.body);
  const { email, password, nickname } = req.body;
  await validateFields(req.body, ["email", "password", "nickname"]);
  await validateNewEmail(email); // 얘는 반대여야지!
  return await userModel.signup(email, password, nickname);
};

module.exports.signout = async (req) => {
  const { email } = req.body;
  await validateFields(req.body, ["email"]);
  await validateEmail(email);
  return userModel.signout(email);
};

module.exports.getNicknameByEmail = async (req) => {
  const email = req.body.email;
  await validateFields(req.body, ["email"]);
  await validateEmail(email);
  return userModel.getNicknameByEmail(email);
};

module.exports.updateNicknameEmail = async (req) => {
  const { email, nickname } = req.body;
  await validateFields(req.body, ["email", "nickname"]);
  await validateEmail(email);
  return userModel.updateNicknameEmail(email, nickname);
};

module.exports.updatePasswordEmail = async (req) => {
  const { email, password } = req.body;
  await validateFields(req.body, ["email", "password"]);
  await validateEmail(email);
  return userModel.updatePasswordEmail(email, password);
};

// 필수값 데이터 검증
const validateFields = (fields, required) => {
  for (const field of required) {
    if (!fields[field]) throw UserErrorCode.createInvalidFormat();
  }
};

// 이메일에 맞는 사용자 있는지 검증
const validateEmail = async (email) => {
  const user = await userModel.validEmail(email);
  if (!user) throw UserErrorCode.createUserNotFound();
  return user;
};

// 새로운 이메일인지 검증
const validateNewEmail = async (email) => {
  const exists = await userModel.validEmail(email);
  if (exists) throw UserErrorCode.createEmailExists();
};

// board (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
module.exports.setUserInfoByEmail = async (board) => {
  return userModel.setUserInfoByEmail(board);
};

// board list (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
module.exports.setUserInfoInListByEmail = async (board) => {
  await Promise.all(
    Object.keys(board).map((key) => userModel.setUserInfoByEmail(board[key])),
  );
  return board;
};
