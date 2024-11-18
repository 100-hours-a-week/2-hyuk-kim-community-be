const dateManager = require("../utils/dateManager");
const errorMiddleware = (err, req, res, next) => {
  console.error(
    `[${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${err.statusCode}, Message: ${err.message}
      ${err.stack}`,
  );

  return res.status(err.statusCode || 500).json({
    message: err.message || "Unexpected error occurred",
  });
};

module.exports = errorMiddleware;
