'use strict';

require('./base-form.less')
let React = require('react');

let Form = React.createClass({
  valid: function () {
  },
  beforeSubmit: function () {
  },
  render: function () {
    return (
      <form {...this.props} className="base-form">
        {this.props.children}
      </form>
    );
  }
});

module.exports = Form;
