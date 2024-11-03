// import { db } from '../config/mysql';
const db = require('../config/mysql');
const userModel = require('../Model/user');
// import { userModel } from './../model/userModel.js';
// const conn = db.init();

 function logout() {

}

 function login() {

}

 function signup() {

}

 function updateNickname() {

}

 function updatePassword() {

}

 function signout() {

}




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
// function executeQuery(sql, params, res, callback) {
//     conn.getConnection((err, connection) => {
//         if (err) {
//             console.error('Connection error!!! \n', err);
//             return res.status(500).json({ error: 'Database connection error' });
//         }
//
//         connection.query(sql, params, (err, results) => {
//             connection.release(); // 쿼리 완료 후 연결 해제
//
//             if (err) {
//                 console.error('Query error !!! \n', err);
//                 return res.status(500).json({ error: 'Database query error' });
//             }
//
//             callback(results);
//         });
//     });
// }