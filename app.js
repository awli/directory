var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var Person = mongoose.model('Person', {
    name : String,
    email : String,
    number : String
});


var stuff = require('./deploy')(app);
var server = stuff.server;
var io = stuff.io;
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
                esClient.index({
                    index: 'directory',
                    type: 'person',
                    body: {
                        name: 'Oski Bear',
                        phone: '510-555-1234'
                    }
                })
            }
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
    esClient.search({index: 'directory', q: query},
        function (error, response) {
            var hits = response.hits.hits;
            var processedHits = hits.map(function (x) { return x._source });
            callback(processedHits);
        });
}

