const SuperArray = require('./src/index');

const sampleItems = [
  {id: 'a0', name: 'Adam'},
  {id: 'a1', name: 'Anton'},
  {id: 'a2', name: 'Alfred'},
  {id: 'a3', name: 'August'},
  {id: 'a4', name: 'Adolf'},
];

const sampleNewItems = [
  {id: 'b0', name: 'Bob'},
  {id: 'b1', name: 'Brad'},
  {id: 'b2', name: 'Brandon'},
  {id: 'b3', name: 'Boris'},
  {id: 'b4', name: 'Beta'},
  {id: 'b5', name: 'Beatrix'},
];

function sampleIdentifyFn(item) {
  return item.name;
}

test('is defined', () => {
  expect(SuperArray).toBeDefined();
});
test('can initialize', () => {
  const superArray = SuperArray(sampleItems);
  sampleItems.forEach(function(sampleItem, i) {
    expect(superArray[i]).toEqual(sampleItem);
  });
  expect(superArray instanceof Array).toBeTruthy();
});
test('can initialize with new operator', () => {
  const superArray = new SuperArray(sampleItems);
  sampleItems.forEach(function(sampleItem, i) {
    expect(superArray[i]).toEqual(sampleItem);
  });
  expect(superArray instanceof Array).toBeTruthy();
});
test('can initialize without params', () => {
  const superArray = SuperArray();
  expect(superArray).toBeDefined();
  expect(superArray.length).toBe(0);
  expect(superArray instanceof Array).toBeTruthy();
});
test('can initialize with new operator without params', () => {
  const superArray = new SuperArray();
  expect(superArray).toBeDefined();
  expect(superArray.length).toBe(0);
  expect(superArray instanceof Array).toBeTruthy();
});
test('can access by index', () => {
  const superArray = new SuperArray(sampleItems);
  sampleItems.forEach(function(sampleItem, i) {
    expect(superArray[i]).toEqual(sampleItem);
  });
});
test('can directly access', () => {
  const superArray = new SuperArray(sampleItems);
  sampleItems.forEach(function(sampleItem) {
    expect(superArray.get(sampleItem.id)).toEqual(sampleItem);
  });
});
test('can directly access with custom identifyFn', () => {
  const superArray = new SuperArray(sampleItems, sampleIdentifyFn);
  sampleItems.forEach(function(sampleItem) {
    expect(superArray.get(sampleItem.name)).toEqual(sampleItem);
  });
});
test('can modify array with push()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.push(sampleNewItems[0], sampleNewItems[1]);
  const comparator = sampleItems.slice();
  const compareResult = comparator.push(sampleNewItems[0], sampleNewItems[1]);
  expect(result).toBe(compareResult);
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with unshift()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.unshift(sampleNewItems[0], sampleNewItems[1]);
  const comparator = sampleItems.slice();
  const compareResult = comparator.unshift(sampleNewItems[0], sampleNewItems[1]);
  expect(result).toBe(compareResult);
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with shift()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.shift();
  const comparator = sampleItems.slice();
  const compareResult = comparator.shift();
  expect(result).toEqual(compareResult);
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with pop()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.pop();
  const comparator = sampleItems.slice();
  const compareResult = comparator.pop();
  expect(result).toEqual(compareResult);
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with reverse()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.reverse();
  const comparator = sampleItems.slice();
  const compareResult = comparator.reverse();
  compareResult.forEach(function(item, i) {
    expect(result[i]).toEqual(item);
  });
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with splice()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.splice(2, 1, sampleNewItems[0], sampleNewItems[1]);
  const comparator = sampleItems.slice();
  const compareResult = comparator.splice(2, 1, sampleNewItems[0], sampleNewItems[1]);
  compareResult.forEach(function(item, i) {
    expect(result[i]).toEqual(item);
  });
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array with sort()', () => {
  const superArray = new SuperArray(sampleItems);
  const result = superArray.sort();
  const comparator = sampleItems.slice();
  const compareResult = comparator.sort();
  compareResult.forEach(function(item, i) {
    expect(result[i]).toEqual(item);
  });
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
test('can modify array by setting new indexes', () => {
  const superArray = new SuperArray(sampleItems);
  superArray[1] = sampleNewItems[1];
  superArray[2] = sampleNewItems[2];
  superArray[5] = sampleNewItems[4];
  const comparator = sampleItems.slice();
  comparator[1] = sampleNewItems[1];
  comparator[2] = sampleNewItems[2];
  comparator[5] = sampleNewItems[4];
  expect(superArray.length).toBe(comparator.length);
  comparator.forEach(function(item, i) {
    expect(superArray[i]).toEqual(item);
    expect(superArray.get(item.id)).toEqual(item);
  });
});
