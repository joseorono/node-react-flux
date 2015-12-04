var MyDispatcher = require ('../dispatcher/MyDispatcher');
var MyConstants  = require ('../constants/MyConstants');
var ObjectAssign  = require ('react/lib/Object.assign');
var EventEmitter  = require ('events').EventEmitter;

/*
 *  Our store is created; a place where our data will live,
 *  some setter functions, a MyStore object with a getName method, a
 *  addChangeListener and removeChangeListener function, and we register
 *  our callbacks with the Dispatcher.
 */

var CHANGE_EVENT = 'change';

var _store = {
  name : 'World',
  randomNumber : 0
};

var setName  = function (data) {
  if (data.name) {
    _store.name = data.name;
  } else {
    _store.name = "World";
  }
};

var setRandomNumber  = function (data) {
  if (data.randomNumber) {
    _store.randomNumber = data.randomNumber;
  } else {
    _store.randomNumber = 0;
  }
};

var MyStore = ObjectAssign ({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on (CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener (CHANGE_EVENT, callback);
  },
  getName: function () {
    return _store.name;
  },
  getRandomNumber: function () {
    return _store.randomNumber;
  }
});

MyDispatcher.register (function (payload) {
  var action = payload.action;

  /*
   *  This switch statement catches the MyConstants.SET_NAME conditional,
   *  emitted from the Dispatcher, and setName is invoked which sets the
   *  new name onto our data in the Store.
   */
  switch (action.actionType) {
    case MyConstants.SET_NAME:
      setName (action.data);
      MyStore.emit (CHANGE_EVENT);
      break;
    case MyConstants.SET_RANDOMNUMBER:
      setRandomNumber (action.data);

      /*
       *  MyStore emits a “CHANGE” event, invoking the callback function
       *  which was passed to it which was originally _onChange in our component.
       */
      MyStore.emit (CHANGE_EVENT);
      break;

    default:
      console.info ("Action not handled.");
      return true;
  }
});

module.exports = MyStore;
