const CommonModel = require('./CommonModel');
const { formatDate } = require("../utils/dateManager");

class PostModel extends CommonModel {
    constructor() {
        super('post');
    }

    async getPostList(offset, limit) {
        const [posts, countResult] = await Promise.all([
            this.executeQuery(
                `SELECT
                     p.*,
                     u.nickname,
                     u.profile,
                     COUNT(DISTINCT c.id) as countComments
                 FROM ${this.tableName} p
                          LEFT JOIN users u ON p.user_id = u.id
                          LEFT JOIN comment c ON p.id = c.post_id AND c.deleteat IS NULL
                 WHERE p.deleteat IS NULL
                 GROUP BY p.id, u.nickname, u.profile
                 ORDER BY p.createat DESC
                     LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`
            ),
            this.executeQuery(
                `SELECT COUNT(*) as total
                 FROM ${this.tableName}
                 WHERE deleteat IS NULL`
            )
        ]);

        return {
            posts: posts.map(post => ({
                ...post,
                user: {
                    nickname: post.nickname,
                    profile: post.profile
                },
                countComments: Number(post.countComments),
                nickname: undefined,  // 원래 위치의 nickname 제거
                profile: undefined   // 원래 위치의 profile 제거
            })),
            totalCount: Number(countResult[0].total)
        }
    }

    async getPostListBefore() {
        const result =  await this.executeQuery(
            `SELECT
                 p.*,
                 u.nickname,
                 COUNT(DISTINCT c.id) as comment_count
             FROM ${this.tableName} p
                      LEFT JOIN users u ON p.user_id = u.id
                      LEFT JOIN comment c ON p.id = c.post_id AND c.deleteat IS NULL
             WHERE p.deleteat IS NULL
             GROUP BY p.id, u.nickname
             ORDER BY p.createat DESC`
        );
        // console.log(result);
        return Object.values(result).map(post => ({
            ...post,
        // date: post.createat = formatDate(post.createat),
        comment_count: post.comment_count ? Number(post.comment_count) : 0
        }));
    }

    async createPost(title, content, userId, imageUrl) {
        const result = await this.executeQuery(
            `INSERT INTO ${this.tableName} (title, content, user_id, createat, image)
             VALUES (?, ?, ?, Now(), ?)`,
            [title, content, userId, imageUrl]
        );

        return Number(result.insertId);;
    }

    async getPostByPostId(postId, userId) {
        await this.executeQuery(
            `UPDATE post
         SET count_view = count_view + 1
         WHERE id = ? AND deleteat IS NULL`,
            [postId]
        );

        const rows = await this.executeQuery(
            `SELECT 
            p.id,
            p.title,
            p.content,
            p.image,
            p.createat,
            p.count_view as countView,
            u.nickname,
            u.profile,
            CASE WHEN p.user_id = ? THEN TRUE ELSE FALSE END as isMyPost,
            CAST((SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS UNSIGNED) as countLike,  -- 여기를 수정
            ${userId ?
                `CASE WHEN EXISTS (
                    SELECT 1 FROM likes 
                    WHERE post_id = p.id AND user_id = ?
                ) THEN TRUE ELSE FALSE END`
                : 'FALSE'
            } as isLike,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', c.id,
                        'content', c.content,
                        'date', DATE_FORMAT(c.createat, '%Y.%m.%d %H:%i'),
                        'user', JSON_OBJECT(
                            'nickname', cu.nickname,
                            'profile', cu.profile
                        ),
                        'isAuthorComments', CASE WHEN c.user_id = p.user_id THEN TRUE ELSE FALSE END,
                        'isMyComment', CASE WHEN c.user_id = ? THEN TRUE ELSE FALSE END
                    )
                )
                FROM comment c
                LEFT JOIN users cu ON c.user_id = cu.id
                WHERE c.post_id = p.id AND c.deleteat IS NULL
            ) as commentList
        FROM post p
        LEFT JOIN users u ON p.user_id = u.id
        WHERE p.id = ? AND p.deleteat IS NULL`,
            userId ? [userId, userId, userId, postId] : [null, null, postId]
        );

        if (!rows[0]) return null;

        const post = rows[0];
        post.commentList = post.commentList || [];
        post.user = {
            nickname: post.nickname,
            profile: post.profile
        };

        delete post.nickname;
        delete post.profile;

        // BigInt를 Number로 변환 (필요한 경우를 위한 안전장치)
        if (typeof post.countLike === 'bigint') {
            post.countLike = Number(post.countLike);
        }

        return post;
    }

    async getPostEditByPostId(postId) {
        const rows = await this.executeQuery(
            `SELECT title, content 
            FROM ${this.tableName} 
            WHERE id = ?`,
            [postId]
        );
        return rows[0];
    }

    async updatePostByPostId(postId, title, content) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} 
            SET title = ?, content = ?, updateat = NOW() 
            WHERE id = ?`,
            [title, content, postId]
        );
        return result.affectedRows;
    }

    async deleteById(postId) {
        const result = await this.executeQuery(
            `UPDATE ${this.tableName} SET deleteat = Now()
                 WHERE id = ? AND deleteat IS NULL`,
            [postId]
        );
        return result.affectedRows;
    }
}

module.exports = new PostModel();