// [jeff] 폴더 중 errors와 responses 의 성격이 모호합니다.
// CustomError.js 는 response 를 담당하는 클래스이나 errors 폴더에 담겨 있습니다. (responses 에 있어야 할 것으로 예상했음)
// 차라리 code, response 폴더 두 개로 나눠서 따로 관리하는게 좋아보입니다.
// 관련해서 폴더링 다시해두었습니다.


class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
