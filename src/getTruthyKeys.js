var _ = require('lodash')

/**
 * Gets the truthy values of the collection.
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} parseKeyFunction The function invoked per iteration.
 * @returns {Object} Returns the new filtered collection.
 */
module.exports = function getTruthyKeys (collection, parseKeyFunction) {
  var isFunction = _.isFunction(parseKeyFunction)
  return _.filter(_.map(collection, function (value, key) {
    if (value) {
      return isFunction ? parseKeyFunction(key) : key
    }
  }))
}
