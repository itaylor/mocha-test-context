# mocha-test-context
Provides a way to get information about the currently running Mocha test, without needing to pass it from the test itself.

## Why would I want this?
Yeah, it's kinda niche.  You can get this information on a per-test basis from inside a mocha test with `this.test`.  Why not just do that? Probably you're writing some sort of test reporting/logging tool.  You need to know the currently running test's name and you don't want to change hundreds of test cases to pass the name of the test down with `this.test.title` from each and every test. 

Or, you have some other process that runs alongside your tests (like puppeteer) and you need a way know what test was running when it dies or something.

## Installation
You probably want this as a dev dependency, because it's testware.

```bash
yarn add --dev mocha-test-context
# or
npm install -D mocha-test-context
```

You then need to require `mocha-test-context` before running the mocha test.  This can be done with the argument `mocha -r mocha-test-context` 

## Usage
```js
const mochaTestContext = require('mocha-test-context');

describe('my suite', () => {
  it('is my test', () => {
    // ... some mocha test code here...
    console.log(mochaTestContext());
    // this would print:
    //{ title: 'is my test', fullTitle: 'my suite is my test', file: 'test.js' }
  });
})
```

## How does it work?
It reaches into the guts of Mocha's `Runnable` class and overrides the prototype to capture the data and make it avaliable.
