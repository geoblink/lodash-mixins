var _ = require('lodash')

module.exports = fromPairsMap

/**
 * Applies `fromPairs` to the result of mapping given `iteratee` to given
 * collection.
 *
 * @param {Array|Object} collection Collection to iterate over
 * @param {Function} iteratee Function invoked per iteration
 * @returns {Object} New object
 */
function fromPairsMap (collection, iteratee) {
  return _.fromPairs(_.map(collection, iteratee))
}
