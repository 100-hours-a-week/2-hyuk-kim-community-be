# KTB 커뮤니티 실습

개발기간: 2024.10.21 ~ (진행 중)
</br>

## 프로젝트 소개

- 커뮤니티 프로젝트는 **HTML CSS JS**를 활용하여 커뮤니티 웹 애플리케이션을 구현한 프로젝트입니다.<br>
- **Airbnb Code Convention**을 기준으로 코드 품질과 일관성을 유지하며 개발하였습니다. <br>
- 이 프로젝트는 사용자 인증, 게시판, 댓글, 좋아요 기능 등 기본적인 커뮤니티 서비스 구현을 목표로 하고 있습니다.
</br>

## 주요 기능

- **사용자 인증**: 로그인, 회원가입
- **게시판 기능**: 게시글 작성, 수정, 삭제
- **댓글 기능**: 댓글 작성, 수정, 삭제

## 기술 스택

- **Backend**: Express.js
- **Database**: MariaDB - ```추후 업데이트 예정```
- **Authentication**: JWT (JSON Web Token) + Session - ```추후 업데이트 예정```

## 프로젝트 실행 방법

### 필수 환경

- Node.js (최소 버전: 20.x)
- MariaDB (로컬 서버 설치 또는 클라우드 DB 사용) - ```추후 업데이트 예정```
  </br> </br>

### 설치 방법

1. 이 프로젝트를 클론합니다.
   ```bash
   git clone https://github.com/100-hours-a-week/2-hyuk-kim-community-be.git
   ```

 </br>
 
2. 프로젝트 디렉터리로 이동 후 의존성을 설치합니다.
      ```bash
      cd ktb-community
      npm install
      .env 파일을 생성하고 데이터베이스 연결 설정을 추가합니다.
      ```

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=ktb_community
    JWT_SECRET=your-secret-key
    ```

 </br>

3. 서버를 시작합니다.
    ```
    npm run start
    ```

 </br>

4. 브라우저에서 ```http://localhost:3001```을 열어 프로젝트를 확인합니다.
   </br>
   </br>

## 코드 스타일
이 프로젝트는 Airbnb Code Convention을 따릅니다. 코드 품질과 일관성을 유지하기 위해 ESLint와 Prettier를 설정하였으며, 코드 리뷰 시 이를 기준으로 확인합니다.</br>

- JavaScript: ES6+ 문법 사용 </br>
- 변수 선언: let, const만 사용하고, var는 사용하지 않음</br>
- 함수: 화살표 함수 사용</br>
- 들여쓰기: 2칸</br>
- 세미콜론: 항상 사용
