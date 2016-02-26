'use strict'

module.exports = function (com) {
  try {
    return com.type.displayName;
  } catch (e) {
    return null;
  };
}
