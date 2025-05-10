const n = [1, 4, 5, 6];
console.log(n.includes(2));

function cusInc(num) {
  for (let i = 0; i < this.length; i++) {
    if (num === this[i]) return true;
  }
  return false;
}

Array.prototype.inc = cusInc;
console.log(n.inc(2));