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
  if (user.deleteat) {
    throw UserErrorCode.createDeleteUser();
  }
  const passwordMatch = user.password === password; // 패스워드 비교하는 함수 필요!
  if (!passwordMatch) {
    throw UserErrorCode.createInvalidCredentials();
  }
  return user.id;
};

module.exports.logout = async (req) => {};

module.exports.signup = async (req) => {
  console.log(req.body);
  const { email, password, nickname } = req.body;
  await validateFields(req.body, ["email", "password", "nickname"]);
  await validateNewEmail(email);
  if(!await userModel.signup(email, password, nickname)) {
      throw UserErrorCode.createUnexpectedError();
  }
  return {}// TF 검증 필요!
};

module.exports.signout = async (req) => {
  const { userId } = req.body;
  await validateFields(req.body, ["userId"]);
  await validateId(userId);
  return userModel.signout(userId);
};

module.exports.getNicknameById = async (req) => {
  const { userId }  = req.body;
  console.log(req.body);
  console.log(userId);
  await validateFields(req.body, ["userId"]);
  await validateId(userId);
  return userModel.getNicknameById(userId);
};

module.exports.updateNicknameById = async (req) => {
  const { userId, nickname } = req.body;
  await validateFields(req.body, ["userId", "nickname"]);
  await validateId(userId);
  return userModel.updateNicknameById(userId, nickname);
};

module.exports.updatePasswordById = async (req) => {
  const { userId, password } = req.body;
  await validateFields(req.body, ["userId", "password"]);
  await validateId(userId);
  return userModel.updatePasswordById(userId, password);
};

// 필수값 데이터 검증
const validateFields = (fields, required) => {
  for (const field of required) {
    if (!fields[field]) throw UserErrorCode.createInvalidFormat();
  }
};

// 이메일에 맞는 사용자 있는지 검증 -> Id로 변경 예정
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


// 아래 내용은 boardService에서 join으로 대체할 예정
// // board (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
// module.exports.setUserInfoByEmail = async (board) => {
//   return userModel.setUserInfoByEmail(board);
// };
//
// // board list (post, comment)를 받아 email에 맞는 닉네임을 추가하는 과정
// module.exports.setUserInfoInListByEmail = async (board) => {
//   await Promise.all(
//     Object.keys(board).map((key) => userModel.setUserInfoByEmail(board[key])),
//   );
//   return board;
// };
