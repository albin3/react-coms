'use strict';

/**
 * rule: {type: 'grep', mustBe: /^$/, message: '正则限制提示'}
 * rule: {type: 'minLength', mustBe: 3, message: '最小长度限制提示'}
 * rule: {type: 'maxLength', mustBe: 9, message: '最大长度限制提示'}
 * rule: {type: 'min', mustBe: 3, message: '最小值限制提示'}
 * rule: {type: 'max', mustBe: 9, message: '最大值限制提示'}
 * rule: {type: 'udf', mustBe: function () {}, message: 'udf限制提示'}
 */

let React = require('react');
let Input = require('./base-input');
let WARNING_COLOR = '#f67823';
let NORMAL_COLOR = '#ccc';

require('./validation-input.less');
let ValidationInput = React.createClass({

  getInitialState: function () {
    return {
      color: NORMAL_COLOR,
      message: ''
    };
  },

  grepValid: function (value, mustBe) {
    return mustBe.test(value);
  },

  minLengthValid: function (value, mustBe) {
    return value.length >= mustBe;
  },

  maxLengthValid: function (value, mustBe) {
    return value.length <= mustBe;
  },

  minValid: function (value, mustBe) {
    return value >= mustBe;
  },

  maxValid: function (value, mustBe) {
    return value <= mustBe;
  },

  udfValid: function (value, mustBe) {
    if (typeof mustBe !== 'function') return true;
    return mustBe.apply({}, value);
  },

  switchValidFunc: function (rule) {
    let validFunc = null;
    switch (rule.rule) {
      case 'grep':
        validFunc = this.grepValid;
        break;
      case 'minLength':
        validFunc = this.minLengthValid;
        break;
      case 'maxLength':
        validFunc = this.maxLengthValid;
        break;
      case 'min':
        validFunc = this.minValid;
        break;
      case 'max':
        validFunc = this.minValid;
        break;
      case 'udf':
        validFunc = this.udfValid;
      default:
        break;
    }
    if (!validFunc) return function () {return true};

    return validFunc;
  },

  // return: {color: NORMAL_COLOR, message: 'xxx'}
  valid: function (value) {
    let rules = this.props.rules;
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let validFunc = this.switchValidFunc(rule);
      if (!validFunc(value, rule.mustBe)) {
        return {status: 'warning', color: WARNING_COLOR, message: rule.message};
      }
    }

    return {status: 'normal', color: NORMAL_COLOR, message: ''};
  },

  onChange: function (e) {
    let onChange = this.props.onChange;
    let value = e.target.value;
    let validMsg = this.valid(value);

    if (typeof onChange === 'function') {
      onChange.call({}, e);
    }

    this.setState(validMsg);
  },

  onBlur: function (e) {
    let value = e.target.value;
    let validMsg = this.valid(value);

    if (typeof onBlur === 'function') {
      onBlur.call({}, e);
    }

    this.setState(validMsg);
  },

  parseLabel: function () {
    let label = [];
    if (this.props.label) {
      label.push(
        <label key="label">
          {this.props.label}
        </label>
      );
    }

    return label;
  },

  render: function () {
    let label = this.parseLabel();
    return (
      <div className="validation-input">
        { label }
        <Input onChange={this.onChange} onBlur={this.onBlur} style={{border: '1px solid ' + this.state.color || '#ccc'}} {...this.props}/>
        <span className="message" style={{color: this.state.color || '#ccc'}}>
          { this.state.message }
        </span>
        <div className="clear"></div>
      </div>
    );
  }
});

module.exports = ValidationInput;
