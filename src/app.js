var Stomp = require('stomp-client');
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

var destination = '/topic/electricity/metrics';
var user = process.env.ACTIVEMQ_USER;
var pass = process.env.ACTIVEMQ_PASSWORD;
var port = 61613;
var url = 'mongodb://mongo/electricity';

var client = new Stomp('mq', port, user, pass);


function activemqConnect(client) {
  var deferred = Q.defer();
  client.connect(function(sessionId) {
    deferred.resolve(sessionId);
  }).on('error', function(err) {
    deferred.reject(new Error(err));
  });
  return deferred.promise;
}

function mongodbConnect(MongoClient, url) {
  var deferred = Q.defer();
  MongoClient.connect(url, function(err, db) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(db);
    }
  });
  return deferred.promise;
}

activemqConnect(client).then(function(sessionId) {
  console.log("Connected to activemq");

  client.subscribe(destination, function(body, headers) {
    var metrics = JSON.parse(body);
    console.log('Message received:', metrics);
  });
});

mongodbConnect(MongoClient, url).then(function(db) {
  console.log("Connected to mongodb");

  db.close();
}, function(error) {
  console.log("Error when connecting to mongodb", error);
});