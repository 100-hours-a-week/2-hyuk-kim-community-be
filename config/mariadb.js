const mariadb = require('mariadb');

console.log(process.env.NODE_ENV, process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);
const pool = mariadb.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 50,
    acquireTimeout: 10000,   // 연결 획득 타임아웃
    connectTimeout: 5000,    // TCP 연결 타임아웃
    trace: true,            // 디버깅용 로그 활성화
    initializationTimeout: 10000
});

module.exports = {
    pool: pool
};