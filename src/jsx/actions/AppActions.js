
var AppDispatcher = require ('../dispatcher/AppDispatcher');
var AppConstants  = require ('../constants/AppConstants');

var AppActions = {
  setName: function (object) {
    AppDispatcher.handleAction ({
      actionType: AppConstants.SET_NAME,
      data: object
    });
  },
};

module.exports = AppActions;
