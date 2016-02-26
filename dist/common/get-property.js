'use strict';

module.exports = function (com, key) {
  try {
    return com.props[key];
  } catch (e) {
    return undefined;
  }
}
