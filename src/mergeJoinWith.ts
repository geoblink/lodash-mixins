import { SORTING_ORDER } from './constants'
import { ValueOf } from './types'

import mergeForEach from './mergeForEach'

export default mergeJoinWith

export type ComparisonResult = number

/**
 * Divide-and-conquer-based join function to merge two arrays into a new one.
 *
 * Both collections must be sortable. They will be sorted ascendently using
 * value returned by the corresponding iteratee.
 *
 * @param lhs A collection of elements.
 * @param rhs A collection of elements.
 * @param options Options for comparison.
 * @param options.lhsIteratee Iteratee used to get the value used to sort `lhs`.
 * Returned value will be used to sort the collection before running the
 * divide-and-conquer algorithm.
 * @param options.rhsIteratee Iteratee used to get the value used to sort `rhs`.
 * Returned value will be used to sort the collection
 * before running the divide-and-conquer algorithm.
 * @param options.getInnerJoinedItem Callback called when there are two matching
 * elements. Boths elements are passed as arguments. Must return the resulting
 * element of merging both parameters.
 * @param options.getLeftJoinedItem Callback called when there are elements in
 * the left-hand-side collection which cannot be matched with any element of the
 * right-hand-side collection. Must return the element to be added to results array.
 * @param options.getRightJoinedItem Callback called when there are elements in
 * the right-hand-side collection which cannot be matched with any element of the
 * left-hand-side collection. Must return the element to be added to results array.
 * @param comparator Function used to compare an item of `lhs` collection against
 * an item of `rhs` collection. Negative values mean that `lhs` item is **before**
 * `rhs` item, positive values that `lhs` item is **after** `rhs` item and `0`
 * that both items are equivalent in terms of sorting. Default implementation is
 * equivalent to `<` operator. Will receive as 3rd and 4th parameters the
 * iteratees used to get sorting value for `lhs` and `rhs`.
 */
function mergeJoinWith<
  L extends any,
  R extends any,
  InnerJoinedItem extends any,
  LeftJoinedItem extends any,
  RightJoinedItem extends any,
  LHSItem extends ValueOf<L>,
  RHSItem extends ValueOf<R>,
  LHSItemKey extends keyof LHSItem,
  RHSItemKey extends keyof RHSItem
> (
  lhs: L | LHSItem[],
  rhs: R | RHSItem[],
  {
    lhsIteratee = (lhsItem) => lhsItem,
    rhsIteratee = (rhsItem) => rhsItem,
    getInnerJoinedItem,
    getLeftJoinedItem = (lhsItem) => lhsItem,
    getRightJoinedItem = (rhsItem) => rhsItem,
    comparator = function ({ lhsItem, rhsItem, getLHSValue, getRHSValue }) {
      const lhsValue = getLHSValue(lhsItem) as any
      const rhsValue = getRHSValue(rhsItem) as any

      if (lhsValue < rhsValue) {
        return SORTING_ORDER.LHS_BEFORE_RHS
      } else if (lhsValue > rhsValue) {
        return SORTING_ORDER.LHS_AFTER_RHS
      } else {
        return SORTING_ORDER.EQUAL
      }
    }
  }: {
    lhsIteratee?: LHSItemKey | ((item: LHSItem) => any),
    rhsIteratee?: RHSItemKey | ((item: RHSItem) => any),
    getInnerJoinedItem: (lhsItem: LHSItem, rhsItem: RHSItem) => InnerJoinedItem,
    getLeftJoinedItem?: (lhsItem: LHSItem) => LeftJoinedItem,
    getRightJoinedItem?: (rhsItem: RHSItem) => RightJoinedItem,
    comparator?: (params: {
      lhsItem: LHSItem,
      rhsItem: RHSItem,
      getLHSValue: (lhsItem: LHSItem) => any,
      getRHSValue: (rhsItem: RHSItem) => any
    }) => ComparisonResult
  }
) {
  const result: (InnerJoinedItem|LeftJoinedItem|RightJoinedItem)[] = []

  mergeForEach(lhs, rhs, {
    lhsIteratee,
    rhsIteratee,
    comparator,
    innerCallback (lhsItem, rhsItem) {
      const joinedItem = getInnerJoinedItem(lhsItem, rhsItem)
      result.push(joinedItem)
    },
    leftCallback (lhsItem) {
      const joinedItem = getLeftJoinedItem(lhsItem)
      result.push(joinedItem)
    },
    rightCallback (rhsItem) {
      const joinedItem = getRightJoinedItem(rhsItem)
      result.push(joinedItem)
    }
  })

  return result
}
