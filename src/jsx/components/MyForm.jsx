
/*
 *  -- Flux : Stores & Actions
 *  Require your stores and actions here.
 *  NOTE: Javascript (foo.js) files DON'T require extensions upon require.
 */
var MyActions = require ('../actions/MyActions');

var MyForm = React.createClass ({
  /*
   *  handleNameChange runs and invokes the MyActions.setName method passing it the new name to set.
   */
  handleNameChange: function (event) {
    MyActions.setName ({
      name: React.findDOMNode (this.refs.name).value.trim ()
    });
    event.preventDefault ();
  },
 /*
  *  A user clicks “Submit” wanting to set his name on the page header,
  *  which invokes a method on this component which we’ll call handleNameChange.
  */
  render: function () {
    return (
      <form className="myForm" onSubmit={this.handleNameChange}>
        <input type="text" placeholder="What's your name?" ref="name" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MyForm;
