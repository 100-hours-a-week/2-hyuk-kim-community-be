export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false, // 모든 에러를 한번에 반환
            stripUnknown: true // 정의되지 않은 속성 제거
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');

            return res.status(400).json({
                status: 'error',
                message: errorMessage
            });
        }

        next();
    };
};