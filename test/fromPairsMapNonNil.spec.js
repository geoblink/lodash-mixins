const fromPairsMapNonNil = require('../src/fromPairsMapNonNil')
const chai = require('chai')
const sinon = require('sinon')
const { expect } = chai
chai.use(require('sinon-chai'))

describe('fromPairsMapNonNil', function () {
  it('should return an object', function () {
    const array = ['a', 'b', null]
    const expectedResult = {
      a: 'a',
      b: 'b',
    }
    const result = fromPairsMapNonNil(array, (v) => {
      return !!v ? [v, v] : null
    })
    expect(result).to.be.deep.equal(expectedResult)
  })

  it('should apply map function', function () {
    const mapFunction = sinon.stub().callsFake((v) => {
      return !!v ? [v, `the key is ${v}`] : null
    })
    const array = ['a', null, 'c']
    const expectedResult = {
      a: 'the key is a',
      c: 'the key is c'
    }
    const result = fromPairsMapNonNil(array, mapFunction)
    expect(mapFunction).to.have.property('callCount').that.is.equal(array.length)
    expect(mapFunction).to.have.been.calledWith('a', 0)
    expect(mapFunction).to.have.been.calledWith(null, 1)
    expect(mapFunction).to.have.been.calledWith('c', 2)
    expect(result).to.be.deep.equal(expectedResult)
  })
})
