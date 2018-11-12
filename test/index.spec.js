const chai = require('chai')
const { expect } = chai
chai.use(require('sinon-chai'))
const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
require('../src')(_)

describe('Index imports', function () {
  it('There should be a lodash function for each src file', async function () {
    const notLodashMixinsFiles = {
      'index.js': true,
      'constants.js': true
    }
    const files = await fs.readdir('src')
    const lodashMixinsFiles = _.reject(files, f => f in notLodashMixinsFiles)
    const lodashMixinsFuncs = _.map(lodashMixinsFiles, f => path.basename(f, path.extname(f)))
    _.forEach(lodashMixinsFuncs, function (f) {
      expect(_).to.have.property(f).that.is.a('function')
    })
  })
})
