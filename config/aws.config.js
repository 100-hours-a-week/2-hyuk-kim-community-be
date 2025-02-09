require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

module.exports = {
    // S3 이미지 업로드용 IAM
    imageUpload: {
        accessKeyId: process.env.AWS_IMAGE_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_IMAGE_SECRET_ACCESS_KEY,
        bucketName: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_REGION,

        cdnDeployName: process.env.AWS_CDN_DEPLOY_NAME,
    },

    // Github Action용 IAM
    githubActions: {
        accessKeyId: process.env.AWS_GITHUB_ACTIONS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_GITHUB_ACTIONS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    },

    // 배포용 IAM
    deployService: {
        accessKeyId: process.env.AWS_DEPLOY_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_DEPLOY_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    },
}