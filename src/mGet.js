var _ = require('lodash')

module.exports = mGet

/**
 * Returns multiple values of an object, defaulting missing ones to a common
 * default.
 *
 * @param {Object} object Object to be queried.
 * @param {string[]} arrayOfKeys Array with the paths of the properties to get.
 * @param {any} defaultValue The value returned for missing resolved values.
 * @return {Array} New array with values for given key paths or default one.
 */
function mGet (object, arrayOfKeys, defaultValue) {
  return _.map(arrayOfKeys, getValueOrDefault)

  function getValueOrDefault (key) {
    return _.get(object, key, defaultValue)
  }
}
