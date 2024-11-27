// [jeff] 상위 클래스는 직접 인스턴스화하지 않고, 공통 로직을 재사용하기 위한 베이스 클래스 역할을 해야 합니다.
// 이를 위해 클래스 인스턴스화를 제한하고 이름을 명확히 변경합니다.
// class CustomSuccess {
//   constructor(message, statusCode, data = {}) {
//     this.message = message;
//     this.statusCode = statusCode || 200;
//     this.data = data;
//   }
// }

// [jeff] 사실 export 안시키면 그만이라고 생각 할 수도 있겠지만 코드 스타일을 미리 잡아둬야합니다.
// 시간 지나서 리뷰하는 사람도 놓칠 수 있기 때문에 사람을 믿지 말고 기계를 믿어야 하는 것이지요.
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

// [jeff] 클래스 이름을 변경해 의미를 더 명확히 표현해주세요!
// OK 라는건 너무 포괄적이라 중복 객체 리터럴이 나올 수도 있고 그로 인해 intellisense 로 실수 할 수도 있습니다.
// class OK extends CustomSuccess {
class OkResponse extends BaseResponse {
  constructor(message = "Success", data = {}) {
    // [jeff] data 에 기본 객체를 명시적으로 지정해 의도를 더 명확히 합니다.
    // 이렇게 data가 항상 response 되는 일관성이 유지 되면 front 에서 예외처리하기 편합니다.
    super(message, 200, data);
  }
}

// [jeff] 클래스 이름을 CreatedResponse로 변경해 응답의 의도를 명확히 표현합니다.
// [변경 코드]
class CreatedResponse extends BaseResponse {
  constructor(message = "Created", data = {}) {
    // [jeff] 마찬가지로 data 변수 지정
    super(message, 201, data);
  }
}

module.exports = {
  OkResponse,
  CreatedResponse,
};