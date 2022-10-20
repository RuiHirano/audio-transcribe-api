from time import time
from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
import os
import shutil
from pathlib import Path
import whisper

app = FastAPI(docs_url="/docs/swagger")
UPLOAD_DIR = Path.cwd().joinpath("uploads")

@app.get("/health")
def root():
    return "OK"

@app.post(
    "/transcribe", 
    tags=["Transcribe"],
    description="Transcribe audio file to text",
)
def transcribe(file: UploadFile = File(...)):
    try:
        time_start = time()
        print("Loading model...")
        model = whisper.load_model("large")
        print("Transcribing... {}".format(file.filename))
        upload_file(file)
        result = model.transcribe(str(UPLOAD_DIR.joinpath(file.filename)), fp16=False)
        delete_file(file)
        time_end = time()
        print("Transcribed in {:.2f} seconds".format(time_end - time_start))
        return {"text": result["text"]}
    except Exception as e:
        print("Error: {}".format(e))
        raise HTTPException(status_code=500, detail=e)

def upload_file(file):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    if file:
        filename = file.filename
        fileobj = file.file
        with open(os.path.join(UPLOAD_DIR, filename),'wb+') as f:
            shutil.copyfileobj(fileobj, f)

def delete_file(file):
    os.remove(os.path.join(UPLOAD_DIR, file.filename))

if __name__ == "__main__":
    print("API server start.")
    uvicorn.run(
        "__main__:app", port=int(os.environ["PORT"]), reload=os.environ["RELOAD"], host='0.0.0.0', log_level=os.environ["LOG_LEVEL"]
    )
