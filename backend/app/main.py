from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from routers import analysis
from db import init_db, get_db_connection

app = FastAPI(
    title="WPHunter API",
    description="WordPress Plugin/Theme Vulnerability Analysis API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
def root():
    return RedirectResponse(url="/docs", status_code=302)

@app.get("/debug/db")
async def debug_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM analysis_results")
    rows = cursor.fetchall()
    conn.close()
    return [{"task_id": row["task_id"], "status": row["status"], "result": row["result"]} for row in rows]
