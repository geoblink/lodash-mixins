var _ = require('lodash')

module.exports = getTruthyKeys

/**
 * Gets the keys associated with truthy values in given collection.
 *
 * @param {Array|Object} collection Collection to iterate over.
 * @param {Function} parseKeyFunction Function invoked per iteration. This
 * function takes as parameter a key of a truthy value. The value it returns
 * will be used in resulting list. Note that if this function returns a falsy
 * value value, the key won't be present in resulting collection.
 * @returns {Array} New list with just the keys of truthy entries, for which
 * `parseKeyFunction` returned a truthy value.
 */
function getTruthyKeys (collection, parseKeyFunction) {
  var isFunction = _.isFunction(parseKeyFunction)
  return _.filter(_.map(collection, function (value, key) {
    if (!value) return false
    return isFunction ? parseKeyFunction(key) : key
  }))
}
