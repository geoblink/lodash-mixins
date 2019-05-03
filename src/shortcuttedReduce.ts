import * as _ from 'lodash'
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

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Reduce which finishes as soon as accumulator changes.
     *
     * @param collection Collection to be reduced.
     * @param iteratee Function that will be called in each iteration.
     * It'll receive as parameters the accumulator, the value and the index.
     * @param accumulator Note that is **must** be a simple primitive.
     * @returns Accumulated value.
     */
    shortcuttedReduce<T, TResult>(
      collection: T[] | null | undefined,
      callback: MemoListIterator<T, TResult, T[]>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T, TResult>(
      collection: List<T> | null | undefined,
      callback: MemoListIterator<T, TResult, List<T>>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object, TResult>(
      collection: T | null | undefined,
      callback: MemoObjectIterator<T[keyof T], TResult, T>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      collection: T[] | null | undefined,
      callback: MemoListIterator<T, T, T[]>
    ): T | undefined;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      collection: List<T> | null | undefined,
      callback: MemoListIterator<T, T, List<T>>
    ): T | undefined;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object>(
      collection: T | null | undefined,
      callback: MemoObjectIterator<T[keyof T], T[keyof T], T>
    ): T[keyof T] | undefined;
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      callback: MemoListIterator<T, TResult, T[]>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T, TResult>(
      this: LoDashImplicitWrapper<List<T> | null | undefined>,
      callback: MemoListIterator<T, TResult, List<T>>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object, TResult>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      callback: MemoObjectIterator<T[keyof T], TResult, T>,
      accumulator: TResult
    ): TResult;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      callback: MemoListIterator<T, T, T[]>
    ): T | undefined;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      this: LoDashImplicitWrapper<List<T> | null | undefined>,
      callback: MemoListIterator<T, T, List<T>>
    ): T | undefined;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      callback: MemoObjectIterator<T[keyof T], T[keyof T], T>
    ): T[keyof T] | undefined;
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      callback: MemoListIterator<T, TResult, T[]>,
      accumulator: TResult
    ): LoDashExplicitWrapper<TResult>;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T, TResult>(
      this: LoDashExplicitWrapper<List<T> | null | undefined>,
      callback: MemoListIterator<T, TResult, List<T>>,
      accumulator: TResult
    ): LoDashExplicitWrapper<TResult>;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object, TResult>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      callback: MemoObjectIterator<T[keyof T], TResult, T>,
      accumulator: TResult
    ): LoDashExplicitWrapper<TResult>;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      callback: MemoListIterator<T, T, T[]>
    ): LoDashExplicitWrapper<T | undefined>;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T>(
      this: LoDashExplicitWrapper<List<T> | null | undefined>,
      callback: MemoListIterator<T, T, List<T>>
    ): LoDashExplicitWrapper<T | undefined>;

    /**
     * @see _.shortcuttedReduce
     */
    shortcuttedReduce<T extends object>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      callback: MemoObjectIterator<T[keyof T], T[keyof T], T>
    ): LoDashExplicitWrapper<T[keyof T] | undefined>;
  }
}
