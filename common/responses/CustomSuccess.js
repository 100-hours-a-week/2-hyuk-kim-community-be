class BaseResponse {
  constructor(message, statusCode, data = {}) {
    if (new.target === BaseResponse) {
      // [jeff] new.target은 상위 클래스에서 직접 인스턴스화하려는 시도를 방지합니다.
      throw new Error("BaseResponse는 추상 클래스이므로 직접 인스턴스화되면 안됩니다!");
    }
    this.message = message;
    this.statusCode = statusCode || 200;
    this.data = data;
  }
}


class OKResponse extends BaseResponse {
  constructor(message = "Success", data) {
    super(message, 200, data);
  }
}

class CreatedResponse extends BaseResponse {
  constructor(message = "Created", data) {
    super(message, 201, data);
  }
}

module.exports = {
  OK: OKResponse,
  Created: CreatedResponse,
};
