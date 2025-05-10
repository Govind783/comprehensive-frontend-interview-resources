const x = [4, 5, 7, 8, 2, 1, 3, 4];
console.log(x.find((i) => i === 7));

function CF(cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) return this[i];
  }
  return undefined;
}

Array.prototype.fin = CF;
console.log(x.fin((i) => i == 7));
