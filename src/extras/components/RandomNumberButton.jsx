var React = require ('react');
var MyStore = require ('../stores/MyStore');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
/*
 *  -- Flux : Stores & Actions
 *  Require your stores and actions here.
 *  NOTE: Javascript (foo.js) files DON'T require extensions upon require.
 */
 var MyActions = require ('../actions/MyActions');

 var RandomNumberButton = React.createClass ({
  _generateRandomNumber: function (event) {
    MyActions.setRandomNumber ({ randomNumber: Math.random()*100 });
    event.preventDefault ();
  },

  getInitialState: function () {
    return {
      randomNumber : 0
    };
  },

  componentDidMount: function () {
    MyStore.addChangeListener (this._onChange);
  },
  componentWillUnmount: function () {
    MyStore.removeChangeListener (this._onChange);
  },

_onChange: function () {
    this.setState ({
      randomNumber: MyStore.getRandomNumber ()
    });
  },

  render: function () {
    return (
      <div>
        <button onClick={this._generateRandomNumber}>Generate a random number</button>
        &nbsp;
          <h2 className="inlineDiv">Random Number: {this.state.randomNumber}</h2>
      </div>
    );
  }
});

 module.exports = RandomNumberButton;
