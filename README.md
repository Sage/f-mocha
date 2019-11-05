# f-mocha

Mocha wrapper for f-promise

`f-mocha` is a companion package for [`f-promise`](https://github.com/Sage/f-promise).
It provides the small wrapper which is needed to run unit tests written with mocha and f-promise.

## Installation

```sh
npm install --save-dev f-mocha
```

## Usage

Just run Mocha with the following argument

```js
mocha --ui f-mocha
```

Now you can write your tests as if they were all synchronous.
See [this unit test](test/basic-test.ts) for an example.

## License

MIT.
