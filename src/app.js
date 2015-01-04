var Q = require('q');
var config = require('./config');
var activemq_connect = require('./activemq_connect');
var mongodb_connect = require('./mongodb_connect');

Q.all([activemq_connect(config.activemq), mongodb_connect(config.mongo)]).spread(function(client, db) {
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

