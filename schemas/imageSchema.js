// schemas/imageSchema.js
const Joi = require('joi');

exports.imageSchema = {
    getPreSignedUrl: Joi.object({
        fileType: Joi.string()
            .valid('image/jpeg', 'image/png', 'image/gif')
            .required()
            .messages({
                'string.empty': '파일 타입은 필수입니다.',
                'any.required': '파일 타입은 필수입니다.',
                'any.only': '지원하지 않는 파일 타입입니다.'
            }),
    })
};