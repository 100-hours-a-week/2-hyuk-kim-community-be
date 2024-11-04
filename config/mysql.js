// import dotenv from 'dotenv';
const dotenv = require('dotenv')
const mysql = require('mysql2');
dotenv.config();


const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

const db = {
  init: function () {
    return connectionPool;
  },
  connect: function () {
    connectionPool.getConnection(function (err, conn) {
      if (err) {
        console.error("mysql connection error : " + err);
        return;
      }
      console.log("mysql is connected successfully!");
      conn.release();
    });
  },
  excute: function (sql, params, res, callback) {
    executeQuery(sql, params, res, callback);
  }
};

function executeQuery(sql, params, res, callback) {
  conn.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error!!! \n', err);
      return res.status(500).json({error: 'Database connection error'});
    }

    connection.query(sql, params, (err, results) => {
      connection.release(); // 쿼리 완료 후 연결 해제

      if (err) {
        console.error('Query error !!! \n', err);
        return res.status(500).json({error: 'Database query error'});
      }

      callback(results);
    });
  });
}

module.exports = db; // Promise 기반으로 반환
