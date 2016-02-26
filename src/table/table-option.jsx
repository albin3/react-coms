'use strict';

require('./table-option.less');
var React = require('react');

var TableOption = React.createClass({
  render: function () {
    return (
      <a className="table-option" onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = TableOption;
