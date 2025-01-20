const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const {ImageErrorCode} = require("../common/codes/imageErrorCode");

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// 허용된 이미지 타입 정의
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// 이미지 업로드 함수
module.exports.uploadImage = async (file, type) => {
    try {
        // 파일이 없는 경우 null 반환
        console.log(`image uploader on!!`);
        if (!file) {
            console.error(`notfound image`);
            return null;
        }

        // 파일 타입 검증
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            console.error(`image type error!`);
            throw ImageErrorCode.createInvalidFileType();
        }
        console.log(`image type good!!`);
        // 파일 이름 생성 (충돌 방지를 위해 UUID 사용)
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `image/${type}/${uuidv4()}.${fileExtension}`;

        // S3 업로드 커맨드 생성
        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        console.log(`image upload start!!`);
        // S3에 파일 업로드
        await s3Client.send(uploadCommand);

        // 업로드된 파일의 URL 생성
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log(`fileUrl ${fileUrl}`);
        return fileUrl;

    } catch (error) {
        // AWS S3 관련 에러 처리
        console.error(error);
        if (error.name === 'NetworkingError') {
            throw ImageErrorCode.createStorageConnectionFailed();
        }
        if (error.name === 'TimeoutError') {
            throw ImageErrorCode.createStorageTimeout();
        }
        if (error.name === 'NoSuchBucket') {
            throw ImageErrorCode.createStorageError('Bucket not found');
        }
        if (error.name === 'AccessDenied') {
            throw ImageErrorCode.createStorageError('Access denied to S3 bucket');
        }

        // 기타 에러 처리
        throw ImageErrorCode.createUploadFailed(error.message);
    }
};

// 이미지 삭제 함수
module.exports.deleteImage = async (imageUrl) => {
    try {
        // URL에서 키 추출
        const key = new URL(imageUrl).pathname.slice(1);

        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key
        });

        await s3Client.send(deleteCommand);
        return true;
    } catch (error) {
        throw ImageErrorCode.createDeleteFailed(error.message);
    }
};

// 환경 변수 검증 함수
const validateEnvironmentVariables = () => {
    const requiredEnvVars = [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'AWS_S3_BUCKET_NAME'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
};

// 초기화 시 환경 변수 검증
validateEnvironmentVariables();