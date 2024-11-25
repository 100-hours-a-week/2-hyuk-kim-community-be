const multer = require('multer');

const memoryStorage = multer.memoryStorage();

// 우선은 이미지만 3종류로 설정!
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('지원하지 않는 파일 형식입니다. (jpeg, png, gif만 가능)'), false);
    }
};

// multer 설정
const multerConfig = {
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1 // 파일 개수 제한 -> 이미지 늘릴 때 대비해서 명시해두기!
    },
    fileFilter
};

// multer 미들웨어 생성
const upload = multer(multerConfig);

module.exports = {
    upload,
    multerConfig
};