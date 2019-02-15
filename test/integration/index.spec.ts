import _ from 'lodash'
import lodashMixins from '../../src/index'
import { expect } from 'chai'

const injectedMethods = [
  'fromPairsMap',
  'getTruthyKeys',
  'hasTruthyValues',
  'mapNonNil',
  'mergeForEach',
  'mGet',
  'shortcuttedReduce'
]

describe('Exported package', function () {
  describe('Before loading mixins', function () {
    for (const method of injectedMethods) {
      it(`Should not have «${method}» present`, function () {
        expect(_).to.not.have.property(method).that.is.a('function')
      })
    }
  })

  describe('When loading exported package', function () {
    before('Load mixins', function () {
      lodashMixins(_)
    })

    for (const method of injectedMethods) {
      it(`Should have «${method}» present`, function () {
        expect(_).to.have.property(method).that.is.a('function')
      })
    }
  })
})