
/*
 *  Everything Flux --
 *  -- require your stores and actions here
 *  -- NOTE: Javascript (foo.js) files DON'T require extensions upon require
 */
// var AppActions = require ('./actions/AppActions');
var MyStore = require ('./stores/MyStore');

/*
 *  Everything Components --
 *  -- require your React components here
 *  -- NOTE: React files (foo.jsx) files DO require extensions upon require
 */
var MyForm = require ('./components/MyForm.jsx');

/*
 *  React : Main React Component
 */
var App = React.createClass ({
  getInitialState: function () {
    return {
      name : MyStore.getName ()
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
      name: MyStore.getName ()
    });
  },
  render: function () {
    return (
      <div>
        <h2> Hello, {this.state.name}! </h2>
        <MyForm />
      </div>
    );
  }
});

React.render (
  <App />,
  document.getElementById ('app-content')
);
