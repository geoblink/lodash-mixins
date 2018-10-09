const hasTruthyValues = require('../src/hasTruthyValues')
const chai = require('chai')
const { expect } = chai

describe('hasTruthyValues', function () {
  it('should return false if there are no truthy keys', function () {
    const object = {
      b: false,
      c: null,
      d: undefined,
      e: '',
      h: 0
    }

    expect(hasTruthyValues(object)).to.be.false // eslint-disable-line no-unused-expressions
  })

  it('should return true if there are truthy keys', function () {
    const truthyValues = [true, [], {}, 1, { a: null }, ['a'], 'b']

    for (const value of truthyValues) {
      const testObject = {
        aKey: value
      }
      // eslint-disable-next-line no-unused-expressions
      expect(
        hasTruthyValues(testObject),
        `Object: ${JSON.stringify(testObject)} should have truthy keys`
      ).to.be.true
    }
  })
})
