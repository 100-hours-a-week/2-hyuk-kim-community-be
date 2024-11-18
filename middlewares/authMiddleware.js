const authMiddleware = (req, res, next) => {
    console.log("authMiddleware called");

    const session = req.session;

    if (session && session.email) {
        req.body.email = session.email;
        return next();
    }
}

module.exports = authMiddleware;