'use strict';

module.exports = function (com) {
  try {
    return com.props.children;
  } catch (e) {
    return null;
  }
};
