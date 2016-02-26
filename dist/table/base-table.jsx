'use strict';

require('./table.less');
let React = require('react');
let TableHeader = require('./table-header');
let findChildren = require('../common/find-children');
let getComType = require('../common/get-com-type');
let getProperty = require('../common/get-property');

let BaseTable = React.createClass({

  headers: [],
  checkHeader: function () {
    let children = findChildren(this);
    if (children.length < 1) return null;

    let firstChild = children[0];
    if (!firstChild) return null;
    if (firstChild.type.displayName !== 'TableHeader') return null;

    let tableHeader = firstChild;
    let tr = findChildren(tableHeader);
    if (!tr) return null;
    let ths = findChildren(tr);

    let headers = [];
    for (let i = 0; i < ths.length; i++) {
      headers.push(ths[i].props);
    }
    this.headers = headers;

    return headers;
  },

  checkBody: function (headers) {
    let children = findChildren(this);
    let tableBody = null;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (getComType(child) === 'TableBody') {
        tableBody = child;
        break;
      }
    }
    if (!tableBody) return null;

    let rows = getProperty(tableBody, 'rows');
  },

  render: function () {
    let headers = this.checkHeader();
    this.checkBody(headers);
    return (
      <table className="base-table">
        {this.props.children}
      </table>
    );
  }
});

module.exports = BaseTable;
