const { OK, Created } = require("../responses/CustomSuccess");

const SuccessMessages = {
    CREATE_PRESIGNEDURL: "성공적으로 PreSignedURl을 생성 했습니다",
}

const ImageSuccessCode = {
    createPreSignedURL: (data) => new Created(SuccessMessages.CREATE_PRESIGNEDURL, data),
}

module.exports = ImageSuccessCode;