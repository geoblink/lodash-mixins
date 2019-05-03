import mergeForEach, { ComparisonResult } from '../../src/mergeForEach'
import { ValueOf } from '../../src/types'
import { SORTING_ORDER } from '../../src/constants'
import { expect, use as chaiUse } from 'chai'
import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
chaiUse(sinonChai)

describe('mergeForEach', function () {
  const lhsBarcelona = { id: 0, name: 'Barcelona' }
  const lhsMadrid = { id: 1, name: 'Madrid' }

  const rhsMadrid = { id_city: 1, city_name: 'Madrid' }
  const rhsValencia = { id_city: 2, city_name: 'Valencia' }
  const rhsCityWithoutId = { city_name: 'No Id City' }

  const leftCallback = sinon.stub()
  const rightCallback = sinon.stub()
  const innerCallback = sinon.stub()

  beforeEach('Reset stubs', function () {
    leftCallback.reset()
    rightCallback.reset()
    innerCallback.reset()
  })

  describe('When collections are sorted', function () {
    buildTestCases({
      lhs: [lhsBarcelona, lhsMadrid],
      rhs: [rhsMadrid, rhsValencia, rhsCityWithoutId],
      lhsIteratee: 'id',
      rhsIteratee: 'id_city',
      leftCallback,
      rightCallback,
      innerCallback
    })
  })

  describe('When collections are NOT sorted', function () {
    buildTestCases({
      lhs: [lhsMadrid, lhsBarcelona],
      rhs: [rhsValencia, rhsMadrid, rhsCityWithoutId],
      lhsIteratee: 'id',
      rhsIteratee: 'id_city',
      leftCallback,
      rightCallback,
      innerCallback
    })
  })

  describe('When using functions as iteratees', function () {
    buildTestCases({
      lhs: [lhsMadrid, lhsBarcelona],
      rhs: [rhsValencia, rhsMadrid, rhsCityWithoutId],
      lhsIteratee (lhsItem) { return lhsItem.id },
      rhsIteratee (rhsItem) { return rhsItem.id_city },
      leftCallback,
      rightCallback,
      innerCallback
    })
  })

  describe('When using a custom comparison function', function () {
    buildTestCases({
      lhs: [lhsMadrid, lhsBarcelona],
      rhs: [rhsValencia, rhsMadrid, rhsCityWithoutId],
      lhsIteratee: 'id',
      rhsIteratee: 'id_city',
      comparator ({ lhsItem, rhsItem, getLHSValue, getRHSValue }) {
        const lhsValue = getLHSValue(lhsItem)
        const rhsValue = getRHSValue(rhsItem)

        if (lhsValue < rhsValue) {
          return SORTING_ORDER.LHS_BEFORE_RHS
        } else if (rhsValue > lhsValue) {
          return SORTING_ORDER.LHS_AFTER_RHS
        } else {
          return SORTING_ORDER.EQUAL
        }
      },
      leftCallback,
      rightCallback,
      innerCallback
    })
  })

  function buildTestCases<
    L extends any,
    R extends any,
    LHSItem extends ValueOf<L>,
    RHSItem extends ValueOf<R>,
    LHSItemKey extends keyof LHSItem,
    RHSItemKey extends keyof RHSItem
  > ({
    lhs, rhs,
    lhsIteratee, rhsIteratee, comparator,
    leftCallback, innerCallback, rightCallback
  }: {
    lhs: L,
    rhs: R,
    lhsIteratee: LHSItemKey | ((item: LHSItem) => any),
    rhsIteratee: RHSItemKey | ((item: RHSItem) => any),
    innerCallback?: (lhsItem: LHSItem, rhsItem: RHSItem) => void,
    leftCallback?: (lhsItem: LHSItem) => void,
    rightCallback?: (rhsItem: RHSItem) => void,
    comparator?: (params: {
      lhsItem: LHSItem,
      rhsItem: RHSItem,
      getLHSValue: (lhsItem: LHSItem) => any,
      getRHSValue: (rhsItem: RHSItem) => any
    }) => ComparisonResult
  }) {
    it('Should call leftCallback for non-matching values in lhs', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        leftCallback,
        innerCallback,
        rightCallback
      })

      expect(leftCallback).to.have.been.calledWithExactly(lhsBarcelona)
    })

    it('Should not call leftCallback if not provided', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        innerCallback,
        rightCallback
      })
    })

    it('Should call rightCallback for non-matching values in rhs', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        leftCallback,
        innerCallback,
        rightCallback
      })

      expect(rightCallback).to.have.been.calledWithExactly(rhsValencia)
      expect(rightCallback).to.have.been.calledWithExactly(rhsCityWithoutId)
    })

    it('Should not call rightCallback if not provided', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        leftCallback,
        innerCallback
      })
    })

    it('Should call innerCallback for matching values in both collections', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        leftCallback,
        innerCallback,
        rightCallback
      })

      expect(innerCallback).to.have.been.calledWithExactly(lhsMadrid, rhsMadrid)
    })

    it('Should not call innerCallback if not provided', function () {
      mergeForEach(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        leftCallback,
        rightCallback
      })
    })
  }
})
