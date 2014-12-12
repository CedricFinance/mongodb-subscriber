var Stomp = require('stomp-client');

var destination = '/queue/electricity/metrics';
var user = process.env.ACTIVEMQ_USER;
var pass = process.env.ACTIVEMQ_PASSWORD;
var port = 61613;

var client = new Stomp('mq', port, user, pass);

client.connect(function(sessionId) {
    client.subscribe(destination, function(body, headers) {
      var metrics = JSON.parse(body);
      console.log('Message received:', metrics);
    });
});
