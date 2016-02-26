'use strict';

let BaseTable = require('./base-table')
let React = require('react');

let ConfigTable = React.createClass({
  propTypes: {
    data: React.PropTypes.objectOf({
      items: React.PropTypes.array.isRequired,
      page: React.PropTypes.objectOf({
        current: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]),
        total: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]),
        itemNumber: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ])
      })
    }),
    options: React.PropTypes.arrayOf({
      header: React.PropTypes.string.isRequired,
      itemKey: React.PropTypes.string.isRequired,
      displayDom: React.PropTypes.func
    })
  },

  parseOptions: function () {
    let options = this.props.options;
    let headers = [];
    let itemKeys = [];
    let displayDoms = [];

    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      headers.push(option.header);
      if (option.displayDom) {
        displayDoms.push(option.displayDom);
      } else {
        displayDoms.push(function (value) {
          return '' + value;
        });
      }
      itemKeys.push(option.itemKey);
    }

    return {
      headers: headers,
      itemKeys: itemKeys,
      displayDoms: displayDoms
    };
  },

  render: function () {
    let parsedOptions = this.parseOptions();
    // <th> header </th>
    let headers = parsedOptions.headers;
    // <td> data[itemKey] </td>
    let itemKeys = parsedOptions.itemKeys;
    // <td> displayDom(data[itemKey]) </td>
    let displayDoms = parsedOptions.displayDoms;

    // ths
    let ths = [];
    for (let i = 0; i < headers.length; i++) {
      ths.push(
        <th key={ headers[i] }>
          { headers[i] }
        </th>
      );
    }

    let items = this.props.data.items;
    // trs
    let trs = [];
    for (let i = 0; i < items.length; i ++) {
      let item = items[i];
      let tds = [];

      for (let j = 0; j < itemKeys.length; j++) {
        let itemKey = itemKeys[j];
        let itemData = item[itemKey];
        // 用户构造的Dom
        let valueDom = displayDoms[j](itemData);

        console.log(valueDom);
        // 在用户构造的Dom中找到onClick事件，并且bindvalue本身
        let tdDom = <td key={itemKey + i}>{ valueDom }</td>;
        tds.push(tdDom);
      }

      let tr = <tr key={'tr-' + i}>{ tds }</tr>
      trs.push(tr);
    }
    return (
      <table>
        <thead>
          <tr>
            { ths }
          </tr>
        </thead>
        <tbody>
          { trs }
        </tbody>
      </table>
    );
  }
});

module.exports = ConfigTable;
