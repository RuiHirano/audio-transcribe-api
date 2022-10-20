# Audio Transcribe API
This is a simple API that transcribes audio files using whisper.

# Getting Started

## 1. Download Model
```
make download_model
```

## 2. Build Image

```
make docker_build
```

## 3. Run Container

```
make docker_run
```

develop mode:
```
make docker_run_dev
```

## 4. Transcribe

### Swagger UI
View at http://localhost:5001/docs/swagger. 
Send post /transcribe request with audio file.

### Curl
This is sample code. (Unconfirmed)

```bash
curl -X 'POST' \
  'http://localhost:5001/transcribe' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@sample.wav;type=audio/wav'
```

### Python
This is sample code. (Unconfirmed)

```python
fileName = 'demo01.xlsx'
fileDataBinary = open(fileName, 'rb').read()
files = {'uploadFile': (fileName, fileDataBinary, 'audio/wav')}
url = 'http://localhost:5001/transcribe'
response = requests.post(url, files=files)
```

# API Reference

### Health check
ENDPOINT: /health
Response: 200 OK

### Transcribe
ENDPOINT: /transcribe
Response: 200 { "text": "hogehoge" }, 500 { "detail": "hogehoge" }
