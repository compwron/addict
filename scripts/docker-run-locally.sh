#!/bin/bash

OPTS="-p $(basename $PWD)"

if [ "$JOB_NAME" != "" ]; then
   OPTS="-p $JOB_NAME"
fi

docker-compose run --rm --service-ports web
