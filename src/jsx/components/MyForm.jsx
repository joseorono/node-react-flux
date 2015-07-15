
/*
 *  Everything Flux --
 *  -- require your stores and actions leveraged here.
 *  -- NOTE: Javascript (foo.js) files DON'T require extensions upon require.
 */
var AppActions = require ('../actions/AppActions');
// var MyStore = require ('./stores/MyStore');

var MyForm = React.createClass ({
  /*
   *  Custom handleSubmit
   */
  handleNameChange: function (event) {
    AppActions.setName ({
      name: React.findDOMNode (this.refs.name).value.trim ()
    });
    event.preventDefault ();
  },

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
