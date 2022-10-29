docker-build:
	docker build -t audio-transcribe-api .
docker-run:
	docker run --rm -it \
		-v `pwd`/models:/workspace/models \
		-p 5000:5000 audio-transcribe-api
docker-run-dev:
	docker run --rm -it \
		-v `pwd`:/workspace \
		-p 5000:5000 audio-transcribe-api \
		uvicorn main:app --reload --host "0.0.0.0" --port 5000 --log-level "debug"
download-model:
	wget -P models https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large.pt
