# API 문서

## 목차
1. [공통 사항](#공통-사항)
2. [API 엔드포인트](#api-엔드포인트)
3. [응답 코드](#응답-코드)


## 공통 사항
모든 API는 다음 기본 URL을 사용합니다:
```
http://localhost:3001/api
```

### 인증
- 세션 기반 인증 사용
- 인증이 필요한 API는 `authMiddleware`를 통과해야 합니다

### 응답 형식
```json
{
  "status": "success" | "error",
  "data": {},  // 성공 시 데이터
  "error": {}  // 실패 시 에러 정보
}
```

## API 엔드포인트

### 사용자 인증 및 프로필 관리

#### 인증
##### 로그인
- **POST** `/api/auth/login`
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

##### 로그아웃
- **POST** `/api/auth/logout`
- 인증 필요

#### 회원 관리

##### 회원가입
- **POST** `/api/users/signup`
- **Request Body** (multipart/form-data):
    - image: 프로필 이미지 파일 (선택)
    - email: string
    - password: string
    - username: string

##### 회원 탈퇴
- **DELETE** `/api/users`
- 인증 필요

#### 프로필 관리

##### 프로필 조회
- **GET** `/api/users/profile`
- 인증 필요

##### 프로필 수정
- **PATCH** `/api/users/profile`
- 인증 필요
- **Request Body** (multipart/form-data):
    - image: 프로필 이미지 파일 (선택)
    - username: string (선택)

##### 비밀번호 변경
- **PATCH** `/api/users/password`
- 인증 필요
- **Request Body**:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

### 게시글 관리

##### 게시글 목록 조회
- **GET** `/api/posts`
- 인증 필요
- **Query Parameters**:
    - page: number (선택)
    - limit: number (선택)

##### 특정 게시글 조회
- **GET** `/api/posts/:postId`
- 인증 필요

##### 게시글 작성
- **POST** `/api/posts`
- 인증 필요
- **Request Body** (multipart/form-data):
    - image: 게시글 이미지 파일 (선택)
    - title: string
    - content: string

##### 게시글 수정
- **PATCH** `/api/posts/:postId`
- 인증 필요
- **Request Body** (multipart/form-data):
    - image: 게시글 이미지 파일 (선택)
    - title: string (선택)
    - content: string (선택)

##### 게시글 삭제
- **DELETE** `/api/posts/:postId`
- 인증 필요

### 댓글 관리

##### 댓글 작성
- **POST** `/api/comments`
- 인증 필요
- **Request Body**:
```json
{
  "postId": "number",
  "content": "string"
}
```

##### 댓글 수정
- **PATCH** `/api/comments/:commentId`
- 인증 필요
- **Request Body**:
```json
{
  "content": "string"
}
```

##### 댓글 삭제
- **DELETE** `/api/comments/:commentId`
- 인증 필요

### 좋아요 기능

##### 게시글 좋아요
- **POST** `/api/posts/like/:postId`
- 인증 필요

##### 게시글 좋아요 취소
- **POST** `/api/posts/unlike/:postId`
- 인증 필요

### 응답 코드

### 성공 응답 (Success Responses)

#### HTTP Status 200 (OK)
| 메시지 코드 | 설명 |
|------------|------|
| POSTS_FETCHED | 게시글 목록 조회 성공 |
| POST_DETAIL_FETCHED | 게시글 상세보기 조회 성공 |
| POST_UPDATED | 게시글 수정 성공 |
| POST_DELETED | 게시글 삭제 성공 |
| COMMENT_UPDATED | 댓글 수정 성공 |
| COMMENT_DELETED | 댓글 삭제 성공 |
| LOGIN_SUCCESS | 로그인 성공 |
| LOGOUT_SUCCESS | 로그아웃 성공 |
| AVAILABLE_EMAIL | 사용 가능한 이메일입니다 |
| USER_FETCHED | 사용자 조회 성공 |
| NICKNAME_UPDATED | 닉네임 수정 성공 |
| PASSWORD_UPDATED | 비밀번호 수정 성공 |
| ACCOUNT_DELETED | 회원 탈퇴 완료 |

#### HTTP Status 201 (Created)
| 메시지 코드 | 설명 |
|------------|------|
| POST_CREATED | 게시글 작성 성공 |
| COMMENT_CREATED | 댓글 생성 성공 |
| LIKE_POST | 좋아요 성공 |
| UNLIKE_POST | 좋아요 취소 성공 |
| USER_CREATED | 회원가입 성공 |

### 에러 응답 (Error Responses)

#### HTTP Status 400 (Bad Request)
| 에러 코드 | 메시지 |
|-----------|--------|
| DELETED_USER | 회원 탈퇴한 유저입니다 |
| INVALID_ACCESS | 잘못된 접근입니다 |
| INVALID_CREDENTIALS | 아이디 또는 비밀번호가 일치하지 않습니다 |
| INVALID_FORMAT | 입력 형식이 올바르지 않습니다 |
| MISMATCH_USER_ID | 게시글 작성자와 다른 ID입니다 |
| MISMATCH_COMMENT_ID | 댓글 작성자와 다른 ID입니다 |

#### HTTP Status 401 (Unauthorized)
| 에러 코드 | 메시지 |
|-----------|--------|
| NOT_LOGGED_IN | 로그인이 필요한 서비스입니다 |
| UNAUTHORIZED_USER_ACCESS | 해당 사용자의 정보에 접근할 권한이 없습니다 |
| INVALID_AUTH | 사용자 인증에 실패했습니다 |
| EXPIRED_SESSION | 세션이 만료되었습니다. 다시 로그인해주세요 |

#### HTTP Status 404 (Not Found)
| 에러 코드 | 메시지 |
|-----------|--------|
| USER_NOT_FOUND | ID에 해당하는 사용자가 존재하지 않습니다 |
| EMAIL_NOT_FOUND | ID에 해당하는 이메일이 존재하지 않습니다 |
| BOARD_NOT_FOUND | ID에 해당하는 게시글이 존재하지 않습니다 |
| COMMENT_NOT_FOUND | ID에 해당하는 게시글이 존재하지 않습니다 |

#### HTTP Status 409 (Conflict)
| 에러 코드 | 메시지 |
|-----------|--------|
| EMAIL_EXISTS | 이미 존재하는 이메일입니다 |

#### HTTP Status 500 (Internal Server Error)
| 에러 코드 | 메시지 |
|-----------|--------|
| UNEXPECTED_ERROR | 서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요 |

### 응답 예시

#### 성공 응답 예시
```json
{
  "status": "success",
  "message": "게시글 작성 성공",
  "data": {
    "postId": 1,
    "title": "게시글 제목",
    "content": "게시글 내용"
  }
}
```

#### 에러 응답 예시
```json
{
  "status": "error",
  "message": "로그인이 필요한 서비스입니다",
  "data": {}
}
```