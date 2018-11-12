const _ = require('lodash')
const mapNonNil = require('../src/mapNonNil')
module.exports = fromPairsMapNonNil

/**
 * Applies `fromPairs` to the result of mapping and filtering `nil` values given `iteratee` to given
 * collection.
 *
 * @param {Array|Object} collection Collection to iterate over
 * @param {Function} iteratee Function invoked per iteration
 * @returns {Object} New object
 */
function fromPairsMapNonNil (collection, iteratee) {
  return _.fromPairs(mapNonNil(collection, iteratee))
}
