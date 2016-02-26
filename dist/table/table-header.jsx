'use strict';

require('./table-header.less');
var React = require('react');

var TableHeader = React.createClass({
  render: function () {
    return (
      <thead className="base-table-header">
        {this.props.children}
      </thead>
    );
  }
});

module.exports = TableHeader;
