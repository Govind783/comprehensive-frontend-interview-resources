function CustomProm(executor) {
  let state = "pending",
    value,
    onResolve,
    onReject;

  const resolver = (val) => {
    if (state !== "pending") return;
    state = "resolved";
    value = val;
    if (onResolve) onResolve(value);
  };

  const rejector = (err) => {
    if (state !== "pending") return;
    state = "rejected";
    value = err;
    if (onReject) onReject(value);
  };
  executor(resolver, rejector);

  return {
    then(cb, errCB) {
      return CustomProm((resolve, reject) => {
        onResolve = (data) => resolve(cb(data));

        onReject = errCB ? (val) => resolve(errCB(val)) : (err) => reject(err);

        if (value == "resolved") onResolve(value);
        if (value == "rejected") onReject(value);
      });
    },
    catch(err) {
      return this.then(null, err);
    },
  };
}

const task = () => {
  return new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 100);
  });
};

const task2 = () => {
  return CustomProm((r, j) => {
    setTimeout(() => {
      // r(true)
      j(false, "rejected prom");
    }, 100);
  });
};

const t1 = task();
const t2 = task2();
t1.then((d) => console.log(d, "BUILT IN"));
t2.then((d) => console.log(d, "GOVIND, CUSTOM")).catch((e) => console.log(e, "in catch block custom one"));
