var fromPairsMap = require('./fromPairsMap')
var fromPairsMapNonNil = require('./fromPairsMapNonNil')
var getTruthyKeys = require('./getTruthyKeys')
var hasTruthyValues = require('./hasTruthyValues')
var mapNonNil = require('./mapNonNil')
var mergeForEach = require('./mergeForEach')
var mGet = require('./mGet')
var shortcuttedReduce = require('./shortcuttedReduce')

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
