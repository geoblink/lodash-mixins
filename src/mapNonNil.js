var _ = require('lodash')

/**
 * Map returning only non-nil elements
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
module.exports = function mapNonNil (collection, iteratee) {
  return _.filter(_.map(collection, iteratee), isNotNil)

  function isNotNil (item) {
    return !_.isNil(item)
  }
}
