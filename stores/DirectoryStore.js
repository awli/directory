var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign')

var results = [];

var DirectoryStore = assign({}, EventEmitter.prototype, {
  getResults: function () {
    return results;
  }
})

AppDispatcher.register(function (action) {
  var text;
  switch (action.type) {
    case Constants.ActionTypes.UPDATE_RESULTS:
      results = action.results;
      DirectoryStore.emit('change');
  }
})

module.exports = DirectoryStore;
