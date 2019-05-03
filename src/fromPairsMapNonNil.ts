import * as _ from 'lodash'

import mapNonNil from './mapNonNil'

export default fromPairsMapNonNil

/**
 * Applies `fromPairs` to the result of mapping and filtering `nil` values given
 * `iteratee` to given collection.
 *
 * @param collection Collection to iterate over
 * @param iteratee Function invoked per iteration
 * @returns New object
 */
export function fromPairsMapNonNil <
  CollectionItem extends any,
  Collection extends ArrayLike<CollectionItem | null | undefined>,
  PropertyName,
  TResult
> (
  collection: Collection,
  iteratee: _.ObjectIterator<CollectionItem, [PropertyName, TResult] | null | undefined>
) {
  return _.fromPairs(mapNonNil(collection, iteratee) as any) // Cast to any since this typecheck is user's responsibility
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Applies `fromPairs` to the result of mapping and filtering `nil` values
     * given `iteratee` to given collection.
     *
     * @param collection Collection to iterate over
     * @param iteratee Function invoked per iteration
     * @returns New object
     */
    fromPairsMapNonNil<T, PropertyName, TResult>(
      collection: T[] | null | undefined,
      iteratee: ArrayIterator<T, [PropertyName, TResult] | null | undefined>
    ): Dictionary<TResult>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T, TResult>(
      collection: List<T> | null | undefined,
      iteratee: ListIterator<T, [PropertyName, TResult] | null | undefined>
    ): Dictionary<TResult>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined
    ): Dictionary<T>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T extends object, TResult>(
      collection: T | null | undefined,
      iteratee: ObjectIterator<T, [PropertyName, TResult] | null | undefined>
    ): Dictionary<TResult>
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashImplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T, TResult>(
      this: LoDashImplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashImplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T>(this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>): LoDashImplicitWrapper<Dictionary<T>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T extends object, TResult>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashImplicitWrapper<Dictionary<TResult>>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashExplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T, TResult>(
      this: LoDashExplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashExplicitWrapper<Dictionary<TResult>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T>(this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>): LoDashExplicitWrapper<Dictionary<T>>

    /**
     * @see _.fromPairsMapNonNil
     */
    fromPairsMapNonNil<T extends object, TResult>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, [PropertyName, TResult] | null | undefined>
    ): LoDashExplicitWrapper<Dictionary<TResult>>
  }
}
