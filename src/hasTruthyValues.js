var shortcuttedReduce = require('./shortcuttedReduce')

/**
 * Returns whether given object has at least one truthy value for one of its keys.
 *
 * @param {Object} object Object to be checked.
 * @returns {Boolean} `true` if there's at least one value which is truthy.
 */
module.exports = function hasTruthyValues (object) {
  return shortcuttedReduce(object, function (accum, value) {
    return accum || !!value
  })
}
