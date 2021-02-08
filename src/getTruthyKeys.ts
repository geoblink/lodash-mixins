import * as _ from 'lodash'

export default getTruthyKeys

/**
 * Gets the keys associated with truthy values in given collection.
 *
 * @param collection Collection to iterate over.
 * @param parseKeyFunction Function invoked per iteration. This
 * function takes as parameter a key of a truthy value. The value it returns
 * will be used in resulting list.
 * @returns New list with just the keys of truthy entries.
 */
function getTruthyKeys<T extends object, TResult>(
  collection: T | null | undefined,
  parseKeyFunction?: (key: string) => TResult
): (string | TResult)[] {
  const isFunction = _.isFunction(parseKeyFunction)

  return _.reduce(collection, function (acc: (string | TResult)[], value, key) {
    if (value) {
      const parsedKey = parseKeyFunction && isFunction ? parseKeyFunction(key) : key
      acc.push(parsedKey)
    }
    return acc
  }, [])
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Gets the keys associated with truthy values in given collection.
     *
     * @param collection Collection to iterate over.
     * @param parseKeyFunction Function invoked per iteration. This
     * function takes as parameter a key of a truthy value. The value it returns
     * will be used in resulting list. Note that if this function returns a falsy
     * value value, the key won't be present in resulting collection.
     * @returns New list with just the keys of truthy entries, for which
     * `parseKeyFunction` returned a truthy value.
     */
    getTruthyKeys<T extends object, TResult>(
      collection: T | null | undefined,
      parseKeyFunction?: (key: string) => TResult
    ): (string | TResult)[]
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.getTruthyKeys
     */
    getTruthyKeys<T extends object, TResult>(
      this: LoDashImplicitWrapper<T[] | null | undefined>,
      parseKeyFunction?: (key: string) => TResult
    ): LoDashImplicitWrapper<(string | TResult)[]>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.getTruthyKeys
     */
    getTruthyKeys<T extends object, TResult>(
      this: LoDashExplicitWrapper<T[] | null | undefined>,
      parseKeyFunction?: (key: string) => TResult
    ): LoDashExplicitWrapper<(string | TResult)[]>
  }
}
