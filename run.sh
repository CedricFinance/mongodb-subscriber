#!/bin/sh

docker run -it --rm --link activemq2:mq --link mongo:mongo mongodb-subscriber
