import shortcuttedReduce from '../../src/shortcuttedReduce'
import { expect, use as chaiUse } from 'chai'
import sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
chaiUse(sinonChai)

const sandbox = sinon.createSandbox()

describe('shortcuttedReduce', function () {
  const helpers = {
    returnTrue (): boolean {
      return true
    },

    returnAccumulator<S> (accum: S): S {
      return accum
    }
  }

  beforeEach('Set up sandbox', function () {
    sandbox.spy(helpers, 'returnTrue')
    sandbox.spy(helpers, 'returnAccumulator')
  })

  afterEach('Clean up sandbox', function () {
    sandbox.restore()
  })

  describe('with arrays', function () {
    it('should finish early on change', function () {
      const list = ['a', 'b', 'c', 'd']
      const result = shortcuttedReduce(list, helpers.returnTrue, false)
      expect(helpers.returnTrue).to.be.calledOnce // eslint-disable-line no-unused-expressions
      expect(helpers.returnTrue).to.be.calledWith(false, list[0], 0)
      expect(result).to.be.equal(true)
    })

    it('should traverse all items if nothing changes', function () {
      const list = ['a', 'b', 'c', 'd']
      const result = shortcuttedReduce(list, helpers.returnAccumulator, false)
      expect(helpers.returnAccumulator).to.have.callCount(list.length)
      for (let i = 0; i < Object.keys(list).length; i++) {
        const sinonStub = helpers.returnAccumulator as sinon.SinonStub
        expect(sinonStub.getCall(i)).to.have.been.calledWith(false, list[i], i)
      }
      expect(result).to.be.equal(false)
    })
  })

  describe('with objects', function () {
    it('should finish early on change', function () {
      const list: { [key: string]: string } = { a: 'b', c: 'd', e: 'f', g: 'h' }
      const result = shortcuttedReduce(list, helpers.returnTrue, false)
      const firstKey = Object.keys(list)[0]
      expect(helpers.returnTrue).to.be.calledOnce // eslint-disable-line no-unused-expressions
      expect(helpers.returnTrue).to.be.calledWith(false, list[firstKey], firstKey)
      expect(result).to.be.equal(true)
    })

    it('should traverse all items if nothing changes', function () {
      const list: { [key: string]: string } = { a: 'b', c: 'd', e: 'f', g: 'h' }
      const result = shortcuttedReduce(list, helpers.returnAccumulator, false)
      expect(helpers.returnAccumulator).to.have.callCount(Object.keys(list).length)
      for (let i = 0; i < Object.keys(list).length; i++) {
        const key = Object.keys(list)[i]
        const sinonStub = helpers.returnAccumulator as sinon.SinonStub
        expect(sinonStub.getCall(i)).to.have.been.calledWith(false, list[key], key)
      }
      expect(result).to.be.equal(false)
    })
  })

  it('should throw error when reducing strings', function () {
    expect(() => shortcuttedReduce('string' as any as string[], () => {}, false as any)).to.throw()
  })

  it('should throw error when reducing numbers', function () {
    expect(() => shortcuttedReduce(42 as any as string[], () => {}, false as any)).to.throw()
  })

  it('should throw error when reducing booleans', function () {
    expect(() => shortcuttedReduce(true as any as string[], () => {}, false as any)).to.throw()
  })

  it('should throw error when using an object as accumulator', function () {
    expect(() => shortcuttedReduce([], () => {}, {} as any)).to.throw()
  })

  it('should throw error when using an array as accumulator', function () {
    expect(() => shortcuttedReduce([], () => {}, [] as any)).to.throw()
  })
})
