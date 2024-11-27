
// [jeff] 모든 비동기 함수를 래핑해 에러를 자동으로 next로 전달합니다.
// 이 코드를 사용하면 어떤 트레이드 오프가 있을지 꼭 생각해봐야 합니다.
// 중요한게 생산성일지 코드가 이뻐야 하는건지 꼭 잘 생각해보고 써야합니다.
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler;