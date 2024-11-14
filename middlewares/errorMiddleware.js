const dateManager = require("../utils/dateManager");
const userResponseCodes = require("../utils/userResponseCodes");
module.exports.error = (err, req, res, next) => {
  console.log(
    `error!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${error.code}, Message: ${error.message}`,
  );

  let error = {
    //* 에러가 발생했지만, 기본적인 에러 코드나 에러 메세지가 존재하지 않을 경우를 대비한
    //* default 에러 코드 및 에러 메세지
    statusCode:
      err.statusCode || userResponseCodes.SERVER_ERROR.unexpectedError.code,
    message: err.message || userResponseCodes.SERVER_ERROR.unexpectedError.message,
  };


};
