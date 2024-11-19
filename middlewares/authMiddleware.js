const UserErrorCode = require("../common/errors/userErrorCode");

const authMiddleware = (req, res, next) => {
  try {
    const { session } = req;
    if (!session || !session.email) {
      throw UserErrorCode.createInvalidAuth();
    }
    if (req.session.cookie.expires < new Date()) {
      throw UserErrorCode.createExpiredSession();
    }
    req.body.email = session.email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
