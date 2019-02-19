import fromPairsMap from '../../src/fromPairsMap'
import { expect, use as chaiUse } from 'chai'
import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
chaiUse(sinonChai)

describe('fromPairsMap', function () {
  it('should return an object', function () {
    const array = ['a', 'b', 'c']
    const expectedResult = {
      a: 'a',
      b: 'b',
      c: 'c'
    }
    const result = fromPairsMap(array, v => [v, v])
    expect(result).to.be.deep.equal(expectedResult)
  })

  it('should apply map function', function () {
    const mapFunction = sinon.stub().callsFake(v => [v, `the key is ${v}`])
    const array = ['a', 'b', 'c']
    const expectedResult = {
      a: 'the key is a',
      b: 'the key is b',
      c: 'the key is c'
    }
    const result = fromPairsMap(array, mapFunction)
    expect(mapFunction).to.have.property('callCount').that.is.equal(array.length)
    expect(mapFunction).to.have.been.calledWith('a', 0)
    expect(mapFunction).to.have.been.calledWith('b', 1)
    expect(mapFunction).to.have.been.calledWith('c', 2)
    expect(result).to.be.deep.equal(expectedResult)
  })
})
