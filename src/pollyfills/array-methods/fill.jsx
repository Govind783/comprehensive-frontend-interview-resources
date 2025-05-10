function cusFill(val, si = 0, ei = this.length) {
  for (let i = si; i < ei; i++) {
    this[i] = val;
  }
  return this;
}

Array.prototype.fi = cusFill;
const x = [1, 4, 7, 8, 9, 10, 202];
const y = [];
x.fi("", 0, 4);
y.fi("govind", 0, 10);
console.log(x);
console.log(y);
