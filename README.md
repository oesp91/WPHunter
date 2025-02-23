# Test
## 설치, 실행
```bash
git clone https://github.com/oesp91/WPHunter.git
cd WPHunter
```
```bash
docker compose -f docker-compose.dev.yml up --build
```
### 종료
```bash
docker compose down --volumes
```
localhost:5173
## api 흐름
1. 사용자가 ZIP 파일을 /api/analysis/scans에 POST로 업로드
2. 백엔드가 task_id를 생성하고, ZIP 파일을 저장 후 Semgrep으로 분석 시작
3. 클라이언트가 /api/analysis/scans/{task_id}를 폴링하여 분석 상태와 결과를 주기적으로 조회
4. 분석 완료 시 결과 JSON 반환, 프론트엔드에서 UI에 표시
