const o1 = {
  name: "gpvind",
  age: 20,
  pro: {
    dev: {
      frontend: "true",
      date: new Date(),
    },
  },
};

const toKeys = (obj, parent) => {
  const res = [];
  for (let key in obj) {
    const combined = parent ? parent + "." + key : key;

    if (typeof obj[key] == "object") {
      res.push(combined);
      res.push(...toKeys(obj[key], combined));
    } else {
      res.push(combined);
    }
  }
  return res;
};

toKeys(o1);
