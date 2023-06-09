
const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  it('entry', () => {
    assert.equal(baseConfig.entry.index, '/Users/muzi/my/study/webpack/my-webpack-project/builder-webpack-config/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, '/Users/muzi/my/study/webpack/my-webpack-project/builder-webpack-config/test/smoke/template/src/search/index.js');
  });
});
