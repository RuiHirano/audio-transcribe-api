FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt update && apt install -y \
    python3 \
    python3-pip \
    git \
    ffmpeg

WORKDIR /workspace
COPY . .
RUN pip3 install -r requirements.txt

CMD ["python3", "app.py"]
