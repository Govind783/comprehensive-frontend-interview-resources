const allPromises = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject("need an array");

    if (Array.isArray(promises) && promises.length == 0) return reject("cannot be empty");

    const result = [];
    const promisesToResolve = [...promises];
    let totalNumToExecute = promises.length; // to track how many have i executed

    promisesToResolve.forEach((asyncTask, index) => {
      Promise.resolve(asyncTask)
        .then((value) => {
          result[index] = value;
          totalNumToExecute--;

          if (totalNumToExecute == 0) {
            // u have resolved all prs
            resolve(result);
          }
        })
        .catch((err) => {
          reject(`Promise failed at ${index}  reason ${err}`);
        });
    });
  });
};

Promise.ap = allPromises;

const asy = async () => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r(true);
    }, 200);
  });
};

(async () => {
  console.log("====================================");
  console.log(await Promise.ap([asy(), asy(), asy()]));
  console.log("====================================");
})();
