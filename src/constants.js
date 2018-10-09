/**
 * -1|0|1
 * @typedef {Number} SortingOrder
 */

/**
 * Possible results when comparing two items.
 * @readonly
 * @enum {SortingOrder}
 */
var SORTING_ORDER = {
  LHS_BEFORE_RHS: -1,
  LHS_AFTER_RHS: 1,
  EQUAL: 0
}

module.exports = { SORTING_ORDER }
