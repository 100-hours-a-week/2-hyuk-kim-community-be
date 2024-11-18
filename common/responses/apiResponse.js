const dateManager = require("../../utils/dateManager");

module.exports.success = (req, res, response) => {
  console.log(
      `info!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${response.statusCode}, Message: ${response.message}`,
  );
  return res
      .status(response.statusCode)
      .json({
        status: 'success',
        message: response.message,
        data: response.data || {}
      });
};