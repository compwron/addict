#!/bin/sh

IMAGE_NAME="$(basename $(pwd)).app"

docker build -t "${IMAGE_NAME}" .

docker run --init --rm --name "${IMAGE_NAME}" -p 8000:8000 "${IMAGE_NAME}" npm start
