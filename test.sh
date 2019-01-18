#!/bin/sh

IMAGE_NAME="$(basename $(pwd)).test"

docker build -t "${IMAGE_NAME}" .

docker run --rm --name "${IMAGE_NAME}" "${IMAGE_NAME}" npm test
