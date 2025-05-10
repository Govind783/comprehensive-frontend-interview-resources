// Promise.allSettled Rules:

// It takes an array of promises as input
// It always resolves (never rejects)
// It resolves with an array of objects describing the outcome of each promise
// Each object in the result array has:

// For fulfilled promises: { status: 'fulfilled', value: result }
// For rejected promises: { status: 'rejected', reason: error }

// The result array maintains the same order as the input array
// Empty arrays resolve to an empty array
// It waits for all promises to settle (either fulfill or reject)

const allSet = (arr) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) return reject(false);

    if (Array.isArray(arr) && !arr.length) return resolve([]);

    let pendingPromises = arr.length;
    const finalArr = [];
    const promises = [...arr];

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          pendingPromises--;
          finalArr[index] = {
            index,
            status: "fulfilled",
            value,
          };
          if (!pendingPromises) resolve(finalArr);
        })
        .catch((err) => {
          pendingPromises--;
          finalArr[index] = {
            index,
            status: "rejected",
            reason: err,
          };
          if (!pendingPromises) resolve(finalArr);
        });
    });
  });
};

Promise.as = allSet;

const asy = async () => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r(true);
    }, 200);
  });
};

(async () => {
  console.log("====================================");
  console.log(await Promise.as([asy(), asy(), asy()]));
  console.log("====================================");
})();
