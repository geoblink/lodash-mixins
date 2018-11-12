const fromPairsMap = require('./fromPairsMap')
const fromPairsMapNonNil = require('./fromPairsMapNonNil')
const getTruthyKeys = require('./getTruthyKeys')
const hasTruthyValues = require('./hasTruthyValues')
const mapNonNil = require('./mapNonNil')
const mergeForEach = require('./mergeForEach')
const mGet = require('./mGet')
const shortcuttedReduce = require('./shortcuttedReduce')

/**
 * Extends Lodash with additional functionality.
 *
 * @param {lodash} _ Object Lodash instance to be extended
 */
module.exports = function (_) {
  _.mixin({
    fromPairsMap: fromPairsMap,
    fromPairsMapNonNil: fromPairsMapNonNil,
    getTruthyKeys: getTruthyKeys,
    hasTruthyValues: hasTruthyValues,
    mapNonNil: mapNonNil,
    mergeForEach: mergeForEach,
    mGet: mGet,
    shortcuttedReduce: shortcuttedReduce
  })

  return _
}
