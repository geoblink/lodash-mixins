var shortcuttedReduce = require('./shortcuttedReduce')

module.exports = hasTruthyValues

/**
 * Returns whether given collection has at least one truthy value for one of its
 * keys.
 *
 * This function stops traversing the collection as soon as it finds a truthy
 * value.
 *
 * @param {Object|Array} collection Collection to iterate over.
 * @returns {Boolean} `true` if there's at least one value which is truthy.
 */
function hasTruthyValues (collection) {
  return shortcuttedReduce(collection, function (accum, value) {
    return accum || !!value
  })
}
