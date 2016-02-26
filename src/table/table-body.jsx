'use strict';

require('./table-body.less');
var React = require('react');

var TableBody = React.createClass({
  render: function () {
    return (
      <tbody className="base-table-body">
        {this.props.children}
      </tbody>
    );
  }
});

module.exports = TableBody;
