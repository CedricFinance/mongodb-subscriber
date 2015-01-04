var Q = require('q');
var config = require('./config');

function activemqConnect(mq_config) {
  var Stomp = require('stomp-client');
  var client = new Stomp(mq_config.alias, mq_config.port, mq_config.user, mq_config.pass);

  var deferred = Q.defer();
  client.connect(function(sessionId) {
    deferred.resolve(client);
  }).on('error', function(err) {
    deferred.reject(new Error(err));
  });
  return deferred.promise;
}

function mongodbConnect(mongo_config) {
  var MongoClient = require('mongodb').MongoClient;
  var connect = Q.denodeify(MongoClient.connect);
  return connect(mongo_config.url);
}

Q.all([activemqConnect(config.activemq), mongodbConnect(config.mongo)]).spread(function(client, db) {
  console.log("Connected to activemq and mongodb");

  var collection = db.collection("raw_metrics");

  client.subscribe(config.activemq.destination, function(body, headers) {
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

