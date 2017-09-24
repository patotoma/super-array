# super-array
[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/patotoma/super-array

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/super-array

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/patotoma/super-array

> Just like a normal JavaScript Array but enhanced with constant O(1) access time for properties by unique key!


## Install

```
$ npm install --save super-array
```


## Usage

```js
const SuperArray = require('super-array');

const myArray = new SuperArray([
  {id: 'ab1', name: 'John'},
  {id: 'ab2', name: 'Peter'},
]);

myArray.get('ab1') // {id: 'ab1', name: 'John'}
myArray.get('ab2') // {id: 'ab2', name: 'Peter'}
```

or you can use a custom identifier function:
(please note that the identifier has to be unique)

```js
const SuperArray = require('super-array');

const myArray = new SuperArray([
  {id: 'ab1', name: 'John'},
  {id: 'ab2', name: 'Peter'},
], function(item) { return item.name });

myArray.get('John') // {id: 'ab1', name: 'John'}
myArray.get('Peter') // {id: 'ab2', name: 'Peter'}
```

## API

### AggregateError(*arr*, *identifyFn*)

##### arr (optional):
* Type: `<Array>`
* Default: `[]`

##### identifyFn (optional):

* Type: `<Function(item):identifier>`
* Default: `function(item) { return item.id }`

Returns `SuperArray` instance.


## License

MIT © Patrik Toma
