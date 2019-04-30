import * as _ from 'lodash'
import lodashMixins from '../..'
import { expect } from 'chai'

import injectedMethods from '../exportedMethods'

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
