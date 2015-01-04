#!/bin/sh

docker run -it --rm --link teleinfo-activemq:mq --link mongo:mongo -e ACTIVEMQ_USER=subscriber -e ACTIVEMQ_PASSWORD=subscriber -v $PWD:/home/app node-runtime-dev
