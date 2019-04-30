import * as _ from 'lodash'
import { SORTING_ORDER } from './constants'
import { ValueOf } from './types'

export default mergeForEach

export type ComparisonResult = number

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
 * @param lhs A collection of elements.
 * @param rhs A collection of elements.
 * @param options Options for comparison.
 * @param options.lhsIteratee Iteratee used to get the value used to sort `lhs`.
 * Returned value will be used to sort the collection before running the
 * divide-and-conquer algorithm.
 * @param options.rhsIteratee Iteratee used to get the value used to sort `rhs`.
 * Returned value will be used to sort the collection
 * before running the divide-and-conquer algorithm.
 * @param options.innerCallback Callback called when there are two matching
 * elements. Boths elements are passed as arguments.
 * @param options.leftCallback Callback called when there are elements in the
 * left-hand-side collection which cannot be matched with any element of the
 * right-hand-side collection.
 * @param options.rightCallback Callback called when there are elements in the
 * right-hand-side collection which cannot be matched with any element of the
 * left-hand-side collection.
 * @param comparator Function used to compare an item of `lhs` collection against
 * an item of `rhs` collection. Negative values mean that `lhs` item is **before**
 * `rhs` item, positive values that `lhs` item is **after** `rhs` item and `0`
 * that both items are equivalent in terms of sorting. Default implementation is
 * equivalent to `<` operator. Will receive as 3rd and 4th parameters the
 * iteratees used to get sorting value for `lhs` and `rhs`.
 */
