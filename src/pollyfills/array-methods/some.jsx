const x = [3, 4, 5, 6, 7];
x.some((i) => i % 2 == 0);

function ss(cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) return true;
  }
  return false;
}

Array.prototype.so = ss;
x.so((i) => i % 2 == 0);