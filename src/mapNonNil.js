var _ = require('lodash')

module.exports = mapNonNil

/**
 * Map function returning only non-nil elements.
 *
 * @param {Array|Object} collection Collection to iterate over.
 * @param {Function} iteratee Function invoked per iteration.
 * @returns {Array} New mapped array.
 */
function mapNonNil (collection, iteratee) {
  return _.filter(_.map(collection, iteratee), isNotNil)

  function isNotNil (item) {
    return !_.isNil(item)
  }
}
