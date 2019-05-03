import * as _ from 'lodash'

export default fromPairsMap

/**
 * Applies `fromPairs` to the result of mapping given `iteratee` to given
 * collection.
 *
 * @param collection Collection to iterate over
 * @param iteratee Function invoked per iteration
 * @returns New object
 */
export function fromPairsMap<T, PropertyName, TResult> (
  collection: T[] | null | undefined,
  iteratee: _.ArrayIterator<T, [PropertyName, TResult]>
): _.Dictionary<TResult> {
  return _.fromPairs(_.map(collection, iteratee))
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Applies `fromPairs` to the result of mapping given `iteratee` to given
     * collection.
     *
     * @param collection Collection to iterate over
     * @param iteratee Function invoked per iteration
     * @returns New object
     */
    fromPairsMap<T, PropertyName, TResult>(
      collection: T[] | null | undefined,
      iteratee: ArrayIterator<T, [PropertyName, TResult]>
    ): Dictionary<TResult>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      collection: List<T> | null | undefined,
      iteratee: ListIterator<T, [PropertyName, TResult]>
    ): Dictionary<TResult>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined
    ): Dictionary<T>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      collection: T | null | undefined,
      iteratee: ObjectIterator<T, [PropertyName, TResult]>
    ): Dictionary<TResult>
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, [PropertyName, TResult]>
    ): LoDashImplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashImplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, [PropertyName, TResult]>
    ): LoDashImplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>): LoDashImplicitWrapper<Dictionary<T>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, [PropertyName, TResult]>
    ): LoDashImplicitWrapper<Dictionary<TResult>>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, [PropertyName, TResult]>
    ): LoDashExplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashExplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, [PropertyName, TResult]>
    ): LoDashExplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>): LoDashExplicitWrapper<Dictionary<T>>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, [PropertyName, TResult]>
    ): LoDashExplicitWrapper<Dictionary<TResult>>
  }
}
