const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const { ImageErrorCode } = require('../common/codes/imageErrorCode');
const { s3Client, s3BucketName, CDNDeployName } = require('../utils/awsClients');

// 상수 정의
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const URL_EXPIRATION = 3600; // 1시간

class ImageUploader {
    constructor() {
        this.s3BucketName = s3BucketName;
        this.cdnDomain = CDNDeployName;
    }

     // presigned URL 생성
    async generatePreSignedUrl(fileType, type) {
        try {
            this.validateImageMetadata(fileType);

            // 파일명 생성
            const fileExtension = fileType.split('/')[1];
            const fileName = `image/${type}/${uuidv4()}.${fileExtension}`;

            // presigned URL 생성을 위한 커맨드
            const command = new PutObjectCommand({
                Bucket: this.s3BucketName,
                Key: fileName,
                ContentType: fileType
            });

            // presigned URL 생성
            const preSignedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: URL_EXPIRATION
            });

            // CDN URL 생성
            const cdnUrl = `https://${this.cdnDomain}/${fileName}`;

            return {
                preSignedUrl: preSignedUrl,
                imageUrl: cdnUrl,
                key: fileName
            };
        } catch (error) {
            console.error('Presigned URL generation failed:', error);
            this.handleError(error);
        }
    }

    validateImageMetadata(fileType) {
        if (!fileType) {
            throw ImageErrorCode.createInvalidType();
        }

        if (!ALLOWED_MIME_TYPES.includes(fileType)) {
            throw ImageErrorCode.createInvalidFormat();
        }

    }

    /**
     * 에러 핸들링
     */
    handleError(error) {
        console.error('S3 operation failed:', error);

        const errorMap = {
            NetworkingError: ImageErrorCode.createStorageConnectionFailed,
            TimeoutError: ImageErrorCode.createStorageTimeout,
        };

        const errorHandler = errorMap[error.name];
        if (errorHandler) {
            throw errorHandler();
        }

        throw ImageErrorCode.createUploadFailed(error.message);
    }
}

module.exports = {
    ImageUploader
};