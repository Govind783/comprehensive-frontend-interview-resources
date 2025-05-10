function customMap(cb) {
  const res = [];

  for (let i = 0; i < this.length; i++) {
    const callbackFn_Computed = cb(this[i], i, this);
    console.log(callbackFn_Computed);

    res.push(callbackFn_Computed);
  }
  return res;
}

Array.prototype.cusMap = customMap;

const n = [1, 4, 5];
console.log(n.cusMap((item) => item * 5));