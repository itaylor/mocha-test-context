const mochaTestContext = require('./index.js');
const assert = require('assert');

describe('basic', () => {
  it('works in test', () => {
    const { file, title, fullTitle } = mochaTestContext();
    assert.strictEqual('test.js', file);
    assert.strictEqual('works in test', title);
    assert.strictEqual('basic works in test', fullTitle);
  });
})

describe('before/after', () => {
  before(() => {
    const { file, title, fullTitle } = mochaTestContext();
    assert.strictEqual('test.js', file);
    assert.strictEqual('"before all" hook for "always true"', title);
    assert.strictEqual('before/after "before all" hook for "always true"', fullTitle);
  });
  after(() => {
    const { file, title, fullTitle } = mochaTestContext();
    assert.strictEqual('test.js', file);
    assert.strictEqual('"after all" hook for "always true"', title);
    assert.strictEqual('before/after "after all" hook for "always true"', fullTitle);
  });
  it('always true', () => {
    assert.strictEqual(true, true);
  });
});

describe('beforeEach/afterEach', () => {
  beforeEach(() => {
    const { file, title, fullTitle } = mochaTestContext();
    assert.strictEqual('test.js', file);
    assert.strictEqual('"before each" hook for "always true"', title);
    assert.strictEqual('beforeEach/afterEach "before each" hook for "always true"', fullTitle);
  });
  afterEach(() => {
    const { file, title, fullTitle } = mochaTestContext();
    assert.strictEqual('test.js', file);
    assert.strictEqual('"after each" hook for "always true"', title);
    assert.strictEqual('beforeEach/afterEach "after each" hook for "always true"', fullTitle);
  });
  it('always true', () => {
    assert.strictEqual(true, true);
  });
})

describe('nested describe', () => {
  describe('another level', () => {
    it('ok', () => {
      const { file, title, fullTitle } = mochaTestContext();
      assert.strictEqual('test.js', file);
      assert.strictEqual('ok', title);
      assert.strictEqual('nested describe another level ok', fullTitle);
    });
  });
});

it('toplevel test', () => {
  const { file, title, fullTitle } = mochaTestContext();
  assert.strictEqual('test.js', file);
  assert.strictEqual('toplevel test', title);
  assert.strictEqual('toplevel test', fullTitle);
});