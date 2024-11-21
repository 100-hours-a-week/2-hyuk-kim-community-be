const CommonModel = require('./CommonModel');
const {formatDate} = require("../utils/dateManager");

class CommentModel extends CommonModel {
    constructor() {
        super('comment');
    }

    async getCommentListByPostId(postId) {
        const result = this.executeQuery(
            `SELECT c.*, u.nickname 
            FROM ${this.tableName} c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ? AND c.deleteat IS NULL
            ORDER BY c.createat ASC`,
            [postId]
        );

        return result;
        // return Object.values(result).map(comment => ({
        //     ...comment,
        //     // date: comment.createat = formatDate(comment.createat)
        // }));
    }

    async getCommentById(commentId) {
        const rows = await this.executeQuery(
            `SELECT c.*, u.email, u.nickname 
            FROM ${this.tableName} c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.id = ?`,
            [commentId]
        );
        return rows[0];
    }

    async createComment(postId, content, userId) {
        const result = await this.executeQuery(
            `INSERT INTO ${this.tableName} (post_id, content, user_id, createat)
             VALUES (?, ?, ?, NOW())`,
            [postId, content, userId]
        );
        return Number(result.insertId);
    }

    async updateComment(commentId, content) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} 
            SET content = ?, updateat = NOW() 
            WHERE id = ?`,
            [content, commentId]
        );
        return result.affectedRows;
    }

    async deleteComment(commentId) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName}  SET deleteat = Now()
            WHERE id = ?`,
            [commentId]
        );
        return result.affectedRows;
    }

    async deleteCommentListByPostId(postId) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName}  SET deleteat = Now()
             WHERE post_id = ? AND deleteat IS NULL`,
            [postId]
        );
        return result.affectedRows;
    }
}

module.exports = new CommentModel();