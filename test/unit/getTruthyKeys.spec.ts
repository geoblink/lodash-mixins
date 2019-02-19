import getTruthyKeys from '../../src/getTruthyKeys'
import { expect } from 'chai'

describe('getTruthyKeys', function () {
  it('should return truthy keys', function () {
    const object = {
      a: true,
      b: false,
      c: null,
      d: undefined,
      e: '',
      f: [],
      g: {},
      h: 0,
      i: 1,
      j: { a: null },
      k: ['a'],
      l: 'b'
    }

    const truthyKeys = getTruthyKeys(object)
    const expectedTruthyKeys = ['a', 'f', 'g', 'i', 'j', 'k', 'l']

    expect(truthyKeys).to.include.members(expectedTruthyKeys)
    expect(expectedTruthyKeys).to.include.members(truthyKeys)
  })

  it('should apply parseKeyFunction to returned keys', function () {
    const object = { a: true }
    const truthyKeys = getTruthyKeys(object, key => `the key was ${key}`)
    expect(truthyKeys).to.deep.equal(['the key was a'])
  })
})
