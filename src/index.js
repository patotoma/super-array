'use strict';

function SuperArray(array, identifyFn) {
  if (!array) {
    array = [];
  } else {
    array = array.slice(); // create new reference
  }
  if (!identifyFn) {
    identifyFn = function(item) {
      return item.id;
    }
  }

  array.positions = {};
  array.forEach(function(item, i) {
    array.positions[identifyFn(item)] = i;
  });

  return new Proxy(array, {
    get: function(target, name) {
      switch (name) {
        case 'push':
          return function() {
            var args = Array.from(arguments);
            args.forEach(function(item, i) {
              target.positions[identifyFn(item)] = target.length + i;
            });
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this, args);
            target.positions = positions;
            return res;
          }
        case 'unshift':
          return function() {
            var args = Array.from(arguments);
            Object.keys(target.positions).forEach(function(id) {
              target.positions[id] += args.length;
            });
            args.forEach(function(item, i) {
              target.positions[identifyFn(item)] = i;
            });
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this, args);
            target.positions = positions;
            return res;
          }
        case 'shift':
          return function() {
            if (target.length === 0) {
              return;
            }
            var id = identifyFn(target[0]);
            delete target.positions[id];
            Object.keys(target.positions).forEach(function(id) {
              target.positions[id]--;
            });
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this);
            target.positions = positions;
            return res;
          }
        case 'pop':
          return function() {
            if (target.length === 0) {
              return;
            }
            var id = identifyFn(target[target.length - 1]);
            delete target.positions[id];
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this);
            target.positions = positions;
            return res;
          }
        case 'reverse':
          return function() {
            Object.keys(target.positions).forEach(function(id, i, arr) {
              target.positions[id] = -1 * (target.positions[id] - (arr.length - 1));
            });
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this);
            target.positions = positions;
            return res;
          }
        case 'splice':
          return function() {
            var args = Array.from(arguments);
            // start
            var start = 0; // default 0
            if (args[0] !== undefined) {
              if (args[0] < 0) {
                if (Math.abs(args[0]) > target.length) {
                  start = 0;
                } else {
                  start = target.length - Math.abs(args[0]);
                }
              } else {
                if (args[0] > target.length) {
                  start = target.length;
                } else {
                  start = args[0];
                }
              }
            }
            // deleteCount
            var deleteCount = target.length - start; // default till the end
            if (args[1] !== undefined) {
              if (args[1] > target.length - start) {
                deleteCount = target.length - start;
              } else {
                deleteCount = args[1];
              }
            }
            // items to be added
            var items = args.slice(2);
            // offset
            if (items.length > 0) {
              for (var i = start; i < target.length; i++) {
                var id = identifyFn(target[i]);
                target.positions[id] += items.length - 1;
              }
            }
            // remove deleteCount number of elements starting at start index
            for (var i = start; i < deleteCount + start; i++) {
              var id = identifyFn(target[i]);
              delete target.positions[id];
            }
            // insert items if any at that position
            items.forEach(function(item, i) {
              target.positions[identifyFn(item)] = i + start;
            });
            var positions = JSON.parse(JSON.stringify(target.positions));
            var res = target[name].apply(this, args);
            target.positions = positions;
            return res;
          }
        case 'sort':
          return function(compareFunction) {
            target[name].apply(this, compareFunction);
            target.positions = {}; // reset
            // map positions again
            target.forEach(function(item, i) {
              target.positions[identifyFn(item)] = i;
            });
            return target;
          }
        case 'get':
          return function(id) {
            return target[target.positions[id]];
          }
        default:
          return target[name];
      }
    },
    set: function(target, name, value) {
      var id = identifyFn(value);
      // remove previous position if any
      if (target[name]) {
        delete target.positions[id];
      }
      // set the value
      target[name] = value;
      // set new position
      var index = parseInt(name);
      if (typeof(index) === 'number' && !isNaN(index)) {
        target.positions[identifyFn(value)] = index;
      }
      // indicate success
      return true;
    }
  });
}

module.exports = SuperArray;
