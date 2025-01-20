from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import analysis

app = FastAPI(
    title="WPHunter API",
    description="WordPress Plugin/Theme Vulnerability Analysis API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(analysis.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
def hello():
    return "hello world"
