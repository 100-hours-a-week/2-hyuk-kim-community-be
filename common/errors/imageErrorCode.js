const { BadRequestError, ServiceError } = require("./CustomError");

const ErrorMessages = {
  STORAGE_TIMEOUT: "이미지 서버 타임아웃",
  STORAGE_CONNECTION_FAILED: "이미지 서버에 연결할 수 없습니다",
  STORAGE_ERROR: "이미지 서버 오류",
  IMAGE_UPLOAD_FAILED: "이미지 업로드에 실패했습니다",
  INVALID_IMAGE_FORMAT: "지원하지 않는 이미지 형식입니다 (jpeg, png, gif만 가능)",
};

const ImageErrorCode = {
  createStorageTimeout: () => new ServiceError(ErrorMessages.STORAGE_TIMEOUT),
  createStorageConnectionFailed: () => new ServiceError(ErrorMessages.STORAGE_CONNECTION_FAILED),
  createStorageError: (message) => new ServiceError(`${ErrorMessages.STORAGE_ERROR}: ${message}`),
  createUploadFailed: (message) => new ServiceError(`${ErrorMessages.IMAGE_UPLOAD_FAILED}: ${message}`),
  createInvalidFormat: () => new BadRequestError(ErrorMessages.INVALID_IMAGE_FORMAT),
};

module.exports = {
  ImageErrorCode
};