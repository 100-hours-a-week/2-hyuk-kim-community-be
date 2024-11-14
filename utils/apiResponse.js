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
module.exports.error = (req, res, error) => {
  console.log(
    `error!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${error.code}, Message: ${error.message}`,
  );
  if (error.code >= 500) {
    return res.status(error.code).json({
      message: userResponseCodes.SERVER_ERROR.unexpectedError.message,
    });
  }
  return res.status(error.code).json({ message: error.message });
};
