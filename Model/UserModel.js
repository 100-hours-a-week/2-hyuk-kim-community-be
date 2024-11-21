const CommonModel = require('./CommonModel');

class UserModel extends CommonModel {
    constructor() {
        super('users');
    }

    async validEmail(email) {
        console.log(`sigupModel validEmail start!! ${email}`);
        const rows = await this.executeQuery(
            `SELECT * FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        console.log(`sigupModel validEmail end!! ${rows[0] || null}`);
        return rows[0] || null;
    }

    logout(userId) {
        // 이후 토큰, 세션 인증인가시 구현!
    }

    async signup(email, password, nickname) {
        console.log(`sigupModel signup start!! ${email}, ${password}, ${nickname}`);
        await this.executeQuery(
            `INSERT INTO ${this.tableName} (email, password, nickname) VALUES (?, ?, ?)`,
            [email, password, nickname]
        );
        console.log(`sigupModel signup end!! ${email}`);
        return email;
    }

    async signout(email) {
        const result = await this.executeQuery(
            `DELETE FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        return result.affectedRows;
    }

    async getNicknameByEmail(email) {
        const rows = await this.executeQuery(
            `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        return rows[0]?.nickname;
    }

    async updateNicknameEmail(email, nickname) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET nickname = ? WHERE email = ?`,
            [nickname, email]
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

    async setUserInfoByEmail(board) {
        // 게시글 작성자의 닉네임 조회
        const authorRows = await this.executeQuery(
            `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
            [board.email]
        );
        board.nickname = authorRows[0]?.nickname || "(알 수 없음)";

        // 댓글 작성자들의 닉네임 조회
        for (const commentKey in board.comment) {
            const commentEmail = board.comment[commentKey].email;
            const commentRows = await this.executeQuery(
                `SELECT nickname FROM ${this.tableName} WHERE email = ?`,
                [commentEmail]
            );
            if (commentRows[0]?.nickname) {
                board.comment[commentKey].nickname = commentRows[0].nickname;
            }
        }
        return board;
    }
}

module.exports = UserModel;