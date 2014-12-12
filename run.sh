#!/bin/sh

docker run -it --rm --link activemq2:mq mongodb-subscriber
