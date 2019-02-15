/**
 * Possible results when comparing two items.
 * @readonly
 * @constant
 * @enum {SortingOrder}
 */
enum SORTING_ORDER {
  /** Any negative number */
  LHS_BEFORE_RHS = -1,
  /** Any positive number */
  LHS_AFTER_RHS = 1,
  /** Zero */
  EQUAL = 0
}

export { SORTING_ORDER }
