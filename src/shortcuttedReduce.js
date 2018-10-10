var _ = require('lodash')

/**
 * Like _.reduce but as soon as accumulator changes it finishes execution.
 *
 * @param {Array|Object} collection Collection to be reduced.
 * @param {Function} iteratee Function that will be called in each iteration. It'll receive as params the value and the index.
 * @param {Boolean|Integer|String} Accumulator. Note that is **must** be a simple primitive.
 * @returns {*} Returns the accumulated value.
 */
module.exports = function shortcuttedReduce (collection, iteratee, accumulator) {
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
    for (var index = 0; index < collection.length; index++) {
      var oldAccumulator = accumulator
      accumulator = iteratee(accumulator, collection[index], index)
      if (accumulator !== oldAccumulator) {
        return accumulator
      }
    }
    return accumulator
  }

  function reduceObjectCollection () {
    var keys = Object.keys(collection)
    for (var index = 0; index < keys.length; index++) {
      var oldAccumulator = accumulator
      var key = keys[index]
      accumulator = iteratee(accumulator, collection[key], key)
      if (accumulator !== oldAccumulator) {
        return accumulator
      }
    }
    return accumulator
  }
}
