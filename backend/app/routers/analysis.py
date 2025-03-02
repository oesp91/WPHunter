from fastapi import APIRouter, UploadFile, HTTPException
from typing import Dict
import shutil
import os
import aiofiles
from pathlib import Path
import json
from services.analyzer import start_analysis, generate_task_id
from db import get_db_connection

router = APIRouter(prefix="/api/analysis")

UPLOAD_DIR = Path("uploads")
RESULT_DIR = Path("results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULT_DIR.mkdir(exist_ok=True)

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/scans", status_code=202)
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

@router.get("/scans/{task_id}", status_code=200)
async def get_result(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT status, result FROM analysis_results WHERE task_id = ?", (task_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"status": "processing"}  # 아직 DB에 없으면 처리 중으로 간주

    status, result = row["status"], row["result"]
    if status == "processing":
        return {"status": "processing"}

    try:
        return {
            "status": "completed",
            "result": json.loads(result) if result else {"error": "No results available"}
        }
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Invalid JSON format: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get result: {str(e)}")
