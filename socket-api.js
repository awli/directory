module.exports = function (server, io) {
  io.on('connection', function (socket) {
    socket.on('query', function (data, callback) {
      lookup(data.query, callback);
    })
  });

  function createIndexIfNonexistant() {
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
  }

  // conveninence housekeeping function
  function destroyIndex() {
    esClient.indices.delete({index: 'directory'})
  }

  esHost = process.env.BONSAI_URL || 'localhost:9200'
  var esClient = new elasticsearch.Client({
    host: esHost
  })
  createIndexIfNonexistant();

  // function for lookup up the results of a query.
  function lookup(query, callback) {
    if (query == '') {
      callback([]);
      return;
    }
    esClient.search({index: 'directory', q: query + '*'},
      function (error, response) {
        var hits = response.hits.hits;
        var processedHits = hits.map(function (x) { return x._source });
        callback(processedHits);
      });
  }


}
