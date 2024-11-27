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

    // async signout(userId) {
    //     const result = await this.executeQuery(
    //         `UPDATE ${this.tableName} SET deleted_at = NOW() WHERE id = ?`,
    //         [userId]
    //     );
    //     return result.affectedRows;
    // }

    async getNicknameByEmail(email) {
        const rows = await this.executeQuery(
            `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        return rows[0]?.nickname;
    }

    async getNicknameById(userId) {
        const rows = await this.executeQuery(
            `SELECT email, nickname FROM ${this.tableName} WHERE id = ?`,
            [userId]
        );
        return rows[0];
    }

    async updateNicknameEmail(email, nickname) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET nickname = ? WHERE email = ?`,
            [nickname, email]
        );
        return result.affectedRows;
    }

    async updateNicknameById(userId, nickname) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET nickname = ? WHERE id = ?`,
            [nickname, userId]
        );
        return result.affectedRows;
    }

    async updatePasswordEmail(email, password) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET password = ? WHERE email = ?`,
            [password, email]
        );
        return result.affectedRows;
    }

    async updatePasswordById(userId, password) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET password = ? WHERE id = ?`,
            [password, userId]
        );
        return result.affectedRows;
    }

    // async setUserInfoByEmail(board) {
    //     // 게시글 작성자의 닉네임 조회
    //     const authorRows = await this.executeQuery(
    //         `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
    //         [board.email]
    //     );
    //     board.nickname = authorRows[0]?.nickname || "(알 수 없음)";
    //
    //     // 댓글 작성자들의 닉네임 조회
    //     for (const commentKey in board.comment) {
    //         const commentEmail = board.comment[commentKey].email;
    //         const commentRows = await this.executeQuery(
    //             `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
    //             [commentEmail]
    //         );
    //         if (commentRows[0]?.nickname) {
    //             board.comment[commentKey].nickname = commentRows[0].nickname;
    //         }
    //     }
    //     return board;
    // }
}

module.exports = UserModel;