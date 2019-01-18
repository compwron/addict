#!/bin/bash -e
OPTS="-p $(basename $PWD)"

if [ "$JOB_NAME" != "" ]; then
   OPTS="-p $JOB_NAME"
fi

docker-compose run --rm web npm test
docker-compose down
