import _ from 'lodash'

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
  S extends object,
  T extends keyof S,
  U
> (object: S, arrayOfKeys: T[], defaultValue?: U) {
  return _.map(arrayOfKeys, getValueOrDefault)

  function getValueOrDefault (key: T) {
    return _.get(object, key, defaultValue)
  }
}
