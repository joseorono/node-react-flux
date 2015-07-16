
var MyDispatcher = require ('../dispatcher/MyDispatcher');
var MyConstants  = require ('../constants/MyConstants');

var MyActions = {
  setName: function (object) {
    MyDispatcher.handleAction ({
      actionType: MyConstants.SET_NAME,
      data: object
    });
  },
};

module.exports = MyActions;
