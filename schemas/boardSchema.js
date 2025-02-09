const Joi = require('joi');

const postImageRule = Joi.string()
    .label('이미지')
    .messages({
        'string.base': '올바른 이미지 형식이 아닙니다'
    });

const postTitleRule = Joi.string()
    .label('제목')
    .max(20)
    .messages({
        'string.max': '제목은 최대 20자까지 입력 가능합니다'
    });

const postContentRule = Joi.string()
    .label('내용')
    .max(300)
    .messages({
        'string.max': '내용은 최대 300자까지 입력 가능합니다'
    });

const commentContentRule = Joi.string()
    .label('댓글')
    .max(100)
    .messages({
        'string.max': '댓글은 최대 100자까지 입력 가능합니다'
    });

// 모든 스키마에 공통으로 적용될 메시지
const commonMessages = {
    'any.required': '{{#label}}을(를) 입력해주세요',
    'string.empty': '{{#label}}을(를) 입력해주세요'
};

exports.boardSchema = {
    createPost: Joi.object({
        post: Joi.object({
            image: postImageRule.optional(),
            title: postTitleRule.required(),
            content: postContentRule.required()
        })
    }).messages(commonMessages),

    updatePost: Joi.object({
        post: Joi.object({
            image: postImageRule.optional(),
            title: postTitleRule.optional().not(Joi.string().empty()),
            content: postContentRule.optional().not(Joi.string().empty())
        }).required()
    }).min(1).messages({
        ...commonMessages,
        'object.min': '수정할 내용을 입력해주세요'
    }),

    comment: Joi.object({
        content: commentContentRule.required()
    }).messages(commonMessages)
};