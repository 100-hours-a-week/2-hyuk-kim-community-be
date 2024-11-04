const userService = require("../Service/UserService");

module.exports.login = async function (req, res) {
    return res.status(200).send(await userService.login(req));
}

module.exports.logout = function (req, res) {}

module.exports.signup = async function (req, res) {
    const id = await userService.signup(req);
    res.status(201).end()
}

module.exports.signout = async function (req, res) {
    const id = await userService.signout(req);
    res.status(200).end();
}

module.exports.updateNickname = async function (req, res) {
    const id = await userService.updateNickname(req);
    res.status(200).end();
}

module.exports.updatePassword = async function (req, res) {
    const id = await userService.updatePassword(req);
    res.status(200).end();
}

module.exports = this;



// export const getUsers = (req, res) => {
//     const sql = 'SELECT * FROM user_tb';
//     executeQuery(sql, [], res, (results) => {
//         res.status(200).json(userModel.fromDatabase(results));
//     });
// };
//
// export const postUser = (req, res) => {
//     const sql = 'INSERT INTO user_tb (name) VALUES (?)';
//     executeQuery(sql, req.body.name, res, (results) => {
//         res.status(201).json({ message: 'User created', results });
//     });
// };
//
// export const put = (req, res) => {
//     const sql = `UPDATE user_tb SET name = "${req.body.name}" WHERE user_id = ${req.body.user_id};`
//     executeQuery(sql, [], res, (results) => {
//         res.status(201).json({ message: 'User changed', results });
//     });
// };
//
// export const patch = (req, res) => {
//     const sql = `UPDATE user_tb SET name = "${req.body.name}" WHERE user_id = ${req.body.user_id};` // 두개밖에 없어서 차이가 없네;
//     executeQuery(sql, [], res, (results) => {
//         res.status(201).json({ message: 'User changed', results });
//     });
// };
//
// export const deleteByUserId = (req, res) => {
//     const sql = `DELETE FROM user_tb WHERE user_id = ${req.body.user_id};`
//     executeQuery(sql, [], res, (results) => {
//         res.status(201).json({ message: 'User changed', results });
//     });
// };
//
//

// }