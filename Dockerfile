FROM pytorch/pytorch:1.12.1-cuda11.3-cudnn8-runtime

ENV DEBIAN_FRONTEND noninteractive
RUN apt update && apt install -y \
    python3 \
    python3-pip \
    git \
    ffmpeg

WORKDIR /workspace
COPY . .
RUN pip3 install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--log-level", "info"]
