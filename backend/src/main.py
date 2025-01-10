from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/")
def hello():
    return "hi hi hi"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
