import shortcuttedReduce from './shortcuttedReduce'

export default hasTruthyValues

/**
 * Returns whether given collection has at least one truthy value for one of its
 * keys.
 *
 * This function stops traversing the collection as soon as it finds a truthy
 * value.
 *
 * @param collection Collection to iterate over.
 * @returns `true` if there's at least one value which is truthy.
 */
function hasTruthyValues<Collection extends object> (collection: Collection): boolean {
  return shortcuttedReduce(
    collection,
    (accum, value) => accum || !!value,
    false
  )
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Returns multiple values of an object, defaulting missing ones to a common
     * default.
     *
     * @param object Object to be queried.
     * @param arrayOfKeys Array with the paths of the properties to get.
     * @param defaultValue The value returned for missing resolved values.
     * @return New array with values for given key paths or default one.
     */
    hasTruthyValues<Collection extends object>(object: Collection): boolean
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.hasTruthyValues
     */
    hasTruthyValues(
      this: LoDashImplicitWrapper<TValue | null | undefined>
    ): LoDashImplicitWrapper<boolean>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
    * @see _.hasTruthyValues
    */
    hasTruthyValues(
      this: LoDashExplicitWrapper<TValue | null | undefined>
    ): LoDashExplicitWrapper<boolean>
  }
}
