
var AppDispatcher = require ('../dispatcher/AppDispatcher');
var AppConstants  = require ('../constants/AppConstants');
var ObjectAssign  = require ('react/lib/Object.assign');
var EventEmitter  = require ('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  name : 'World'
};

var setName  = function (data) {
  _store.name = data.name;
};

var MyStore = ObjectAssign ({}, EventEmitter.prototype, {
  addChangeListener: function (callback){
    this.on (CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener (CHANGE_EVENT, callback);
  },
  getName: function () {
    return _store.name;
  }
});

AppDispatcher.register (function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.SET_NAME:
      setName (action.data);
      MyStore.emit (CHANGE_EVENT);
      break;

    default:
      console.info ("Action not handled.");
      return true;
  }
});

module.exports = MyStore;
