from fastapi import APIRouter, UploadFile, HTTPException
from typing import Dict
import shutil
import os

router = APIRouter(prefix="/api/analysis")

# 임시 저장소
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload")
async def upload(file: UploadFile) -> Dict:
    # 파일 확장자 검증
    if not file.filename.endswith('.zip'):
        raise HTTPException(status_code=400, detail="Only ZIP files are allowed")
    return 'ye'
