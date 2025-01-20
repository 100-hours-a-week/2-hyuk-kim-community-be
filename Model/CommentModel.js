const CommonModel = require('./CommonModel');
const {formatDate} = require("../utils/dateManager");

class CommentModel extends CommonModel {
    constructor() {
        super('comment');
    }

    // 댓글 페이지네이션을 위한 구현 => 다음 업데이트 적용 예정
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
        // 댓글 생성
        const result = await this.executeQuery(
            `INSERT INTO ${this.tableName} (post_id, content, user_id, createat)
             VALUES (?, ?, ?, NOW())`,
            [postId, content, userId]
        );

        // 생성된 댓글의 전체 정보를 조회
        const [newComment] = await this.executeQuery(
            `SELECT
                 c.id,
                 c.content,
                 DATE_FORMAT(c.createat, '%Y.%m.%d %H:%i') as date,
            JSON_OBJECT(
                'nickname', u.nickname,
                'profile', u.profile
            ) as user,
            CASE WHEN c.user_id = p.user_id THEN TRUE ELSE FALSE END as isAuthorComments,
            CASE WHEN c.user_id = ? THEN TRUE ELSE FALSE END as isMyComment
        FROM ${this.tableName} c
            LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN post p ON c.post_id = p.id
            WHERE c.id = ?`,
            [userId, result.insertId]
        );

        return newComment;  // JSON.parse 제거
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