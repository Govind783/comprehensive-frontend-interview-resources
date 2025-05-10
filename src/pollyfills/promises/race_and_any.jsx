// race returns the first promise that resolves or rejects
// Promise.any: Returns the first promise to resolve successfully. It only rejects if ALL promises reject (with an AggregateError)

const customRace = (arr) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) return reject(false);

    if (Array.isArray(arr) && !arr.length) return reject(false);
    const promises = [...arr];

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  });
};

Promise.cr = customRace;

const asy = async () => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r(true);
    }, 200);
  });
};

(async () => {
  console.log("====================================");
  console.log(await Promise.cr([asy(), asy(), asy()]));
  console.log("====================================");
})();

const customAny = (arr) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) return reject(false);

    if (Array.isArray(arr) && !arr.length)
      return reject(false);

    let failureCount = 0;
    const promises = [...arr];
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          failureCount++;
          if (failureCount == arr.length) {
            return reject(false);
          }
        });
    });
  });
};

Promise.cany = customAny;

const asy2 = async () => {
  return new Promise((r, j) => {
    setTimeout(() => {
      j(false);
    }, 200);
  });
};
(async () => {
  console.log("====================================");
  console.log(await Promise.cany([asy2(), asy2(), asy2()]));
  console.log("====================================");
})();
