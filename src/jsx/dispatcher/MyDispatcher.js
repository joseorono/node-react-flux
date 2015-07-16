
/*
 *  Dispatcher
 */

var Dispatcher    = require ('flux').Dispatcher;
var MyDispatcher = new Dispatcher ();

/*
 *  The setName method on our AppActions object invokes AppDispatcher.handleAction
 *  passing it an object with the actionType of AppConstants.SET_NAME and the data
 *  of the original name item. It then emits AppConstants.SET_NAME and the callback
 *  we passed to AppDispatcher.register in our Store is invoked.
 */

MyDispatcher.handleAction = function (action) {
  this.dispatch ({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = MyDispatcher;
