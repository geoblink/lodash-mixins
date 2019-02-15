import _ from 'lodash'

export default fromPairsMap

/**
 * Applies `fromPairs` to the result of mapping given `iteratee` to given
 * collection.
 *
 * @param collection Collection to iterate over
 * @param iteratee Function invoked per iteration
 * @returns New object
 */
export function fromPairsMap<T> (
  collection: T[] | null | undefined,
  iteratee: _.ArrayIterator<T, any>
): _.Dictionary<T> {
  return _.fromPairs(_.map(collection, iteratee))
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Applies `fromPairs` to the result of mapping given `iteratee` to given
     * collection.
     *
     * @param collection The collection to iterate over.
     * @param iteratee The function invoked per iteration.
     * @return Returns the new object.
     */
    fromPairsMap<T, TResult>(
      collection: T[] | null | undefined,
      iteratee: _.ArrayIterator<T, TResult>
    ): _.Dictionary<TResult>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      collection: _.List<T> | null | undefined,
      iteratee: _.ListIterator<T, TResult>
    ): _.Dictionary<TResult>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined
    ): _.Dictionary<T>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      collection: T | null | undefined,
      iteratee: _.ObjectIterator<T, TResult>
    ): _.Dictionary<TResult>

    /** @see _.fromPairsMap */
    fromPairsMap<T, K extends keyof T>(
      collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined,
      iteratee: K
    ): _.Dictionary<T[K]>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined,
      iteratee?: string
    ): _.Dictionary<any>

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined,
      iteratee?: object
    ): boolean[]
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      iteratee: _.ArrayIterator<T, TResult>
    ): LoDashImplicitWrapper<_.Dictionary<TResult>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashImplicitWrapper<_.List<T> | null | undefined>,
      iteratee: _.ListIterator<T, TResult>
    ): LoDashImplicitWrapper<_.Dictionary<TResult>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(this: LoDashImplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>): LoDashImplicitWrapper<T[]>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      this: LoDashImplicitWrapper<T | null | undefined>,
      iteratee: _.ObjectIterator<T, TResult>
    ): LoDashImplicitWrapper<_.Dictionary<TResult>>;

    /** @see _.fromPairsMap */
    fromPairsMap<T, K extends keyof T>(
      this: LoDashImplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee: K
    ): LoDashImplicitWrapper<_.Dictionary<T[K]>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      this: LoDashImplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee?: string
    ): LoDashImplicitWrapper<_.Dictionary<any>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      this: LoDashImplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee?: object
    ): LoDashImplicitWrapper<boolean[]>;
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      iteratee: _.ArrayIterator<T, TResult>
    ): LoDashExplicitWrapper<_.Dictionary<TResult>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T, TResult>(
      this: LoDashExplicitWrapper<_.List<T> | null | undefined>,
      iteratee: _.ListIterator<T, TResult>
    ): LoDashExplicitWrapper<_.Dictionary<TResult>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(this: LoDashExplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>): LoDashExplicitWrapper<T[]>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T extends object, TResult>(
      this: LoDashExplicitWrapper<T | null | undefined>,
      iteratee: _.ObjectIterator<T, TResult>
    ): LoDashExplicitWrapper<_.Dictionary<TResult>>;

    /** @see _.fromPairsMap */
    fromPairsMap<T, K extends keyof T>(
      this: LoDashExplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee: K
    ): LoDashExplicitWrapper<_.Dictionary<T[K]>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      this: LoDashExplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee?: string
    ): LoDashExplicitWrapper<_.Dictionary<any>>;

    /**
     * @see _.fromPairsMap
     */
    fromPairsMap<T>(
      this: LoDashExplicitWrapper<_.List<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined>,
      iteratee?: object
    ): LoDashExplicitWrapper<boolean[]>;
  }
}
