import subprocess
import json
from pathlib import Path
import uuid
import tempfile, zipfile
import os
import shutil

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

def start_analysis(task_id):
    zip_path = f"uploads/{task_id}.zip"
    extracted_path = extract_zip(zip_path)

    try:
        result_path = f"/app/results/{task_id}.json"
        run_semgrep_analysis(extracted_path, result_path)

    finally:
        print(extracted_path)
        # shutil.rmtree(extracted_path)
