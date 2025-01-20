const multer = require("multer");
const {ImageErrorCode} = require("../common/codes/imageErrorCode");

const memoryStorage = multer.memoryStorage();

// 우선은 이미지만 3종류로 설정!
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(ImageErrorCode.createInvalidFormat(), false);
    }
};

// multer 설정
const multerConfig = {
    storage: memoryStorage,
    limits: {
        fileSize: 15 * 1024 * 1024, // 15MB
        files: 1 // 파일 개수 제한 -> 이미지 늘릴 때 대비해서 명시해두기!
    },
    fileFilter
};

// multer 미들웨어 생성 -> 이걸 route에서 사용하면 req.file로 받아줌
const upload = multer(multerConfig);

module.exports = {
    upload
};