function mergeForEach<
  L extends any,
  R extends any,
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
    innerCallback = () => {},
    leftCallback = () => {},
    rightCallback = () => {},
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
    innerCallback?: (lhsItem: LHSItem, rhsItem: RHSItem) => void,
    leftCallback?: (lhsItem: LHSItem) => void,
    rightCallback?: (rhsItem: RHSItem) => void,
    comparator?: (params: {
      lhsItem: LHSItem,
      rhsItem: RHSItem,
      getLHSValue: (lhsItem: LHSItem) => any,
      getRHSValue: (rhsItem: RHSItem) => any
    }) => ComparisonResult
  }
) {
  const sortedLHS = _.sortBy(lhs as any, lhsIteratee)
  const sortedRHS = _.sortBy(rhs as any, rhsIteratee)

  let lhsIndex = 0
  let rhsIndex = 0

  const getLHSValue = getterFromIteratee<LHSItem, any>(lhsIteratee)
  const getRHSValue = getterFromIteratee<RHSItem, any>(rhsIteratee)

  while (lhsIndex < sortedLHS.length && rhsIndex < sortedRHS.length) {
    const lhsItem = sortedLHS[lhsIndex] as LHSItem
    const rhsItem = sortedRHS[rhsIndex] as RHSItem

    const comparisonResult = comparator({
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
    leftCallback(sortedLHS[lhsIndex] as LHSItem)
    lhsIndex++
  }

  while (rhsIndex < sortedRHS.length) {
    rightCallback(sortedRHS[rhsIndex] as RHSItem)
    rhsIndex++
  }

  function getterFromIteratee<
    Item extends any,
    ItemKey extends keyof Item
  > (iteratee: ItemKey | ((item: Item) => any)): (item: Item) => any {
    return _.isFunction(iteratee)
      ? iteratee
      : ((item: Item) => _.get(item, iteratee as ItemKey))
  }
}

declare module 'lodash' {
  interface LoDashStatic {
    /**
     * Divide-and-conquer-based for-each function where a different iteratee is
     * called for items in both collections, items in the left one but not in
     * the right one and items in the right one but not in the left one.
     *
     * Can be used to implement efficient algorithms which profit from sorted
     * data like `mergeSort` or `mergeJoinWith`.
     *
     * Both collections must be sortable. They will be sorted ascendently using
     * value returned by the corresponding iteratee.
     *
     * @param lhs A collection of elements.
     * @param rhs A collection of elements.
     * @param options Options for comparison.
     * @param options.lhsIteratee Iteratee used to get the value used to sort
     * `lhs`. Returned value will be used to sort the collection before running
     * the divide-and-conquer algorithm.
     * @param options.rhsIteratee Iteratee used to get the value used to sort
     * `rhs`. Returned value will be used to sort the collection before running
     * the divide-and-conquer algorithm.
     * @param options.innerCallback Callback called when there are two matching
     * elements. Boths elements are passed as arguments.
     * @param options.leftCallback Callback called when there are elements in
     * the left-hand-side collection which cannot be matched with any element of
     * the right-hand-side collection.
     * @param options.rightCallback Callback called when there are elements in
     * the right-hand-side collection which cannot be matched with any element
     * of the left-hand-side collection.
     * @param options.comparator Function used to compare an item of `lhs`
     * collection against an item of `rhs` collection. Negative values mean that
     * `lhs` item is **before** `rhs` item, positive values that `lhs` item is
     * **after** `rhs` item and `0` that both items are equivalent in terms of
     * sorting. Default implementation is equivalent to `<` operator. Will
     * receive as 3rd and 4th parameters the iteratees used to get sorting value
     * for `lhs` and `rhs`.
     */
    mergeForEach<
      L extends any,
      R extends any,
      LHSItem extends ValueOf<L>,
      RHSItem extends ValueOf<R>,
      LHSItemKey extends keyof LHSItem,
      RHSItemKey extends keyof RHSItem
    > (
      lhs: L | LHSItem[],
      rhs: R | RHSItem[],
      params: {
        lhsIteratee?: LHSItemKey | ((item: LHSItem) => any),
        rhsIteratee?: RHSItemKey | ((item: RHSItem) => any),
        innerCallback?: (lhsItem: LHSItem, rhsItem: RHSItem) => void,
        leftCallback?: (lhsItem: LHSItem) => void,
        rightCallback?: (rhsItem: RHSItem) => void,
        comparator?: (params: {
          lhsItem: LHSItem,
          rhsItem: RHSItem,
          getLHSValue: (lhsItem: LHSItem) => any,
          getRHSValue: (rhsItem: RHSItem) => any
        }) => ComparisonResult
      }
    ): void
  }

  interface LoDashImplicitWrapper<TValue> {
    /**
     * @see _.hasTruthyValues
     */
    mergeForEach<
      L extends any,
      R extends any,
      LHSItem extends ValueOf<L>,
      RHSItem extends ValueOf<R>,
      LHSItemKey extends keyof LHSItem,
      RHSItemKey extends keyof RHSItem
    >(
      this: LoDashImplicitWrapper<TValue | null | undefined>,
      lhs: L | LHSItem[],
      rhs: R | RHSItem[],
      params: {
        lhsIteratee?: LHSItemKey | ((item: LHSItem) => any),
        rhsIteratee?: RHSItemKey | ((item: RHSItem) => any),
        innerCallback?: (lhsItem: LHSItem, rhsItem: RHSItem) => void,
        leftCallback?: (lhsItem: LHSItem) => void,
        rightCallback?: (rhsItem: RHSItem) => void,
        comparator?: (params: {
          lhsItem: LHSItem,
          rhsItem: RHSItem,
          getLHSValue: (lhsItem: LHSItem) => any,
          getRHSValue: (rhsItem: RHSItem) => any
        }) => ComparisonResult
      }
    ): this
  }

  interface LoDashExplicitWrapper<TValue> {
    /**
     * @see _.hasTruthyValues
     */
    mergeForEach<
      L extends any,
      R extends any,
      LHSItem extends ValueOf<L>,
      RHSItem extends ValueOf<R>,
      LHSItemKey extends keyof LHSItem,
      RHSItemKey extends keyof RHSItem
    >(
      this: LoDashExplicitWrapper<TValue | null | undefined>,
      lhs: L | LHSItem[],
      rhs: R | RHSItem[],
      params: {
        lhsIteratee?: LHSItemKey | ((item: LHSItem) => any),
        rhsIteratee?: RHSItemKey | ((item: RHSItem) => any),
        innerCallback?: (lhsItem: LHSItem, rhsItem: RHSItem) => void,
        leftCallback?: (lhsItem: LHSItem) => void,
        rightCallback?: (rhsItem: RHSItem) => void,
        comparator?: (params: {
          lhsItem: LHSItem,
          rhsItem: RHSItem,
          getLHSValue: (lhsItem: LHSItem) => any,
          getRHSValue: (rhsItem: RHSItem) => any
        }) => ComparisonResult
      }
    ): this
  }
}
