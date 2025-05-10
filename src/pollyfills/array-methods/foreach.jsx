const x = [1, 2, 3, 4];
x.forEach((item, index, arr) => (arr[index] = item * 2));
console.log(x); // [2, 4, 6, 8]

function cusFor(cb) {
  for (let i = 0; i < this.length; i++) {
    this[i] = cb(this[i], i, this);
  }
  return undefined;
}

Array.prototype.cusForEach = cusFor;

x.forEach((item, index, arr) => (arr[index] = item * 2));
console.log(x); // [2, 4, 6, 8]
