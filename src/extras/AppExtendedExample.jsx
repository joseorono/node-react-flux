var React = require ('react');
var ReactDOM = require ('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

/*
 *  -- Flux : Stores & Actions
 *  Require your stores and actions here.
 *  NOTE: Javascript (foo.js) files DON'T require extensions upon require.
 */
var MyStore = require ('./stores/MyStore');

/*
 *  -- React : Child Components
 *  Require your React components here.
 *  NOTE: React files (foo.jsx) files DO require extensions upon require.
 */
var MyForm = require ('./components/MyForm.jsx');
var RandomNumberButton = require ('./components/RandomNumberButton.jsx');
var ReactThreeTestComponent = require ('./components/ReactThreeTestComponent.jsx');

var App = React.createClass ({
  getInitialState: function () {
    return {
      name : MyStore.getName (),
      randomNumber : 0
    };
  },
  /*
   *  When our component mounts, we pass _onChange to MyStore.addChangeListener
   *  which makes it so whenever the Store hears the “CHANGE” event, it will run _onChange
   *  which will refetch the data from the store using MyStore.getName() and update its
   *  own state with the data returned from getName().
   */
  componentDidMount: function () {
    MyStore.addChangeListener (this._onChange);
    jsxtransformstart();
  },
  componentWillUnmount: function () {
    MyStore.removeChangeListener (this._onChange);
  },
  /*
   *  _onChange will fire when our MyStore object emits a "CHANGE" event,
   *  which uses MyStore.getName() in order to update its own internal state,
   *  finishing the Flux full circle.
   */
  _onChange: function () {
    this.setState ({
      name: MyStore.getName (),
      randomNumber: MyStore.getRandomNumber ()
    });
  },
  render: function () {
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      <div>
        <h2> Hello, {this.state.name}! </h2>
        <MyForm />
        <RandomNumberButton/>
        <div id="ReactThreeTestComponent"></div>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
});

/*
 *  Render your React UI on the page.
 */
ReactDOM.render (
  <App />,
  document.getElementById('myreactspace')
);
