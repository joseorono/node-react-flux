
var MyDispatcher = require ('../dispatcher/MyDispatcher');
var MyConstants  = require ('../constants/MyConstants');

var MyActions = {
  setName: function (object) {

    /*
     *  Regarding REST or Ajax calls
     *
     *  Think of how data travels in a Flux app; the pattern remains the same
     *  with REST or Ajax calls. Your action makes a request, gets the data,
     *  then dispatches the dispatcher which triggers the store; data would be passed
     *  from the Action handler to the Dispatcher and then finally to the store where
     *  it would be updated and emit the change event.
     *
     *  NOTE: It is best practice to use some sort of Promise library.
     */

    MyDispatcher.handleAction ({
      actionType: MyConstants.SET_NAME,
      data: object
    });
  },
};

module.exports = MyActions;
