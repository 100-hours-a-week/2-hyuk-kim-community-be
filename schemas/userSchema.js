import Joi from 'joi';

// 공통으로 사용될 기본 규칙들
const emailRule = Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
        'string.pattern.base': '올바른 이메일 주소 형식을 입력해주세요 (예: example@example.com)'
    });

const passwordRule = Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/)
    .messages({
        'string.empty': '비밀번호를 입력해주세요',
        'string.pattern.base': '비밀번호는 대소문자, 숫자, 특수문자를 포함한 8~20자여야 합니다'
    });

const passwordConfirmRule = Joi.string()
    .valid(Joi.ref('password'))
    .messages({
        'any.only': '비밀번호가 일치하지 않습니다',
        'string.empty': '비밀번호를 한번 더 입력해주세요'
    });

const nicknameRule = Joi.string()
    .pattern(/^[^\s]{1,10}$/)
    .max(10)
    .messages({
        'string.empty': '닉네임을 입력해주세요',
        'string.max': '닉네임은 최대 10자까지 작성 가능합니다',
        'string.pattern.base': '띄어쓰기를 없애주세요'
    });

const imageRule = Joi.string()
    .messages({
        'string.empty': '프로필 이미지를 선택해주세요'
    });

export const userSchema = {
    // 회원가입 스키마
    register: Joi.object({
        profileImage: imageRule.required(),
        email: emailRule.required(),
        password: passwordRule.required(),
        passwordConfirm: passwordConfirmRule.required(),
        nickname: nicknameRule.required()
    }),

    // 로그인 스키마
    login: Joi.object({
        email: emailRule.required(),
        password: passwordRule.required()
    }),

    // 회원정보 수정 스키마
    updateProfile: Joi.object({
        profileImage: imageRule.optional(),
        nickname: nicknameRule.optional()
    }),

    // 비밀번호 수정 스키마
    updatePassword: Joi.object({
        password: passwordRule.required(),
        passwordConfirm: passwordConfirmRule.required()
    })
};