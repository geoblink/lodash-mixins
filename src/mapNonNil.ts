import * as _ from 'lodash'

export default mapNonNil

/**
 * Map function returning only non-nil elements.
 *
 * @param collection Collection to iterate over.
 * @param iteratee Function invoked per iteration.
 * @returns New mapped array.
 */
function mapNonNil<
  CollectionItem extends any,
  Collection extends (
    ArrayLike<CollectionItem | null | undefined> |
    _.Dictionary<CollectionItem | null | undefined>
  ),
  ResultValue
> (
  collection: Collection,
  iteratee: _.ObjectIterator<CollectionItem, ResultValue | null | undefined>
) {
  return _.filter(_.map(collection, iteratee), isNotNil)

  function isNotNil (item: CollectionItem) {
    return !_.isNil(item)
  }
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Map function returning only non-nil elements.
     *
     * @param collection Collection to iterate over.
     * @param iteratee Function invoked per iteration.
     * @returns New mapped array.
     */
    mapNonNil<T, TResult>(
      collection: T[] | null | undefined,
      iteratee: ArrayIterator<T, TResult | null | undefined>
    ): TResult[];

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T, TResult>(
      collection: List<T> | null | undefined,
      iteratee: ListIterator<T, TResult | null | undefined>
    ): TResult[];

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined
    ): T[];

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T extends object, TResult>(
      collection: T | null | undefined,
      iteratee: ObjectIterator<T, TResult | null | undefined>
    ): TResult[];

    /** @see _.mapNonNil */
    mapNonNil<T, K extends keyof T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined,
      iteratee: K
    ): Array<T[K]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined,
      iteratee?: string
    ): any[];

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      collection: List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined,
      iteratee?: object
    ): boolean[];
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.mapNonNil
     */
    mapNonNil<T, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, TResult | null | undefined>
    ): LoDashImplicitWrapper<TResult[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T, TResult>(
      this: LoDashImplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, TResult | null | undefined>
    ): LoDashImplicitWrapper<TResult[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>
    ): LoDashImplicitWrapper<T[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T extends object, TResult>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, TResult | null | undefined>
    ): LoDashImplicitWrapper<TResult[]>;

    /** @see _.mapNonNil */
    mapNonNil<T, K extends keyof T>(
      this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee: K
    ): LoDashImplicitWrapper<Array<T[K]>>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee?: string
    ): LoDashImplicitWrapper<any[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashImplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee?: object
    ): LoDashImplicitWrapper<boolean[]>;
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.mapNonNil
     */
    mapNonNil<T, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      iteratee: ArrayIterator<T, TResult | null | undefined>
    ): LoDashExplicitWrapper<TResult[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T, TResult>(
      this: LoDashExplicitWrapper<List<T> | null | undefined>,
      iteratee: ListIterator<T, TResult | null | undefined>
    ): LoDashExplicitWrapper<TResult[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>
    ): LoDashExplicitWrapper<T[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T extends object, TResult>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      iteratee: ObjectIterator<T, TResult | null | undefined>
    ): LoDashExplicitWrapper<TResult[]>;

    /** @see _.mapNonNil */
    mapNonNil<T, K extends keyof T>(
      this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee: K
    ): LoDashExplicitWrapper<Array<T[K]>>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee?: string
    ): LoDashExplicitWrapper<any[]>;

    /**
     * @see _.mapNonNil
     */
    mapNonNil<T>(
      this: LoDashExplicitWrapper<List<T> | Dictionary<T> | NumericDictionary<T> | null | undefined>,
      iteratee?: object
    ): LoDashExplicitWrapper<boolean[]>;
  }
}
