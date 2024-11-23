const mariadb = require('mariadb');

console.log(process.env.NODE_ENV, process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME, typeof process.env.DB_PORT);
const pool = mariadb.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    connectionLimit: 50,
    acquireTimeout: 10000,   // 연결 획득 타임아웃
    connectTimeout: 5000,    // TCP 연결 타임아웃
    trace: true,            // 디버깅용 로그 활성화
    initializationTimeout: 10000,
    timezone: '+09:00',  // 또는 'Asia/Seoul'
    dateStrings: true
});

// 즉시 연결 테스트
async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT 1');
        console.log('Database connection test successful:', rows);
    } catch (err) {
        console.error('Database connection test failed:', err);
    } finally {
        if (conn) conn.release();
    }
}

testConnection();

module.exports = {
    pool: pool
};