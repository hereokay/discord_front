#!/bin/bash

# 이미지 빌드
echo "Building Docker image..."
docker build -t discord-front .

# 이미지 태그 지정
echo "Tagging image..."
docker tag discord-front hereokay/discord-front

# Docker Hub로 푸시
echo "Pushing image to Docker Hub..."
docker push hereokay/discord-front

echo "Process completed!"
