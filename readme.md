# super-array
[![Travis](https://img.shields.io/travis/patotoma/super-array.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/super-array.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dw/super-array.svg?style=flat-square)]()
[![Coveralls](https://img.shields.io/coveralls/patotoma/super-array.svg?style=flat-square)]()
[![node](https://img.shields.io/node/v/super-array.svg?style=flat-square)]()
[![GitHub stars](https://img.shields.io/github/stars/patotoma/super-array.svg?style=social&label=Star&style=flat-square)]()
[![GitHub forks](https://img.shields.io/github/forks/patotoma/super-array.svg?style=social&label=Fork&style=flat-square)]()
[![license](https://img.shields.io/github/license/patotoma/super-array.svg?style=flat-square)]()
[![David](https://img.shields.io/david/patotoma/super-array.svg?style=flat-square)]()

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

### SuperArray(*arr*, *identifyFn*)

##### arr (optional):
* Type: `<Array>`
* Default: `[]`

##### identifyFn (optional):

* Type: `<Function(item):identifier>`
* Default: `function(item) { return item.id }`

Returns `SuperArray` instance.


## License

MIT © Patrik Toma
