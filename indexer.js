// used to index files
// execute in same directory as your people.csv
// need to run npm install csv-parse
var elasticsearch = require('elasticsearch');
esHost = process.env.BONSAI_URL || 'localhost:9200'
console.log('going to index at '+ esHost);
var client = new elasticsearch.Client({
    host: esHost
})

function addToIndex(name, phone) {
    client.index({
        index: 'directory',
        type: 'person',
        body: {
            name: name,
            phone: phone
        }
    })
}

var parse = require('csv-parse');
var fs = require('fs');
var stream = fs.createReadStream('./people.csv');

var parser = parse({delimiter: ','}, function(err, data){
    d = data;
    data.map(function (person) {
        addToIndex(person[0], person[1]);
    })
});

stream.pipe(parser);