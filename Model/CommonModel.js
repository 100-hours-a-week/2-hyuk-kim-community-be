const { pool } = require('../config/database');

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async executeQuery(query, params = []) {
        let conn;
        try {
            conn = await pool.getConnection();
            return await conn.query(query, params);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }
}