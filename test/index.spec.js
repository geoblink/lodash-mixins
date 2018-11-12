const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')

const chai = require('chai')
chai.use(require('sinon-chai'))
const { expect } = chai

require('../src')(_)

describe('Index imports', function () {
  it('Should have added a function to Lodash for each src file', async function () {
    const notLodashMixinsFiles = {
      'index.js': true,
      'constants.js': true
    }
    const files = await fs.readdir('src')
    const lodashMixinsFiles = _.reject(files, f => f in notLodashMixinsFiles)
    const lodashMixinsFuncs = _.map(lodashMixinsFiles, f => path.basename(f, path.extname(f)))

    for (const functionName of lodashMixinsFuncs) {
      expect(_).to.have.property(functionName).that.is.a('function')
    }
  })
})
