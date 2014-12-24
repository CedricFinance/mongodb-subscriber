#!/bin/sh

docker run -it --rm --link teleinfo-activemq:mq --link mongo:mongo mongodb-subscriber
