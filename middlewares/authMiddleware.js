const UserErrorCode = require("../common/codes/userErrorCode");

const authMiddleware = (req, res, next) => {
    req.body.userId = req.headers.userid;
    req.user = {
        userId: req.headers.userid
    };
    next();
};

module.exports = authMiddleware;
