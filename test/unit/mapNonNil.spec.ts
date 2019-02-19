import mapNonNil from '../../src/mapNonNil'
import { expect, use as chaiUse } from 'chai'
import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
chaiUse(sinonChai)

describe('mapNonNil', function () {
  describe('with arrays', function () {
    it('should call transform function with all items', function () {
      const mapFunction = sinon.stub().callsFake(v => v)
      const array = ['a', undefined, null, false, 0, 1, {}, []]
      const expectedResult = ['a', false, 0, 1, {}, []]
      const result = mapNonNil(array, mapFunction)
      expect(mapFunction).to.have.property('callCount').that.is.equal(array.length)
      expect(mapFunction).to.have.been.calledWith('a', 0)
      expect(mapFunction).to.have.been.calledWith(undefined, 1)
      expect(mapFunction).to.have.been.calledWith(null, 2)
      expect(mapFunction).to.have.been.calledWith(false, 3)
      expect(mapFunction).to.have.been.calledWith(0, 4)
      expect(mapFunction).to.have.been.calledWith(1, 5)
      expect(mapFunction).to.have.been.calledWith({}, 6)
      expect(mapFunction).to.have.been.calledWith([], 7)
      expect(result).to.deep.equal(expectedResult)
    })

    it('should return non-nil items returned by map function', function () {
      const array = ['a', undefined, null, false, 0, 1, {}, []]
      const result = mapNonNil(array, value => { return value ? { value } : value })
      const expectedResult = [
        { value: 'a' },
        false,
        0,
        { value: 1 },
        { value: {} },
        { value: [] }
      ]
      expect(result).to.deep.equal(expectedResult)
    })
  })

  describe('with object', function () {
    it('should call transform function with all items', function () {
      const mapFunction = sinon.stub().callsFake(v => v)
      const object = {
        one: 'a',
        two: undefined,
        three: null,
        four: false,
        five: 0,
        six: 1,
        seven: {},
        eight: []
      }
      const expectedResult = ['a', false, 0, 1, {}, []]
      const result = mapNonNil(object, mapFunction)
      expect(mapFunction.callCount).to.equal(Object.keys(object).length)
      expect(mapFunction).to.have.been.calledWith('a', 'one')
      expect(mapFunction).to.have.been.calledWith(undefined, 'two')
      expect(mapFunction).to.have.been.calledWith(null, 'three')
      expect(mapFunction).to.have.been.calledWith(false, 'four')
      expect(mapFunction).to.have.been.calledWith(0, 'five')
      expect(mapFunction).to.have.been.calledWith(1, 'six')
      expect(mapFunction).to.have.been.calledWith({}, 'seven')
      expect(mapFunction).to.have.been.calledWith([], 'eight')
      expect(result).to.deep.equal(expectedResult)
    })

    it('should return non-nil items returned by map function', function () {
      const object = {
        one: 'a',
        two: undefined,
        three: null,
        four: false,
        five: 0,
        six: 1,
        seven: {},
        eight: []
      }
      const result = mapNonNil(object, value => { return value ? { value } : value })
      const expectedResult = [
        { value: 'a' },
        false,
        0,
        { value: 1 },
        { value: {} },
        { value: [] }
      ]
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
