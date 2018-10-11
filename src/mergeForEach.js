var _ = require('lodash')
var { SORTING_ORDER } = require('./constants')

module.exports = mergeForEach

/**
 * @template I
 * @typedef {string|string[]|function(I): any} Iteratee
 */

/**
 * @template LHSItem
 * @template RHSItem
 * @typedef {object} MergeComparatorParams
 * @property {LHSItem} lhsItem Left-hand-side collection item.
 * @property {RHSItem} rhsItem Right-hand-side collection item.
 * @property {function(LHSItem): any} getLHSValue Function to get value used to
 * sort left-hand-side collection.
 * @property {function(RHSItem): any} getRHSValue Function to get value used to
 * sort right-hand-side collection.
 */

/**
 * Divide-and-conquer-based for-each function where a different iteratee is
 * called for items in both collections, items in the left one but not in the
 * right one and items in the right one but not in the left one.
 *
 * Can be used to implement efficient algorithms which profit from sorted data
 * like `mergeSort` or `mergeJoinWith`.
 *
 * Both collections must be sortable. They will be sorted ascendently using
 * value returned by the corresponding iteratee.
 *
 * @template LHSItem
 * @template RHSItem
 * @param {Object|LHSItem[]} lhs A collection of elements.
 * @param {Object|RHSItem[]} rhs A collection of elements.
 * @param {object} options Options for comparison.
 * @param {Iteratee<LHSItem>} options.lhsIteratee Iteratee used to get the
 * value used to sort `lhs`. Returned value will be used to sort the collection
 * before running the divide-and-conquer algorithm.
 * @param {Iteratee<RHSItem>} options.rhsIteratee Iteratee used to get the
 * value used to sort `rhs`. Returned value will be used to sort the collection
 * before running the divide-and-conquer algorithm.
 * @param {?function(LHSItem, RHSItem)} options.innerCallback Callback called
 * when there are two matching elements. Boths elements are passed as arguments.
 * @param {?function(LHSItem)} options.leftCallback Callback called when there
 * are elements in the left-hand-side collection which cannot be matched with
 * any element of the right-hand-side collection.
 * @param {?function(RHSItem)} options.rightCallback Callback called when there
 * are elements in the right-hand-side collection which cannot be matched with
 * any element of the left-hand-side collection.
 * @param {function(MergeComparatorParams<LHSItem, RHSItem>): number} comparator Function
 * used to compare an item of `lhs` collection against an item of `rhs`
 * collection. Negative values mean that `lhs` item is **before** `rhs` item,
 * positive values that `lhs` item is **after** `rhs` item and `0` that both
 * items are equivalent in terms of sorting. Default implementation is
 * equivalent to `<` operator. Will receive as 3rd and 4th parameters the
 * iteratees used to get sorting value for `lhs` and `rhs`.
 */
function mergeForEach (lhs, rhs, {
  lhsIteratee = function (lhsItem) { return lhsItem },
  rhsIteratee = function (rhsItem) { return rhsItem },
  innerCallback = function () {},
  leftCallback = function () {},
  rightCallback = function () {},
  comparator = function ({ lhsItem, rhsItem, getLHSValue, getRHSValue }) {
    var lhsValue = getLHSValue(lhsItem)
    var rhsValue = getRHSValue(rhsItem)

    if (lhsValue < rhsValue) {
      return SORTING_ORDER.LHS_BEFORE_RHS
    } else if (lhsValue > rhsValue) {
      return SORTING_ORDER.LHS_AFTER_RHS
    } else {
      return SORTING_ORDER.EQUAL
    }
  }
}) {
  /** @type {LHSItem[]} */
  var sortedLHS = _.sortBy(lhs, lhsIteratee)
  /** @type {RHSItem[]} */
  var sortedRHS = _.sortBy(rhs, rhsIteratee)

  var lhsIndex = 0
  var rhsIndex = 0

  var getLHSValue = getterFromIteratee(lhsIteratee)
  var getRHSValue = getterFromIteratee(rhsIteratee)

  while (lhsIndex < sortedLHS.length && rhsIndex < sortedRHS.length) {
    var lhsItem = sortedLHS[lhsIndex]
    var rhsItem = sortedRHS[rhsIndex]

    /** @type {MergeForEachOrder} */
    var comparisonResult = comparator({
      lhsItem,
      rhsItem,
      getLHSValue,
      getRHSValue
    })

    if (comparisonResult < SORTING_ORDER.EQUAL) {
      leftCallback(lhsItem)
      lhsIndex++
    } else if (comparisonResult > SORTING_ORDER.EQUAL) {
      rightCallback(rhsItem)
      rhsIndex++
    } else {
      innerCallback(lhsItem, rhsItem)
      lhsIndex++
      rhsIndex++
    }
  }

  while (lhsIndex < sortedLHS.length) {
    leftCallback(sortedLHS[lhsIndex])
    lhsIndex++
  }

  while (rhsIndex < sortedRHS.length) {
    rightCallback(sortedRHS[rhsIndex])
    rhsIndex++
  }

  function getterFromIteratee (iteratee) {
    return _.isFunction(iteratee)
      ? iteratee
      : function (item) {
        return _.get(item, iteratee)
      }
  }
}
