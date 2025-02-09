const {S3Client} = require("@aws-sdk/client-s3");
const awsConfig = require('../config/aws.config');

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
    region: awsConfig.imageUpload.region,
    credentials: {
        accessKeyId: awsConfig.imageUpload.accessKeyId,
        secretAccessKey: awsConfig.imageUpload.secretAccessKey,
    }
});

const s3BucketName = awsConfig.imageUpload.bucketName;
const cdnDeployName = awsConfig.imageUpload.cdnDeployName;

// Github Actions 클라이언트 설정
const githubActionsClient = new S3Client({
    region: awsConfig.githubActions.region,
    credentials: {
        accessKeyId: awsConfig.githubActions.accessKeyId,
        secretAccessKey: awsConfig.githubActions.secretAccessKey,
    }
});


// Deploy Manager 클라이언트 설정
const deployManagerClient = new S3Client({
    region: awsConfig.deployService.region,
    credentials: {
        accessKeyId: awsConfig.deployService.accessKeyId,
        secretAccessKey: awsConfig.deployService.secretAccessKey,
    }
});

module.exports = {
    s3Client,
    s3BucketName,
    CDNDeployName: cdnDeployName,
    githubActionsClient,
    deployManagerClient,
}