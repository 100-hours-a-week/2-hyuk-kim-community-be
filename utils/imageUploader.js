const axios = require('axios');
const url = require('../config/constants');
const { ImageErrorCode } = require('../common/errors/imageErrorCode');

module.exports.uploadImage = async (file, type) => {
    try {
        if (!file) {
            return null;
        }

        const formData = new FormData();
        formData.append('image', new File([file.buffer], file.originalname, { type: file.mimetype }));

        const response = await fetch(`${url.IMAGE_UPLOAD}/${type}`, {
            method: 'POST',
            body: formData,
            timeout: 5000,
        });

        const result = await response.json();
        return result.imageId;

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw ImageErrorCode.createStorageTimeout();
        }
        if (error.code === 'ECONNREFUSED') {
            throw ImageErrorCode.createStorageConnectionFailed();
        }
        if (error.response) {
            throw ImageErrorCode.createStorageError(error.response.data.message);
        }
        throw ImageErrorCode.createUploadFailed(error.message);
    }
};

module.exports.getImageUrl = async (imageId) => {
    try {
        const response = await fetch(`${url.IMAGE_UPLOAD}/${imageId}`);
        // const buffer = await response.arrayBuffer();
        // 이미지 데이터를 arrayBuffer로 받기
        const imageBuffer = await response.arrayBuffer();

        // 이미지 데이터를 base64로 변환
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        const imageUrl = `data:${response.headers.get('content-type')};base64,${base64Image}`;

        return imageUrl;
    } catch (error) {
        console.error(error.stack);
        throw ImageErrorCode.createStorageError();
    }
};