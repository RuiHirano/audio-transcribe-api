docker_build:
	docker build -t audio-transcribe-api .
docker_build_gpu:
	docker build -t audio-transcribe-api -f Dockerfile.gpu .
docker_run:
	docker run --rm -it \
		-v `pwd`/models:/root/.cache/whisper \
		-e PORT=5001 \
		-e HOST=0.0.0.0 \
		-e LOG_LEVEL=error \
		-e RELOAD=false \
		-p 5001:5001 audio-transcribe-api
docker_run_dev:
	docker run --rm -it -v `pwd`:/workspace \
		-v `pwd`/models:/root/.cache/whisper \
		-e PORT=5001 \
		-e HOST=0.0.0.0 \
		-e LOG_LEVEL=debug \
		-e RELOAD=true \
		-p 5001:5001 audio-transcribe-api
download_model:
	wget -P models https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large.pt
