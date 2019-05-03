import * as _ from 'lodash'

export default mGet

/**
 * Returns multiple values of an object, defaulting missing ones to a common
 * default.
 *
 * @param object Object to be queried.
 * @param arrayOfKeys Array with the paths of the properties to get.
 * @param defaultValue The value returned for missing resolved values.
 * @return New array with values for given key paths or default one.
 */
function mGet<
  Collection extends object,
  CollectionKey extends keyof Collection,
  ReturnValue
> (
  object: Collection,
  arrayOfKeys: CollectionKey[],
  defaultValue?: ReturnValue
): (ReturnValue | Collection[CollectionKey] | undefined)[] {
  return _.map(arrayOfKeys, getValueOrDefault)

  function getValueOrDefault (key: CollectionKey): Collection[CollectionKey] | ReturnValue | undefined {
    return _.get(object, key, defaultValue)
  }
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
    mGet<
      Collection extends object,
      CollectionKey extends keyof Collection,
      ReturnValue
    > (
      object: Collection,
      arrayOfKeys: CollectionKey[],
      defaultValue?: ReturnValue
    ): (ReturnValue | Collection[CollectionKey] | undefined)[]
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.mGet
     */
    mGet<
      CollectionKey extends keyof TValue,
      ReturnValue
    >(
      this: LoDashImplicitWrapper<TValue | null | undefined>,
      arrayOfKeys: CollectionKey[],
      defaultValue?: ReturnValue
    ): LoDashImplicitWrapper<(ReturnValue | TValue[CollectionKey] | undefined)[]>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
    * @see _.mGet
    */
    mGet<
      CollectionKey extends keyof TValue,
      ReturnValue
    >(
      this: LoDashExplicitWrapper<TValue | null | undefined>,
      arrayOfKeys: CollectionKey[],
      defaultValue?: ReturnValue
    ): LoDashExplicitWrapper<(ReturnValue | TValue[CollectionKey] | undefined)[]>
  }
}
