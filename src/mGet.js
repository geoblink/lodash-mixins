var _ = require('lodash')

/**
 * Multiple get.
 *
 * @param {Object} object The object to query.
 * @param {Array} arrayOfKeys Array with the paths of the properties to get.
 * @param {*} defaultValue The value returned for undefined resolved values.
 * @return {Array} Returns the new mapped array.
 */
module.exports = function mGet (object, arrayOfKeys, defaultValue) {
  return _.map(arrayOfKeys, function (key) { return _.get(object, key, defaultValue) })
}
