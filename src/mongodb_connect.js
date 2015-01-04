var Q = require('q');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(mongo_config) {
  var connect = Q.denodeify(MongoClient.connect);
  return connect(mongo_config.url);
}
