const chai = require('chai')
const { expect } = chai
chai.use(require('sinon-chai'))
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
require('../src')(_)

describe('Index imports', function () {
  let lodashMixinsFuncs
  before(function () {
    const notLodashMixinsFiles = ['index.js', 'constants.js']
    fs.readdir('src', function (err, files) {
      if (err) {
        return false
      }
      var lodashMixinsFiles = _.reject(files, function (f) {
        return _.includes(notLodashMixinsFiles, f)
      })
      lodashMixinsFuncs = _.map(lodashMixinsFiles, function (f) {
        return path.basename(f, path.extname(f))
      })
    })
  })
  it('There should be a lodash function for each src file', function () {
    _.forEach(lodashMixinsFuncs, function (f) {
      expect(_).to.have.property(f).that.is.a('function')
    })
  })
})
