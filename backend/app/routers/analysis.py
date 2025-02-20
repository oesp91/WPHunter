from fastapi import APIRouter, UploadFile, HTTPException
from typing import Dict
import shutil
import os
import aiofiles
from pathlib import Path
import json
from services.analyzer import start_analysis, generate_task_id

router = APIRouter(prefix="/api/analysis")

UPLOAD_DIR = Path("uploads")
RESULT_DIR = Path("results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULT_DIR.mkdir(exist_ok=True)

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# @router.post("/upload")
# async def upload(file: UploadFile) -> Dict:
#     file_path =  os.path.join(UPLOAD_DIR, file.filename)
#
#     if not file.filename.endswith('.zip'):
#         raise HTTPException(status_code=400, detail="Only ZIP files are allowed")
#
#     async with aiofiles.open(file_path, "wb") as buffer:
#         content = await file.read()
#         await buffer.write(content)
#
#     return {"filename": file.filename, "status": "uploaded"}

@router.post("/analyze")
async def analyze(file: UploadFile):
    if not file.filename.endswith('.zip'):
        raise HTTPException(status_code=400, detail="Only ZIP files are allowed")

    try:
        task_id = generate_task_id()
        zip_path = UPLOAD_DIR / f"{task_id}.zip"

        async with aiofiles.open(zip_path, "wb") as buffer:
            content = await file.read()
            await buffer.write(content)

        start_analysis(task_id)

        return {
            "task_id": task_id,
            "status": "processing"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/result/{task_id}")
async def get_result(task_id):
    result_path = RESULT_DIR / f"{task_id}.json"

    if not result_path.exists():
        return {
            "status": "processing"
        }
    
    try:
        with result_path.open() as f:
            return {
                "status": "completed",
                "result": json.load(f)
            }
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Invalid JSON format: {str(e)}"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get result: {str(e)}"
        )
