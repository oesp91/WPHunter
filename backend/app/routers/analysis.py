from fastapi import APIRouter, UploadFile, HTTPException
from typing import Dict
import shutil
import os
import aiofiles

router = APIRouter(prefix="/api/analysis")

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload")
async def upload(file: UploadFile) -> Dict:
    file_path =  os.path.join(UPLOAD_DIR, file.filename)

    if not file.filename.endswith('.zip'):
        raise HTTPException(status_code=400, detail="Only ZIP files are allowed")

    async with aiofiles.open(file_path, "wb") as buffer:
        content = await file.read()
        await buffer.write(content)

    return {"filename": file.filename, "status": "uploaded"}
