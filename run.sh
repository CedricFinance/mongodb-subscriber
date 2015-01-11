#!/bin/sh

docker run -it --rm --link teleinfo-activemq:mq --link mongo:mongo --name mongodb-subscriber mongodb-subscriber
