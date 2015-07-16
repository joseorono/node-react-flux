
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

/*
 *  -- React : Main Parent Component
 */
var App = React.createClass ({
  getInitialState: function () {
    return {
      name : MyStore.getName ()
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

/*
 *  Render your React UI on the page.
 */
React.render (
  <App />,
  document.getElementById ('app-content')
);
