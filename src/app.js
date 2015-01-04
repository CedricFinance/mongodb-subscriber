var Stomp = require('stomp-client');
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var config = require('./config');

var client = new Stomp('mq', config.port, config.user, config.pass);

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

Q.all([activemqConnect(client), mongodbConnect(MongoClient, config.url)]).spread(function(sessionId, db) {
  console.log("Connected to activemq and mongodb");

  var collection = db.collection("raw_metrics");

  client.subscribe(config.destination, function(body, headers) {
    var metrics = JSON.parse(body);
    metrics.date = new Date(metrics.date);
    console.log('Message received:', metrics);

    collection.insert(metrics, function(err, result) {
      if (err) {
        throw err;
      }
    });
  });
}).done();

