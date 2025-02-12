const mariadb = require('mariadb');

// 환경변수 정규화 및 유효성 검사
const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
    acquireTimeout: 10000,
    connectTimeout: 5000,
    trace: process.env.NODE_ENV !== 'production',
    initializationTimeout: 10000,
    timezone: process.env.DB_TIMEZONE || '+09:00',
    dateStrings: true,
};

// 환경변수 유효성 검사
function validateDBConfig() {
    const requiredFields = ['host', 'user', 'password', 'database', 'port'];
    const missingFields = requiredFields.filter(field => !DB_CONFIG[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required database configuration: ${missingFields.join(', ')}`);
    }

    if (isNaN(DB_CONFIG.port)) {
        throw new Error(`Invalid DB_PORT: ${process.env.DB_PORT}`);
    }
}

// 개발 환경에서만 설정 출력
if (process.env.NODE_ENV !== 'production') {
    console.log('Database Configurations:', {
        NODE_ENV: process.env.NODE_ENV,
        DB_HOST: DB_CONFIG.host,
        DB_USER: DB_CONFIG.user,
        DB_NAME: DB_CONFIG.database,
        DB_PORT: DB_CONFIG.port,
        DB_PORT_TYPE: typeof DB_CONFIG.port,
    });
}

validateDBConfig();

const pool = mariadb.createPool(DB_CONFIG);

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT 1');
        console.log('Database connection test successful:', rows);
        return true;
    } catch (err) {
        console.error('Database connection test failed:', err);
        throw err; // 연결 실패 시 에러를 상위로 전파
    } finally {
        if (conn) conn.release();
    }
}

// 초기 연결 테스트 실행
testConnection().catch(err => {
    console.error('Initial database connection failed:', err);
    process.exit(1); // 연결 실패 시 프로세스 종료
});

module.exports = {
    pool
};