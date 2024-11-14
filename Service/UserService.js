const User = require("../Model/user");
const userResponseCodes = require("../utils/userResponseCodes");

module.exports.login = async (req) => {
  const result = await User.login(req.body.email, req.body.password);
  if (result) {
    throw userResponseCodes.BAD_REQUEST.invalidCredentials;
  }
  return userResponseCodes.createResponse(
    userResponseCodes.CREATED.userCreated,
    result,
  );
};

module.exports.logout = async (req) => {};

module.exports.signup = async (req) => {
  const { email, password, nickname } = req.body;
  if (!email || !password) throw userResponseCodes.BAD_REQUEST.invalidFormat;
  if (await User.findUserByEmail(email)) {
    throw userResponseCodes.CONFLICT.emailExists;
  }
  const data = await User.signup(email, password, nickname);
  return userResponseCodes.createResponse(
    userResponseCodes.CREATED.userCreated,
    data,
  );
};

module.exports.signout = async (req) => {
  return User.signout(req.body.email);
};

module.exports.getNicknameByEmail = async (req) => {
  return User.getNicknameByEmail(req.params.email);
};

module.exports.updateNicknameEmail = async (req) => {
  return User.updateNicknameEmail(req.body.email, req.body.nickname);
};

module.exports.updatePasswordEmail = async (req) => {
  return User.updatePasswordEmail(req.body.email, req.body.password);
};

// board (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
module.exports.setUserInfoByEmail = async (board) => {
  return User.setUserInfoByEmail(board);
};

// board list (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
module.exports.setUserInfoInListByEmail = async (board) => {
  await Promise.all(
    Object.keys(board).map((key) => User.setUserInfoByEmail(board[key])),
  );
  return board;
};
