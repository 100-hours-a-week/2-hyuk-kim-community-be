const { BadRequestError } = require("../common/responses/CustomError");

exports.validateMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            // multer로 처리된 파일을 body에 포함
            const dataToValidate = {
                ...req.body,
                ...(req.file && { image: req.file })
            };

            const { error } = schema.validate(dataToValidate, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                const errorMessage = error.details
                    .map((detail) => detail.message)
                    .join(', ');

                throw new BadRequestError(errorMessage);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};