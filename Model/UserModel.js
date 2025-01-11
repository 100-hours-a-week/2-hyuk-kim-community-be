const CommonModel = require('./CommonModel');

class UserModel extends CommonModel {
    constructor() {
        super('users');
    }

    async validEmail(email) {
        const rows = await this.executeQuery(
            `SELECT * FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        return rows[0] || null;
    }

    async validId(userId) {
        const rows = await this.executeQuery(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [userId]
        );
        return rows[0] || null;
    }

    logout(userId) {
        // 이후 토큰, 세션 인증인가시 구현!
    }

    async signup(email, password, nickname, imageUrl) {
        const result = await this.executeQuery(
            `INSERT INTO ${this.tableName} (email, password, nickname, profile) VALUES (?, ?, ?, ?)`,
            [email, password, nickname, imageUrl]
        );
        return result.affectedRows > 0;
    }

    async signout(userId) {
        const result = await this.executeQuery(
            // `DELETE FROM ${this.tableName} WHERE id = ?`,
            `UPDATE ${this.tableName} SET deleteat = NOW() WHERE id = ?`,
            [userId]
        );
        return result.affectedRows;
    }

    async getProfile(userId) {
        const rows = await this.executeQuery(
            `SELECT email, nickname FROM ${this.tableName} WHERE id = ?`,
            [userId]
        );
        return rows[0];
    }

    async updateProfile(userId, updates) {
        // 빈 문자열이나 undefined 체크
        let updateFields = [];
        let values = [];

        const { nickname, profile } = updates;

        if (nickname && typeof nickname === 'string') {
            // nickname이 객체가 아닌 문자열인지 확인
            console.log(`nickname good!`);
            updateFields.push("nickname = ?");
            values.push(nickname);
        }

        console.log(`profile: ${profile}`);
        if (profile && typeof profile === 'string') {
            console.log(`profile good!`);
            updateFields.push("profile = ?");
            values.push(profile);
        }

        // 업데이트할 필드가 없으면 early return
        if (updateFields.length === 0) {
            return { message: "No fields to update" };
        }

        const updateQuery = `
            UPDATE ${this.tableName}
            SET ${updateFields.join(", ")}
            WHERE id = ?
        `;

        values.push(userId);

        await this.executeQuery(updateQuery, values);
        return { nickname, profile };
    }

    async updatePasswordById(userId, password) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET password = ? WHERE id = ?`,
            [password, userId]
        );
        console.log(result.affectedRows);
        return result.affectedRows;
    }
}

module.exports = UserModel;