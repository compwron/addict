#!/bin/bash

OPTS="-p $(basename $PWD)"

if [ "$JOB_NAME" != "" ]; then
   OPTS="-p $JOB_NAME"
fi

docker-compose down
docker-compose build web
docker-compose run --rm --service-ports web
