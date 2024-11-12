const User = require("../Model/user");
const userResponseCodes = require("../utils/userResponseCodes");

module.exports.login = async (req) => {
  const result = User.login(req.body.email, req.body.password);
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

module.exports.getNickname = async (req) => {
  return User.getNickname(req.params.email);
};

module.exports.updateNickname = async (req) => {
  return User.updateNickname(req.body.email, req.body.nickname);
};

module.exports.updatePassword = async (req) => {
  return User.updatePassword(req.body.email, req.body.password);
};

module.exports.addUserInfo = async (board) => {
  return User.addUserInfo(board);
};

module.exports.addUserInfoInList = async (board) => {
  await Promise.all(
    Object.keys(board).map((key) => User.addUserInfo(board[key])),
  );
  return board;
};
