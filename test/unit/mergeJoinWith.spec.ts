import _ from 'lodash'
import mergeJoinWith, { ComparisonResult } from '../../src/mergeJoinWith'
import { ValueOf } from '../../src/types'
import { SORTING_ORDER } from '../../src/constants'
import { expect, use as chaiUse } from 'chai'
import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
chaiUse(sinonChai)

describe('mergeJoinWith', function () {
  const lhsBarcelona = { id: 0, name: 'Barcelona' }
  const lhsMadrid = { id: 1, name: 'Madrid' }

  const rhsMadrid = { id_city: 1, city_name: 'Madrid' }
  const rhsValencia = { id_city: 2, city_name: 'Valencia' }
  const rhsCityWithoutId = { city_name: 'No Id City' }

  const getLeftJoinedItem = sinon
    .stub()
    .callsFake((item) => _.assign({ mocked: true }, item))
  const getRightJoinedItem = sinon
    .stub()
    .callsFake((item) => _.assign({ mocked: true }, item))
  const getInnerJoinedItem = sinon
    .stub()
    .callsFake((lhsItem, rhsItem) => _.assign({ mocked: true }, lhsItem, rhsItem))

  beforeEach('Reset stubs', function () {
    getLeftJoinedItem.resetHistory()
    getRightJoinedItem.resetHistory()
    getInnerJoinedItem.resetHistory()
  })

  describe('When collections are sorted', function () {
    buildTestCases({
      lhs: [lhsBarcelona, lhsMadrid],
      rhs: [rhsMadrid, rhsValencia, rhsCityWithoutId],
      lhsIteratee: 'id',
      rhsIteratee: 'id_city',
      getLeftJoinedItem,
      getRightJoinedItem,
      getInnerJoinedItem
    })
  })

  describe('When collections are NOT sorted', function () {
    buildTestCases({
      lhs: [lhsMadrid, lhsBarcelona],
      rhs: [rhsValencia, rhsMadrid, rhsCityWithoutId],
      lhsIteratee: 'id',
      rhsIteratee: 'id_city',
      getLeftJoinedItem,
      getRightJoinedItem,
      getInnerJoinedItem
    })
  })

  describe('When using functions as iteratees', function () {
    buildTestCases({
      lhs: [lhsMadrid, lhsBarcelona],
      rhs: [rhsValencia, rhsMadrid, rhsCityWithoutId],
      lhsIteratee (lhsItem) { return lhsItem.id },
      rhsIteratee (rhsItem) { return rhsItem.id_city },
      getLeftJoinedItem,
      getRightJoinedItem,
      getInnerJoinedItem
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
      getLeftJoinedItem,
      getRightJoinedItem,
      getInnerJoinedItem
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
    getLeftJoinedItem, getInnerJoinedItem, getRightJoinedItem
  }: {
    lhs: L,
    rhs: R,
    lhsIteratee: LHSItemKey | ((item: LHSItem) => any),
    rhsIteratee: RHSItemKey | ((item: RHSItem) => any),
    getInnerJoinedItem: (lhsItem: LHSItem, rhsItem: RHSItem) => LHSItem & RHSItem,
    getLeftJoinedItem?: (lhsItem: LHSItem) => LHSItem,
    getRightJoinedItem?: (rhsItem: RHSItem) => RHSItem,
    comparator?: (params: {
      lhsItem: LHSItem,
      rhsItem: RHSItem,
      getLHSValue: (lhsItem: LHSItem) => any,
      getRHSValue: (rhsItem: RHSItem) => any
    }) => ComparisonResult
  }) {
    it('Should call getLeftJoinedItem for non-matching values in lhs', function () {
      const result = mergeJoinWith(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        getInnerJoinedItem,
        getLeftJoinedItem,
        getRightJoinedItem
      })

      expect(getLeftJoinedItem).to.have.been.calledWithExactly(lhsBarcelona)
      expect(result).to.be.deep.equal([
        _.assign({ mocked: true }, lhsBarcelona),
        _.assign({ mocked: true }, lhsMadrid, rhsMadrid),
        _.assign({ mocked: true }, rhsValencia),
        _.assign({ mocked: true }, rhsCityWithoutId)
      ])
    })

    it('Should not call getLeftJoinedItem if not provided', function () {
      const result = mergeJoinWith(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        getInnerJoinedItem,
        getRightJoinedItem
      })

      expect(result).to.be.deep.equal([
        lhsBarcelona,
        _.assign({ mocked: true }, lhsMadrid, rhsMadrid),
        _.assign({ mocked: true }, rhsValencia),
        _.assign({ mocked: true }, rhsCityWithoutId)
      ])
    })

    it('Should call getRightJoinedItem for non-matching values in rhs', function () {
      const result = mergeJoinWith(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        getInnerJoinedItem,
        getLeftJoinedItem,
        getRightJoinedItem
      })

      expect(getRightJoinedItem).to.have.been.calledWithExactly(rhsValencia)
      expect(getRightJoinedItem).to.have.been.calledWithExactly(rhsCityWithoutId)
      expect(result).to.be.deep.equal([
        _.assign({ mocked: true }, lhsBarcelona),
        _.assign({ mocked: true }, lhsMadrid, rhsMadrid),
        _.assign({ mocked: true }, rhsValencia),
        _.assign({ mocked: true }, rhsCityWithoutId)
      ])
    })

    it('Should not call getRightJoinedItem if not provided', function () {
      const result = mergeJoinWith(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        getInnerJoinedItem,
        getLeftJoinedItem
      })

      expect(result).to.be.deep.equal([
        _.assign({ mocked: true }, lhsBarcelona),
        _.assign({ mocked: true }, lhsMadrid, rhsMadrid),
        rhsValencia,
        rhsCityWithoutId
      ])
    })

    it('Should call getInnerJoinedItem for matching values in both collections', function () {
      const result = mergeJoinWith(lhs, rhs, {
        lhsIteratee,
        rhsIteratee,
        comparator,
        getInnerJoinedItem,
        getLeftJoinedItem,
        getRightJoinedItem
      })

      expect(getInnerJoinedItem).to.have.been.calledWithExactly(lhsMadrid, rhsMadrid)
      expect(result).to.be.deep.equal([
        _.assign({ mocked: true }, lhsBarcelona),
        _.assign({ mocked: true }, lhsMadrid, rhsMadrid),
        _.assign({ mocked: true }, rhsValencia),
        _.assign({ mocked: true }, rhsCityWithoutId)
      ])
    })
  }
})
