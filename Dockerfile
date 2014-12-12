FROM node:latest

ENV ACTIVEMQ_USER user
ENV ACTIVEMQ_PASSWORD password

RUN useradd -m app

USER app
WORKDIR /home/app

ADD package.json /home/app/
RUN npm install

ADD src /home/app/src

CMD node src/app.js
