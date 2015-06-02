elasticsearch = require('elasticsearch');

module.exports = function (server, io) {

  // Setup the Elastic Search Host
  esHost = process.env.BONSAI_URL || 'localhost:9200'
  var esClient = new elasticsearch.Client({
    host: esHost
  })

  // Ensure that the index exists
  esClient.indices.exists({index: 'directory'}).then(
    function (exists) {
      if (!exists) {
        esClient.indices.create({index: 'directory'})
      }
      esClient.index({
        index: 'directory',
        type: 'person',
        id: 'oski',
        body: {
          name: 'Oski Bear',
          phone: '510-555-1234'
        }
      })
    });

  // function for lookup up the results of a query.
  function lookupRecord(query, callback) {
    if (query == '') {
      callback([]);
    } else {
      esClient.search({index: 'directory', q: query},
        function (error, response) {
          var hits = response.hits.hits;
          var processedHits = hits.map(function (x) { return x._source });
          callback(processedHits);
        });
    }
  }

  // when we get a connection query on socket.io
  // return the results
  io.on('connection', function (socket) {
    socket.on('query', function (data, callback) {
      lookupRecord(data.query, callback);
    })
  });


}
