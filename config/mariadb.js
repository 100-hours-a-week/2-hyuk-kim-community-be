const mariadb = require('mariadb');

if (process.env.NODE_ENV !== 'production') {
    console.log('Database Configurations:', {
        NODE_ENV: process.env.NODE_ENV,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: typeof process.env.DB_PORT,
    });
}

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
    acquireTimeout: 10000,
    connectTimeout: 5000,
    trace: process.env.NODE_ENV !== 'production', // [jeff] 디버깅 모드는 프로덕션에서 비활성화해야합니닫.
    initializationTimeout: 10000,
    timezone: process.env.DB_TIMEZONE || '+09:00',
    dateStrings: true,
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
    pool
};