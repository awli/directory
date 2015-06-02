var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

var io = require('socket.io-client');
var socket;

// check if we're in node
if (typeof window != 'undefined') {
  socket = io();
}

module.exports = {
  queryPerson: function (inputString) {
    socket.emit('query', {query: inputString}, function (results) {
      AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_RESULTS,
        results: results
      });
    });
  }
}
