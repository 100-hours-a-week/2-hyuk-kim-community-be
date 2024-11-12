const dateManager = require("./dateManager");
const userResponseCodes = require("./userResponseCodes");

module.exports.success = (req, res, response) => {
  console.log(
    `info!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${response.code}, Message: ${response.message}`,
  );
  return res
    .status(response.code)
    .json({ message: response.message, data: response.data || {} });
};

module.exports.error = (req, res, response) => {
  console.log(
    `error!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${response.code}, Message: ${response.message}`,
  );
  if (response.code >= 500) {
    return res
      .status(response.code)
      .json({
        message: userResponseCodes.SERVER_ERROR.unexpectedError.message,
      });
  }
  return res.status(response.code).json({ message: response.message });
};
