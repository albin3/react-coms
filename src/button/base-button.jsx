'use strict';

let React = require('react');

require('./base-button.less');
let BaseButton = React.createClass({
  render: function () {
    return (
      <button className="base-button" {...this.props}>
        {this.props.children}
      </button>
    );
  }
});

module.exports = BaseButton;
