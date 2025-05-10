const object = {
  name: "govind",
  age: "300",
  arr1: ["1", 2, 3],
  arr2: [{ d: "e" }, { f: "g" }],

  data: {
    prof: "dev",
    city: "blr",
    oneMore: {
      nesting: "last",
      arr2: [{ d: "e" }, { f: "g" }],
    },
  },
};

// const easyFlatWithoutArray = (obj, parent, res = {}) => {
//   for (let key in obj) {
//     const combined = parent ? parent + "." + key : key;

//     if (typeof obj[key] === "object") {
//       easyFlatWithoutArray(obj[key], combined, res);
//     } else {
//       res[combined] = obj[key];
//     }
//   }
//   return res;
// };

const flatten = (obj, parent, res = {}) => {
  // recursion
  // null cases
  // arrays
  // objects
  // primite DS's

  for (let key in obj) {
    const combined = parent ? parent + "." + key : key;

    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        const arrayKey = `${combined}[${index}]`;

        // the thing inside could again be an object or an array so call it recursively here
        typeof item === "object" ? flatten(item, arrayKey, res) : (res[arrayKey] = item);
      });
    } else if (typeof obj[key] === "object") {
      flatten(obj[key], combined, res);
    } else {
      res[combined] = obj[key];
    }
  }
  return res
};

flatten(object)