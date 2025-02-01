# GitHub Actions Workflows

## Deploy (`deploy.yml`)

메인 브랜치에 push가 발생하면 자동으로 배포를 실행합니다.

### 동작 방식
- main 브랜치 push 감지
- 서버 접속
- git pull로 최신 코드 적용

### 필요한 Secrets
- SERVER_HOST: 서버 IP 주소
- SERVER_USERNAME: 서버 접속 계정
- SERVER_PASSWORD: 서버 접속 비밀번호

### 주의사항
- 서버에 docker-compose.dev.yml로 서비스가 실행 중이어야 함
- 볼륨 마운트로 코드 변경이 실시간 반영됨
