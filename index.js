var fromPairsMap = require('./src/fromPairsMap')
var getTruthyKeys = require('./src/getTruthyKeys')
var hasTruthyValues = require('./src/hasTruthyValues')
var mapNonNil = require('./src/mapNonNil')
var mergeForEach = require('./src/mergeForEach')
var mGet = require('./src/mGet')
var shortcuttedReduce = require('./src/shortcuttedReduce')

/**
 * Extends Lodash with additional functionality.
 *
 * @param {lodash} _ Object Lodash instance to be extended
 */
module.exports = function (_) {
  _.mixin({
    fromPairsMap: fromPairsMap,
    getTruthyKeys: getTruthyKeys,
    hasTruthyValues: hasTruthyValues,
    mapNonNil: mapNonNil,
    mergeForEach: mergeForEach,
    mGet: mGet,
    shortcuttedReduce: shortcuttedReduce
  })

  return _
}
