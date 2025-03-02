import subprocess
import json
from pathlib import Path
import uuid
import tempfile, zipfile
import os
import shutil
from db import get_db_connection

def generate_task_id():
    return uuid.uuid4().hex[:12]

def extract_zip(zip_path: str) -> str:
    temp_dir = tempfile.mkdtemp()
    
   
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(temp_dir)
   
    return temp_dir

def run_semgrep_analysis(file_path, result_path):
    subprocess.run(
        [
            'semgrep',
            'scan',
            '--config', '/app/services/rules.yaml',
            '--json', f'--json-output={str(result_path)}'
        ], 
        cwd=str(file_path),
        check=False
    )

def save_result_to_db(task_id: str, status: str, result: str = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO analysis_results (task_id, status, result) VALUES (?, ?, ?)",
        (task_id, status, result)
    )
    conn.commit()
    conn.close()

def start_analysis(task_id):
    zip_path = f"uploads/{task_id}.zip"
    extracted_path = extract_zip(zip_path)
    result_path = f"/app/results/{task_id}.json"

    try:
        save_result_to_db(task_id, "processing")
        run_semgrep_analysis(extracted_path, result_path)

        if os.path.exists(result_path):
            with open(result_path, "r") as f:
                result_json = f.read()
            save_result_to_db(task_id, "completed", result_json)
        else:
            save_result_to_db(task_id, "completed", json.dumps({"error": "No results generated"}))

    finally:
        print(extracted_path)
        # shutil.rmtree(extracted_path)

        if os.path.exists(result_path):
            os.remove(result_path)
