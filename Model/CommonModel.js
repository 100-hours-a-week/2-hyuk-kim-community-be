const { pool } = require('../config/mariadb');

class CommonModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async executeQuery(query, params = []) {
        console.log(`query : ${query}`);
        let conn;
        try {
            conn = await pool.getConnection();
            const result =  await conn.query(query, params);
            console.log(`result : ${result}`);
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.release();
        }
    }
}

module.exports = CommonModel;