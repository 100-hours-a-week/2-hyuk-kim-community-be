const express = require("express");
const imageRoute = express.Router();
const authMiddleware = require("./../middlewares/authMiddleware.js");
const { imageSchema } = require('../schemas/imageSchema');
const { validateMiddleware } = require('../middlewares/validateMiddleware');
const { ImageUploader } = require('../utils/imageUploader');
const apiResponse = require('../common/responses/apiResponse');
const ImageSuccessCode = require("../common/codes/imageSuccessCode");

const imageUploader = new ImageUploader();

// presignedURL 발급 라우트
imageRoute.post(
    "/images/presigned-url",
    validateMiddleware(imageSchema.getPreSignedUrl),
    authMiddleware,
    async (req, res, next) => {
        try {
            const { fileType, type } = req.body;
            const urlData = await imageUploader.generatePreSignedUrl(fileType, type);

            const successResponse = ImageSuccessCode.createPreSignedURL(urlData);
            apiResponse.success(req, res, successResponse);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = imageRoute;