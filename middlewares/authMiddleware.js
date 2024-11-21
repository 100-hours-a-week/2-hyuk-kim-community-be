const UserErrorCode = require("../common/errors/userErrorCode");

const authMiddleware = (req, res, next) => {
    req.body.userId = req.headers.userid;
    next();
  // try {
  //   const { session } = req;
  //   if (!session || !session.userId) {
  //     throw UserErrorCode.createInvalidAuth();
  //   }
  //   if (req.session.cookie.expires < new Date()) {
  //     throw UserErrorCode.createExpiredSession();
  //   }
  //   req.body.userId = session.userId;
  //   next();
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = authMiddleware;
