const UserErrorCode = require("../common/errors/userErrorCode");

const authMiddleware = (req, res, next) => {
    req.body.userId = req.headers.userid;
    req.user = {
        userId: req.headers.userid
    };
    next();
};

module.exports = authMiddleware;
