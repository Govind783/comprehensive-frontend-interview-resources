function cusF(cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    const currEL = this[i];
    if (cb(currEL, i, this)) res.push(currEL);
  }
  return res;
}
Array.prototype.cusFilter = cusF;
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr.cusFilter((item) => item % 2 == 0));
