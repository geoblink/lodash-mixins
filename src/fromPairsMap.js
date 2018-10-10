var _ = require('lodash')

/**
 * Applies fromPairs to the result of mapping the given iteratee to the given array.
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
module.exports = function fromPairsMap (collection, iteratee) {
  return _.fromPairs(_.map(collection, iteratee))
}
