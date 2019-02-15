import _ from 'lodash'
import { ValueOf } from './types'

export default shortcuttedReduce

function shortcuttedReduce<
  Collection extends object,
  CollectionKey extends keyof Collection,
  CollectionItem extends ValueOf<Collection>,
  Accumulator
> (
  collection: Collection,
  iteratee: (accum: Accumulator, item: CollectionItem, index: CollectionKey) => Accumulator,
  accumulator: Accumulator
): Accumulator

/**
 * Reduce which finish as soon as accumulator changes.
 *
 * @param collection Collection to be reduced.
 * @param iteratee Function that will be called in each iteration.
 * It'll receive as parameters the accumulator, the value and the index.
 * @param accumulator Note that is **must** be a simple primitive.
 * @returns Accumulated value.
 */
function shortcuttedReduce<
  CollectionItem,
  Collection extends ArrayLike<CollectionItem>,
  CollectionKey extends keyof Collection,
  Accumulator
> (
  collection: Collection,
  iteratee: (accum: Accumulator, item: CollectionItem, index: CollectionKey) => Accumulator,
  accumulator: Accumulator
): Accumulator {
  if (_.isObject(accumulator)) {
    throw new Error('Only simple primitives (boolean, numbers, strings...) are allowed')
  }

  if (_.isArray(collection)) {
    return reduceArrayCollection()
  }

  if (_.isObject(collection)) {
    return reduceObjectCollection()
  }

  throw new Error('Currently only arrays and objects are supported')

  function reduceArrayCollection () {
    for (let index = 0; index < collection.length; index++) {
      const oldAccumulator = accumulator
      accumulator = iteratee(accumulator, collection[index], index as CollectionKey)

      if (accumulator !== oldAccumulator) return accumulator
    }

    return accumulator
  }

  function reduceObjectCollection () {
    for (const key in collection) {
      if (!collection.hasOwnProperty(key)) continue

      const oldAccumulator = accumulator
      accumulator = iteratee(accumulator, collection[key], key as any as CollectionKey)

      if (accumulator !== oldAccumulator) return accumulator
    }

    return accumulator
  }
}
