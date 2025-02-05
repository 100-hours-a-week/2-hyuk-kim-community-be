const Joi = require('joi');

// 공통으로 사용될 기본 규칙들
const emailRule = Joi.string()
    .label('이메일')
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
        'string.pattern.base': '올바른 이메일 주소 형식을 입력해주세요 (예: example@example.com)'
    });

const passwordRule = Joi.string()
    .label('비밀번호')
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/)
    .messages({
        'string.pattern.base': '비밀번호는 대소문자, 숫자, 특수문자를 포함한 8~20자여야 합니다'
    });

const passwordConfirmRule = Joi.string()
    .label('비밀번호 확인')
    .valid(Joi.ref('password'))
    .messages({
        'any.only': '비밀번호가 일치하지 않습니다'
    });

const nicknameRule = Joi.string()
    .label('닉네임')
    .pattern(/^[^\s]{1,10}$/)
    .max(10)
    .messages({
        'string.max': '닉네임은 최대 10자까지 작성 가능합니다',
        'string.pattern.base': '띄어쓰기를 없애주세요'
    });

const imageRule = Joi.any()
    .label('프로필 이미지');

// 모든 스키마에 공통으로 적용될 메시지
const commonMessages = {
    'any.required': '{{#label}}을(를) 입력해주세요',
    'string.empty': '{{#label}}을(를) 입력해주세요'
};

exports.userSchema = {
    register: Joi.object({
        email: emailRule.required(),
        password: passwordRule.required(),
        nickname: nicknameRule.required(),
        image: imageRule.required()
    }).messages(commonMessages),

    login: Joi.object({
        email: emailRule.required(),
        password: passwordRule.required()
    }).messages(commonMessages),

    updateProfile: Joi.object({
        nickname: nicknameRule.optional(),
        image: imageRule.optional()
    }).min(1).messages({
        ...commonMessages,
        'object.min': '수정할 내용을 입력해주세요'
    }),

    updatePassword: Joi.object({
        password: passwordRule.required(),
    }).messages(commonMessages)
};