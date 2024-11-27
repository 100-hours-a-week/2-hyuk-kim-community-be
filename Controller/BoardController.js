const apiResponse = require("../common/responses/apiResponse");
const BoardSuccessCode = require("../common/codes/boardSuccessCode");
const boardService = require("../Service/BoardService");
const userService = require("../Service/UserService");
const asyncHandler = require("../utils/asyncHandler"); // [jeff] 사용하지 않는 경우 제거를 고려하세요!

module.exports.getPostList = async (req, res, next) => {
    try {
        const board = await boardService.getPostList(req);
        // [jeff] 특정 코드를 죽여놓는 경우 왜 죽여놓은 상태인지 주석으로 설명 달아두셔야 합니다.
        // 아니면 그냥 날려버리세요! 어차피 깃에 남아있는데 뭐하러 살려둡니까 하하
        // const result = await userService.setUserInfoInListByEmail(board);
        const successResponse = BoardSuccessCode.createPostFetched(board);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

module.exports.createPost = async (req, res, next) => {
    try {
        const result = await boardService.createPost(req);
        const successResponse = BoardSuccessCode.createPost(result);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

module.exports.getPostByPostId = async (req, res, next) => {
    try {
        const board = await boardService.getPostByPostId(req);
        const successResponse = BoardSuccessCode.createPostDetailFetched(board);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

module.exports.getPostEditByPostId = async (req, res, next) => {
    try {
        const result = await boardService.getPostEditByPostId(req);
        const successResponse = BoardSuccessCode.createPostDetailFetched(result);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

// 얘는 게시글 상세보기에 추가되어야하는 기능 !!
// module.exports.patchPostViews = async (req, res, next) => {
//   try {
//     const result = await boardService.patchPostViews(req);
//     const successResponse = BoardSuccessCode.(result); // !!!
//     apiResponse.success(req, res, successResponse);
//   } catch (error) {
//     next(error);
//   }
// };

// [jeff] 굳이 module.exports 를 여러번 하는 것보다는
// "object literal pattern" 으로 짜는것도 고려해보시면 좋습니다. (구글에 검색해보세요)
// 참고 -> updateCommentByCommentId, deleteCommentByCommentId 부분이 객체 리터럴 패턴입니다.
module.exports.updatePostByPostId = async (req, res, next) => {
    try {
        const result = await boardService.updatePostByPostId(req);
        const successResponse = BoardSuccessCode.createPostUpdated(result);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

module.exports.deletePostByPostId = async (req, res, next) => {
    try {
        const result = await boardService.deletePostByPostId(req);
        const successResponse = BoardSuccessCode.createPostDeleted(result);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

module.exports.createComment = async (req, res, next) => {
    try {
        const result = await boardService.createComment(req);
        const successResponse = BoardSuccessCode.createComment(result);
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};

// 페이징 때문에 필요한 작업임!! -> 현재는 사용하지 않음!!
module.exports.getCommentListByPostId = async (req, res, next) => {
    try {
        const result = await boardService.getCommentListByPostId(req);
        // const successResponse = BoardSuccessCode.(result); // !!!
        apiResponse.success(req, res, successResponse);
    } catch (error) {
        next(error);
    }
};


// [jeff] * 주의: 아래 내용은 권장사항이며 필수가 아닙니다.
// 코드가 특정 블럭 안에 들어가는 형태로 반복적으로 나온다면 미들웨어 패턴으로 감아버릴수도 있습니다. (고차함수 + 미들웨어 패턴)
// 다만! 절대로 코드가 깔끔해졌다고 좋아하면 안됩니다.
// try, catch 문을 고차함수로 래핑한건 좋으나 나중에 기능추가나 디버깅 할 때 오히려 독이 될 수도 있습니다.
// 예를 들어 무슨 에러인지 catch 시점에서 이거저거 변수 돌려봐야 할 수도 있는데 고차함수로 한번 감아버리면
// 이런 디버깅이 불가능해집니다. 그러면 또 코드를 다시 원상 복귀시켜야 하는거지요.
// 잘생각해보고 써야합니다.
module.exports = {
    updateCommentByCommentId: asyncHandler(async (req, res, next) => {
        try {
            const result = await boardService.updateCommentByCommentId(req);
            const successResponse = BoardSuccessCode.createCommentUpdated(result);
            apiResponse.success(req, res, successResponse);
        } catch (error) {
            next(error);
        }
    }),

    deleteCommentByCommentId: asyncHandler(async (req, res, next) => {
        try {
            const result = await boardService.deleteCommentByCommentId(req);
            const successResponse = BoardSuccessCode.createCommentDeleted(result);
            apiResponse.success(req, res, successResponse);
        } catch (error) {
            next(error);
        }
    })
}


//
// module.exports.updateCommentByCommentId = async (req, res, next) => {
//   try {
//     const result = await boardService.updateCommentByCommentId(req);
//     const successResponse = BoardSuccessCode.createCommentUpdated(result);
//     apiResponse.success(req, res, successResponse);
//   } catch (error) {
//     next(error);
//   }
// };
//
// module.exports.deleteCommentByCommentId = async (req, res, next) => {
//   try {
//     const result = await boardService.deleteCommentByCommentId(req);
//     const successResponse = BoardSuccessCode.createCommentDeleted(result);
//     apiResponse.success(req, res, successResponse);
//   } catch (error) {
//     next(error);
//   }
// };
