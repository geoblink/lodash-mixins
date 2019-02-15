import fromPairsMap from './fromPairsMap'
import getTruthyKeys from './getTruthyKeys'
import hasTruthyValues from './hasTruthyValues'
import mapNonNil from './mapNonNil'
import mergeForEach from './mergeForEach'
import mGet from './mGet'
import shortcuttedReduce from './shortcuttedReduce'
import { LoDashStatic } from 'lodash'

/**
 * Extends Lodash with additional functionality.
 *
 * @param _ Lodash instance to be extended
 */
export default function (_: LoDashStatic) {
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
