# f-mocha

Mocha wrapper for f-promise

`f-mocha` is a companion package for [`f-promise`](https://github.com/Sage/f-promise). 
It provides the small wrapper which is needed to run unit tests written with mocha and f-promise.

## Installation

``` sh
npm install --save-dev f-mocha
```

## Usage

Add the following lines at the top of your unit test files to enable the wrapper:

```js
import { setup } from 'f-mocha';

// this call activates the wrapper.
setup();
```

Now you can write your tests as if they were all synchronous. 
See [this unit test](test/basic-test.ts) for an example.

## License

MIT.

