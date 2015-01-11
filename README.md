mongodb-subscriber
=================

Mongodb subscriber for the teleinfo project

Usage
-----

    docker run -it --rm --link teleinfo-activemq:mq --link mongo:mongo --name mongodb-subscriber cedricfinance/mongodb-subscriber
