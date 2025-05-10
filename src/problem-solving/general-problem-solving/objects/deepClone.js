const deepCloneObject = (obj) => {
  if (obj == null || obj == undefined) return obj;

  if (obj instanceof Date) return new Date(obj.getMinutes());

  if (obj instanceof RegExp) return new RegExp(obj);

  if (Array.isArray(obj)) {
    return obj.map((i) => deepCloneObject(i));
  }

  if (typeof obj != "object") return obj;

  if (typeof obj == "object") {
    const result = {};

    for (let key in obj) {
      result[key] = deepCloneObject(obj[key]);
    }
    return result;
  }
  return obj;
};

const o1 = {
  name: "gpvind",
  age: 20,
  pro: {
    dev: {
      frontend: "good",
      date: new Date(),
    },
    intreste: ["dev", "prod", "ui/ux"],
  },
};

const o2 = deepCloneObject(o1);
o1.age = 1;
o1.pro.dev.frontend = true;
console.log(o1);
console.log(o2);
