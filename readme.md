# super-array
[![Travis](https://img.shields.io/travis/patotoma/super-array.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/super-array.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dw/super-array.svg?style=flat-square)]()
[![Coverage Status](https://coveralls.io/repos/github/patotoma/super-array/badge.svg?branch=master)](https://coveralls.io/github/patotoma/super-array?branch=master)
[![node](https://img.shields.io/node/v/super-array.svg?style=flat-square)]()
[![GitHub stars](https://img.shields.io/github/stars/patotoma/super-array.svg?style=social&label=Star&style=flat-square)]()
[![GitHub forks](https://img.shields.io/github/forks/patotoma/super-array.svg?style=social&label=Fork&style=flat-square)]()
[![license](https://img.shields.io/github/license/patotoma/super-array.svg?style=flat-square)]()
[![David](https://img.shields.io/david/patotoma/super-array.svg?style=flat-square)]()

> Simple utility for enhancing any JavaScript Array with constant O(1) access for properties by unique key

> Just like a normal Array but enhanced with a custom .get(id) method

> Both for Node and Browser

## Install

```
$ npm install --save super-array
```

or with [Yarn](yarnpkg.com):

```
$ yarn add super-array
```

## Usage

```js
const SuperArray = require('super-array');

const myArray = new SuperArray([
  {id: 'ab1', name: 'John'},
  {id: 'ab2', name: 'Peter'},
]);

console.log(myArray.get('ab1')); // {id: 'ab1', name: 'John'}
console.log(myArray.get('ab2')); // {id: 'ab2', name: 'Peter'}
```

or you can use a custom identifier function:
*(please note that the returned identifier has to be unique)*

```js
const SuperArray = require('super-array');

const myArray = new SuperArray([
  {id: 'ab1', name: 'John'},
  {id: 'ab2', name: 'Peter'},
], function(item) { return item.name });

console.log(myArray.get('John')); // {id: 'ab1', name: 'John'}
console.log(myArray.get('Peter')); // {id: 'ab2', name: 'Peter'}
```

## API

### SuperArray(*arr*, *identifyFn*)

##### arr (optional):
* Type: `<Array>`
* Default: `[]`

##### identifyFn (optional):

* Type: `<Function(item|object):identifier|string>`
* Default: `function(item) { return item.id }`

Returns `SuperArray` instance.


## Support

**SuperArray** uses ES6 [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for object manipulation. Proxies are awesome feature of ES2015 that enables redefining some language operations. For example we can intercept every object property access with our own function.

The problem is that proper Proxy implementation requires native browser support and implementing them with ES5 is not suitable for production environments because performance impact is huge. Supported list:

* Chrome 49+
* Firefox 54+
* Edge 14+
* Safari 10.1+
* Opera 47+
* Node 6+


You can see the full list [here](http://caniuse.com/#feat=proxy).


## Contributions

Open for PRs!


## License

MIT © Patrik Toma
