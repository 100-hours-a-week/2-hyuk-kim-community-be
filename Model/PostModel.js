const CommonModel = require('./CommonModel');

class PostModel extends CommonModel {
    constructor() {
        super('post');
    }

    async getPostList(offset, limit, userId) {
        const [posts, countResult] = await Promise.all([
            this.executeQuery(
                `
                    SELECT
                        p.*,
                        u.nickname,
                        u.profile,
                        u.deleteat as deletedUser,
                        CAST(COUNT(DISTINCT c.id) AS UNSIGNED) as countComments,
                        CAST(COUNT(DISTINCT l2.id) AS UNSIGNED) as countLike,
                        l1.user_id IS NOT NULL as isLiked
                    FROM ${this.tableName} p
                             LEFT JOIN users u ON p.user_id = u.id
                             LEFT JOIN comment c ON p.id = c.post_id AND c.deleteat IS NULL
                             LEFT JOIN likes l1 ON p.id = l1.post_id AND l1.user_id = ?
                             LEFT JOIN likes l2 ON p.id = l2.post_id
                    WHERE p.deleteat IS NULL
                    GROUP BY p.id, u.nickname, u.profile, l1.user_id, p.createat
                    ORDER BY p.createat DESC
                    LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
                `,
                [userId]
            ),
            this.executeQuery(
                `SELECT COUNT(*) as total
                 FROM ${this.tableName}
                 WHERE deleteat IS NULL`
            )
        ]);

        return {
            posts: posts.map(post => {
                const { countComments, ...postData } = post;
                return {
                    post: {
                        ...postData,
                        id: Number(post.id),
                        user_id: Number(post.user_id),
                        count_view: Number(post.count_view),
                        user: {
                            nickname: post.nickname,
                            profile: post.profile,
                            deleteat: post.deletedUser,
                        },
                        countLike: Number(post.countLike),
                        isLiked: Boolean(post.isLiked),
                        nickname: undefined,
                        profile: undefined,
                    },
                    countComments: Number(countComments)
                };
            }),
            totalCount: Number(countResult[0].total)
        };
    }

    async getCommentListByPostId(postId, userId, page, limit) {
        const offset = (page - 1) * limit;

        // 전체 댓글 수 조회
        const [totalCountRow] = await this.executeQuery(
            `SELECT COUNT(*) as total
         FROM comment
         WHERE post_id = ? AND deleteat IS NULL`,
            [postId]
        );

        // 페이지네이션된 댓글 목록 조회
        const comments = await this.executeQuery(
            `SELECT 
            c.id,
            c.content,
            DATE_FORMAT(c.createat, '%Y.%m.%d %H:%i') as date,
            JSON_OBJECT(
                'nickname', u.nickname,
                'profile', u.profile
            ) as user,
            CASE WHEN c.user_id = 
                (SELECT user_id FROM post WHERE id = ?) 
                THEN TRUE ELSE FALSE END as isAuthorComments,
            CASE WHEN c.user_id = ? THEN TRUE ELSE FALSE END as isMyComment
        FROM comment c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.post_id = ? AND c.deleteat IS NULL
        ORDER BY c.createat DESC
        LIMIT ? OFFSET ?`,
            [postId, userId, postId, parseInt(limit), offset]
        );

        const totalCount = totalCountRow.total;
        const hasMore = totalCount > offset + comments.length;

        return {
            comments: comments.map(comment => ({
                ...comment,
                user: JSON.parse(comment.user)
            })),
            hasMore,
            totalCount
        };
    }

    async createPost(title, content, userId, imageUrl) {
        const result = await this.executeQuery(
            `INSERT INTO ${this.tableName} (title, content, user_id, createat, image)
             VALUES (?, ?, ?, Now(), ?)`,
            [title, content, userId, imageUrl]
        );

        return Number(result.insertId);
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
            u.deleteat as deletedUser,
            CASE WHEN p.user_id = ? THEN TRUE ELSE FALSE END as isMyPost,
            CAST((SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS UNSIGNED) as countLike, 
            ${userId ?
                `CASE WHEN EXISTS (
                    SELECT 1 FROM likes 
                    WHERE post_id = p.id AND user_id = ?
                ) THEN TRUE ELSE FALSE END`
                : 'FALSE'
            } as isLiked,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', c.id,
                        'content', c.content,
                        'date', DATE_FORMAT(c.createat, '%Y.%m.%d %H:%i'),
                        'user', JSON_OBJECT(
                            'nickname', cu.nickname,
                            'profile', cu.profile,
                            'deleteat', cu.deleteat
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
            profile: post.profile,
            deleteat: post.deletedUser
        };

        delete post.nickname;
        delete post.profile;
        delete post.deletedUser;

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

    async likePost(postId, userId) {
        const result = await this.executeQuery(
            `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`,
            [postId, userId]
        );
        return result.affectedRows;
    }

    async unLikePost(postId, userId) {
        const result = await this.executeQuery(
            `DELETE FROM likes WHERE post_id = ? AND user_id = ?`,
            [postId, userId]
        );
        return result.affectedRows;
    }
}

module.exports = new PostModel();