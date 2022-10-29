from time import time
from fastapi import FastAPI, File, UploadFile, HTTPException, Query, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
import os
import shutil
from pathlib import Path
import whisper
import enum

app = FastAPI(docs_url="/docs/swagger")
UPLOAD_DIR = Path.cwd().joinpath("uploads")
print("Loading model...")
model = whisper.load_model("large", download_root="models")

core_dir = Path(os.path.dirname(__file__)).resolve()
app.mount("/static", StaticFiles(directory=str(core_dir.joinpath("./website/build/static").resolve())), name="static")
templates = Jinja2Templates(directory=str(core_dir.joinpath("./website/build").resolve()))

# index page
@app.get("/")
async def serve_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/health")
def root():
    return "OK"

class LanguageEnum(str, enum.Enum):
    en = "english"
    ja = "japanese"
    zh = "chinese"
    de = "german"
    es = "spanish"
    ru = "russian"
    ko = "korean"
    fr = "french"
    pt = "portuguese"
    tr = "turkish"
    pl = "polish"
    ca = "catalan"
    nl = "dutch"
    ar = "arabic"
    sv = "swedish"
    it = "italian"
    id = "indonesian"
    hi = "hindi"
    fi = "finnish"
    vi = "vietnamese"
    iw = "hebrew"
    uk = "ukrainian"
    el = "greek"
    ms = "malay"
    cs = "czech"
    ro = "romanian"
    da = "danish"
    hu = "hungarian"
    ta = "tamil"
    no = "norwegian"
    th = "thai"
    ur = "urdu"
    hr = "croatian"
    bg = "bulgarian"
    lt = "lithuanian"
    la = "latin"
    mi = "maori"
    ml = "malayalam"
    cy = "welsh"
    sk = "slovak"
    te = "telugu"
    fa = "persian"
    lv = "latvian"
    bn = "bengali"
    sr = "serbian"
    az = "azerbaijani"
    sl = "slovenian"
    kn = "kannada"
    et = "estonian"
    mk = "macedonian"
    br = "breton"
    eu = "basque"
    #is = "icelandic"
    hy = "armenian"
    ne = "nepali"
    mn = "mongolian"
    bs = "bosnian"
    kk = "kazakh"
    sq = "albanian"
    sw = "swahili"
    gl = "galician"
    mr = "marathi"
    pa = "punjabi"
    si = "sinhala"
    km = "khmer"
    sn = "shona"
    yo = "yoruba"
    so = "somali"
    af = "afrikaans"
    oc = "occitan"
    ka = "georgian"
    be = "belarusian"
    tg = "tajik"
    sd = "sindhi"
    gu = "gujarati"
    am = "amharic"
    yi = "yiddish"
    lo = "lao"
    uz = "uzbek"
    fo = "faroese"
    ht = "haitian creole"
    ps = "pashto"
    tk = "turkmen"
    nn = "nynorsk"
    mt = "maltese"
    sa = "sanskrit"
    lb = "luxembourgish"
    my = "myanmar"
    bo = "tibetan"
    tl = "tagalog"
    mg = "malagasy"
    #as = "assamese"
    tt = "tatar"
    haw = "hawaiian"
    ln = "lingala"
    ha = "hausa"
    ba = "bashkir"
    jw = "javanese"
    su = "sundanese"

@app.post(
    "/transcribe", 
    tags=["Transcribe"],
    description="Transcribe audio file to text",
)
def transcribe(language: LanguageEnum = Query(default=None, description="Target language for transcribe. If default, detect language automatically."), file: UploadFile = File(...)):
    try:
        print("Transcribing... {}".format(file.filename))
        time_start = time()
        upload_file(file)
        result = model.transcribe(str(UPLOAD_DIR.joinpath(file.filename)), fp16=False, language=language.name if language else None)
        delete_file(file)
        time_end = time()
        print("Transcribed in {:.2f} seconds".format(time_end - time_start))
        return result
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
