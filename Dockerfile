# 빌드 스테이지
FROM node:20.18.0-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 모든 의존성 설치 (개발 의존성 포함)
RUN npm ci

# 소스 코드 복사
COPY . .

# 프로덕션 스테이지
FROM node:20.18.0-alpine

# PM2 전역 설치
RUN npm install -g pm2

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 실행 환경에 필요한 의존성만 설치
RUN npm install --production

# builder 스테이지에서 필요한 파일들만 복사
COPY --from=builder / /

# 환경변수 파일 복사 (.env.product)
# COPY .env.product .env.product

# 환경변수 설정
ENV NODE_ENV=product \
    Server_PORT=3001

# 애플리케이션 포트 노출
EXPOSE 3001

# PM2로 애플리케이션 실행
CMD ["pm2-runtime", "start", "./config/pm2.config.js", "--only", "back-product"]