const mariadb = require('mariadb');


// [jeff] 환경 변수의 상태를 콘솔에 직접 출력하는 것은 보안상 문제가 될 수 있습니다.
// 특히 민감한 정보(DB_HOST, DB_USER 등)가 노출될 수 있으므로 디버깅 모드에서만 활성화하도록 수정하는게 좋습니닫.
// "엥? 이게 민감하다고?" 할 수도 있겠지만 데이터베이스 관련해서는 조심 또 조심하는게 무조건 좋습니다.
// 데이터베이스 작살나면 회사가 한방에 두동강 날 수도 있습니다.
// console.log(process.env.NODE_ENV, process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME, typeof process.env.DB_PORT);
if (process.env.NODE_ENV !== 'production') {
  console.log('Database Configurations:', {
    NODE_ENV: process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: typeof process.env.DB_PORT,
  });
}

// [jeff] Pool 생성
// [기존 코드]
// const pool = mariadb.createPool({ ... });
// [변경 코드]
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
    // [jeff] 객체 단축 문법으로 짧게도 가능합니다잉
    pool
    // pool: pool
};