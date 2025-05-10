function cusFlat(depth = 1) {
  const result = [];

  function flatten(arr, currDepth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currDepth < depth) {
        flatten(arr[i], currDepth + 1);
      } else {
        result.push(arr[i]);
      }
    }
  }

  flatten(this, 0);

  return result;
}

Array.prototype.fl = cusFlat;

const x = [1, 2, [3, 4], 5, [6, [7, 8]]];
console.log(x.fl()); // [1, 2, 3, 4, 5, 6, [7, 8]]
console.log(x.fl(2)); // [1, 2, 3, 4, 5, 6, 7, 8]
