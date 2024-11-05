const User = require('../Model/user');

module.exports.login = async (req) => {
    console.log(req.body);
    return User.login(req.body.email, req.body.password);
}

module.exports.logout = async (req) => {}

module.exports.signup = async (req) => {
    return User.signup(req.body.email, req.body.password, req.body.nickname);
};

module.exports.signout = async (req) => {
    return User.signout(req.body.email);
}

module.exports.getNickname = async (req) => {
    return User.getNickname(req.params.email);
}

module.exports.updateNickname = async (req) => {
    return User.updateNickname(req.body.email, req.body.nickname);
}

module.exports.updatePassword = async (req) => {
    return User.updatePassword(req.body.email, req.body.password);
}


