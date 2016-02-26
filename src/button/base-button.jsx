'use strict';

let React = require('react');

require('./base-button.less');
let BaseButton = React.createClass({
  render: function () {
    return (
      <button {...this.props} className="base-button">
        {this.props.children}
      </button>
    );
  }
});

module.exports = BaseButton;
