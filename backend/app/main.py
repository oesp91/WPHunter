from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from routers import analysis

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

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
def root():
    return RedirectResponse(url="/docs", status_code=302)
