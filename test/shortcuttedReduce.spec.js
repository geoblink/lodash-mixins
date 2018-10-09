const shortcuttedReduce = require('../src/shortcuttedReduce')
const chai = require('chai')
const sinon = require('sinon')
const { expect } = chai
const sandbox = sinon.createSandbox()
chai.use(require('sinon-chai'))

describe('shortcuttedReduce', function () {
  const helpers = {
    returnTrue () {
      return true
    },

    returnAccumulator (accum) {
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
      for (let i = 0; i < Object.keys(list); i++) {
        expect(helpers.returnAccumulator.getCall(i)).to.have.been.calledWith(false, list[i], i)
      }
      expect(result).to.be.equal(false)
    })
  })

  describe('with objects', function () {
    it('should finish early on change', function () {
      const list = { a: 'b', c: 'd', e: 'f', g: 'h' }
      const result = shortcuttedReduce(list, helpers.returnTrue, false)
      expect(helpers.returnTrue).to.be.calledOnce // eslint-disable-line no-unused-expressions
      expect(helpers.returnTrue).to.be.calledWith(false, list[Object.keys(list)[0]], Object.keys(list)[0])
      expect(result).to.be.equal(true)
    })

    it('should traverse all items if nothing changes', function () {
      const list = { a: 'b', c: 'd', e: 'f', g: 'h' }
      const result = shortcuttedReduce(list, helpers.returnAccumulator, false)
      expect(helpers.returnAccumulator).to.have.callCount(Object.keys(list).length)
      for (let i = 0; i < Object.keys(list); i++) {
        const key = Object.keys(list)[i]
        expect(helpers.returnAccumulator.getCall(i)).to.have.been.calledWith(false, list[key], key)
      }
      expect(result).to.be.equal(false)
    })
  })

  it('should throw error when reducing strings', function () {
    expect(() => shortcuttedReduce('string', () => {}, false)).to.throw()
  })

  it('should throw error when reducing numbers', function () {
    expect(() => shortcuttedReduce(42, () => {}, false)).to.throw()
  })

  it('should throw error when reducing booleans', function () {
    expect(() => shortcuttedReduce(true, () => {}, false)).to.throw()
  })

  it('should throw error when using an object as accumulator', function () {
    expect(() => shortcuttedReduce([], () => {}, {})).to.throw()
  })

  it('should throw error when using an array as accumulator', function () {
    expect(() => shortcuttedReduce([], () => {}, [])).to.throw()
  })
})
