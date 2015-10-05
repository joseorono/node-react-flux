var React = require ('react');

/*
 *  -- Flux : Stores & Actions
 *  Require your stores and actions here.
 *  NOTE: Javascript (foo.js) files DON'T require extensions upon require.
 */
var MyActions = require ('../actions/MyActions');

var MyForm = React.createClass ({
  _handleNameChange: function (event) {
    MyActions.setName ({ name: React.findDOMNode (this.refs.name).value.trim () });
    event.preventDefault ();
  },

  render: function () {
    return (
      <form className="myForm" onSubmit={this._handleNameChange}>
        <input type="text" placeholder="What's your name?" ref="name" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MyForm;
