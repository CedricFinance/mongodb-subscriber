#!/bin/sh

docker run --rm -it --link mongo:mongo mongo /usr/local/bin/mongo mongo/electricity
