import * as _ from 'lodash'

import mGet from './mGet'

export default sumMultipleFinite

/**
 * Returns the `sum` of multiple values from an object, adding just the `finite` ones.
 *
 * @param object Object to be queried.
 * @param arrayOfKeys Array with the paths of the properties to get.
 * @return Number with the sum of the values for the given key paths.
 */
export function sumMultipleFinite <
  Collection extends object,
  CollectionKey extends keyof Collection
> (
  object: Collection,
  arrayOfKeys: CollectionKey[]
): (Number) {
  return _.sum(_.filter(mGet(object, arrayOfKeys), _.isFinite))
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Returns the `sum` of multiple values from an object, adding just the `finite` ones.
     *
     * @param object Object to be queried.
     * @param arrayOfKeys Array with the paths of the properties to get.
     * @return Number with the sum of the values for the given key paths.
     */
    sumMultipleFinite<
      Collection extends object,
      CollectionKey extends keyof Collection
    > (
      object: Collection,
      arrayOfKeys: CollectionKey[]
    ): Number
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.sumMultipleFinite
     */
    sumMultipleFinite<
      CollectionKey extends keyof TValue
    >(
      this: LoDashImplicitWrapper<TValue | null | undefined>,
      arrayOfKeys: CollectionKey[]
    ): LoDashImplicitWrapper<(Number)>
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
    * @see _.sumMultipleFinite
    */
    sumMultipleFinite<
      CollectionKey extends keyof TValue
    >(
      this: LoDashExplicitWrapper<TValue | null | undefined>,
      arrayOfKeys: CollectionKey[]
    ): LoDashExplicitWrapper<(Number)>
  }
}
