function myReduce(cb, initialVal) {
  let finalVal = initialVal;
  for (let i = 0; i < this.length; i++) {
    finalVal = finalVal ? cb(finalVal, this[i], i, this) : this[i];
  }
  return finalVal;
}

Array.prototype.MR = myReduce;

const x = [1, 2, 3, 5, 6];
const s1 = x.MR((acc, curr) => {
  return acc + curr;
}, 0);

const eve = x.MR((acc, curr) => {
  if (curr % 2 == 0) acc.push(curr);
  return acc;
}, []);

console.log(s1);
console.log(eve);
