import * as _ from 'lodash'

export default getTruthyKeys

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
function getTruthyKeys<T extends object, TResult>(
  collection: T | null | undefined,
  parseKeyFunction?: (key: string) => TResult
): (string | TResult)[] {
  const isFunction = _.isFunction(parseKeyFunction)

  const mappedCollection = _.map(collection, function (value, key) {
    if (!value) return false
    return parseKeyFunction && isFunction ? parseKeyFunction(key) : key
  })

  return _.filter(mappedCollection) as (string | TResult)[] // Casting needed to remove `false`
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
