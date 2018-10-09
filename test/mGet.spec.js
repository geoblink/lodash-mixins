const mGet = require('../src/mGet')
const chai = require('chai')
const { expect } = chai

describe('mGet', function () {
  it('should return values in the same order as required', function () {
    const object = {
      a: 'this key is not request',
      z: 'this is the second key',
      e: 'this is the last key',
      b: 'this is the first key',
      '0': 'an unrequested key'
    }

    const result = mGet(object, ['b', 'z', 'e'])
    expect(result).to.deep.equal([object.b, object.z, object.e])
  })

  it('should return default values if key is not present', function () {
    const object = {
      a: 'something'
    }
    const defaultValue = 'default value taken'

    const firstResult = mGet(object, ['missing'], defaultValue)
    expect(firstResult).to.deep.equal([defaultValue])

    const secondResult = mGet(object, ['a', 'missing'], defaultValue)
    expect(secondResult).to.deep.equal([object.a, defaultValue])
  })

  it('should return value if key is present and not undefined', function () {
    const object = {
      a: null,
      b: undefined,
      c: 0,
      d: false,
      e: 'this is not requested'
    }
    const defaultValue = 'default value taken'

    const result = mGet(object, ['a', 'b', 'c', 'd'], defaultValue)
    expect(result).to.deep.equal([object.a, defaultValue, object.c, object.d])
  })
})
