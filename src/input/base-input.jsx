'use strict';

let React = require('react');

let Input = React.createClass({
  render: function () {
    return <input {...this.props} />;
  }
});

module.exports = Input;
