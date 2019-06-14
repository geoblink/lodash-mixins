import sumMultipleFinite from '../../src/sumMultipleFinite'
import { expect } from 'chai'

describe('sumMultipleFinite', function () {
  it('should sum correctly one value', function () {
    const object = {
      a: 1
    }
    const result = sumMultipleFinite(object, ['a'])
    expect(result).to.equal(1)
  })

  it('should sum correctly all existing values', function () {
    const object = {
      a: 1,
      b: 2,
      c: 5
    }

    const result = sumMultipleFinite(object, ['b', 'a'])
    expect(result).to.equal(3)
  })

  it('should sum correctly with negative values', function () {
    const object = {
      a: 1,
      b: 2,
      c: -5
    }

    const result = sumMultipleFinite(object, ['b', 'a', 'c'])
    expect(result).to.equal(-2)
  })

  it('should ignore not finite values', function () {
    const object = {
      a: 1,
      b: NaN,
      c: 5,
      d: null,
      e: undefined,
      f: '',
      g: '44'
    }

    const result = sumMultipleFinite(object, ['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(result).to.equal(6)
  })

  it('should return 0 when all values are not finite', function () {
    const object = {
      b: NaN,
      d: null,
      e: undefined
    }

    const result = sumMultipleFinite(object, ['b', 'd', 'e'])
    expect(result).to.equal(0)
  })

  it('should return 0 when no keys are provided', function () {
    const object = {
      b: NaN,
      d: null,
      e: undefined
    }

    const result = sumMultipleFinite(object, [])
    expect(result).to.equal(0)
  })
})
