const dateManager = require("../utils/dateManager");
const loggingMiddleware = (req, res, next) => {
    console.log(`[${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = loggingMiddleware;