import Joi from 'joi';

// 게시글 관련 공통 규칙
const postImageRule = Joi.string()
    .messages({
        'string.base': '올바른 이미지 형식이 아닙니다'
    });

const postTitleRule = Joi.string()
    .max(20)
    .messages({
        'string.empty': '제목을 입력해주세요',
        'string.max': '제목은 최대 20자까지 입력 가능합니다'
    });

const postContentRule = Joi.string()
    .max(300)
    .messages({
        'string.empty': '내용을 입력해주세요',
        'string.max': '내용은 최대 300자까지 입력 가능합니다'
    });

const commentContentRule = Joi.string()
    .max(100)
    .messages({
        'string.empty': '댓글 내용을 입력해주세요',
        'string.max': '댓글은 최대 100자까지 입력 가능합니다'
    });

export const boardSchema = {
    // 게시글 생성 스키마
    createPost: Joi.object({
        image: postImageRule.optional(),
        title: postTitleRule.required(),
        content: postContentRule.required()
    }),

    // 게시글 수정 스키마
    updatePost: Joi.object({
        image: postImageRule.optional(),
        title: postTitleRule.optional().not(Joi.string().empty()),  // 빈 문자열 허용하지 않음
        content: postContentRule.optional().not(Joi.string().empty())  // 빈 문자열 허용하지 않음
    }).min(1).messages({  // 최소 하나의 필드는 있어야 함
        'object.min': '수정할 내용을 입력해주세요'
    }),

    // 댓글 생성/수정 스키마
    comment: Joi.object({
        content: commentContentRule.required()
    })
};