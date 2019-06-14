import fromPairsMap from './fromPairsMap'
import fromPairsMapNonNil from './fromPairsMapNonNil'
import getTruthyKeys from './getTruthyKeys'
import hasTruthyValues from './hasTruthyValues'
import mapNonNil from './mapNonNil'
import mergeForEach from './mergeForEach'
import mergeJoinWith from './mergeJoinWith'
import mGet from './mGet'
import shortcuttedReduce from './shortcuttedReduce'
import sumMultipleFinite from './sumMultipleFinite'
import { LoDashStatic } from 'lodash'

/**
 * Extends Lodash with additional functionality.
 *
 * @param _ Lodash instance to be extended
 */
export default function (_: LoDashStatic) {
  _.mixin({
    fromPairsMap: fromPairsMap,
    fromPairsMapNonNil: fromPairsMapNonNil,
    getTruthyKeys: getTruthyKeys,
    hasTruthyValues: hasTruthyValues,
    mapNonNil: mapNonNil,
    mergeForEach: mergeForEach,
    mergeJoinWith: mergeJoinWith,
    mGet: mGet,
    shortcuttedReduce: shortcuttedReduce,
    sumMultipleFinite: sumMultipleFinite
  })

  return _
}

export {
  fromPairsMap,
  fromPairsMapNonNil,
  getTruthyKeys,
  hasTruthyValues,
  mapNonNil,
  mergeForEach,
  mergeJoinWith,
  mGet,
  shortcuttedReduce,
  sumMultipleFinite
}
