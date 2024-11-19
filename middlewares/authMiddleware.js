const UserErrorCode = require("../common/errors/userErrorCode");

const authMiddleware = (req, res, next) => {
  try {
    const { session } = req;
    if (req.session.id !== req.sessionID) {
      throw UserErrorCode.createInvalidAuth();
    }
    if (req.session.cookie.expires < new Date()) {
      throw UserErrorCode.createExpiredSession();
    }
    if (!session || !session.email) {
      throw UserErrorCode.notLoggedIn();
    }
    req.body.email = session.email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
