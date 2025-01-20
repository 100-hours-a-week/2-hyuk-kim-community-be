# 아키텍처 문서

## 기술 스택 상세

### 백엔드
- **Runtime & Package Manager**
    - Node.js 20.18.0
    - npm 11.0.0

- **Framework & Libraries**
    - Express.js - 웹 프레임워크
    - express-session - 세션 관리
    - multer - 파일 업로드
    - cors - CORS 처리
    - dotenv - 환경 변수 관리

- **데이터베이스**
    - MariaDB 10.x
    - sequelize - ORM

### 클라우드 서비스
- **AWS**
    - EC2 - 서버 호스팅
    - S3 - 이미지 저장소

## 프로젝트 구조
```
.
├── Controller/                  # 요청/응답 처리 및 비즈니스 로직 연결
│   ├── BoardController.js      # 게시글/댓글 관련 컨트롤러
│   └── UserController.js       # 사용자 관련 컨트롤러
│
├── Model/                      # 데이터베이스 모델
│   ├── CommentModel.js        # 댓글 모델
│   ├── CommonModel.js         # 공통 모델
│   ├── PostModel.js           # 게시글 모델
│   └── UserModel.js           # 사용자 모델
│
├── Route/                      # API 라우트 정의
│   ├── BoardRoute.js          # 게시글/댓글 관련 라우트
│   └── UserRoute.js           # 사용자 관련 라우트
│
├── Service/                    # 비즈니스 로직
│   ├── BoardService.js        # 게시글/댓글 관련 서비스
│   └── UserService.js         # 사용자 관련 서비스
│
├── common/                     # 공통 모듈
│   ├── errors/                # 에러 처리 관련
│   └── responses/             # 응답 처리 관련
│
├── config/                     # 설정 파일
├── middlewares/               # 미들웨어
│   └── validate/             # 유효성 검사
│
├── utils/                     # 유틸리티 함수
│   └── provider/             # 외부 서비스 제공자
│
└── app.js                     # 앱 진입점
```

## 아키텍처 개요
- MVC 패턴 기반
- 계층형 아키텍처 (Route → Controller → Service → Model)
- 관심사 분리 원칙 준수

## 주요 컴포넌트
- **Controller**: 요청/응답 처리
- **Service**: 비즈니스 로직
- **Model**: 데이터 접근 계층
- **Middleware**: 인증, 로깅, 에러 처리