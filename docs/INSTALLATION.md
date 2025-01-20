# 설치 가이드

## 필수 환경
- Node.js 20.18.0
- npm 11.0.0
- MariaDB 10.x

## 설치 단계

### 1. 저장소 클론
```bash
git clone https://github.com/100-hours-a-week/2-hyuk-kim-community-be.git
cd ktb-community
```

2. 의존성 설치
```bash
npm install
```
3. 환경 변수 설정
프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가합니다:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=ktb_community
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=id
AWS_SECRET_ACCESS_KEY=key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET_NAME=bucket_name
```

4. 데이터베이스 설정

MariaDB 설치 및 실행
데이터베이스 생성

```sql
CREATE DATABASE ktb_community;
```  

5. 서버 실행
```
bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm run start
```

6. 동작 확인

http://localhost:3001 접속