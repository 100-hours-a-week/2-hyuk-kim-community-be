const dateManager = require("../utils/dateManager");
const userErrorCode = require("../utils/userErrorCode");
const errorMiddleware = (err, req, res, next) => {
  console.log("errorMiddleware!!");
  console.log(
      `error!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${err.statusCode}, Message: ${err.message}`,
  );

  return res.status(err.statusCode || 500).json({
    message: err.message || "Unexpected error occurred"
  });
};

module.exports = errorMiddleware;