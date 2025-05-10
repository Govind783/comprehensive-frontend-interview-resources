const compareEM = (o1, o2) => {
  if (o1 == o2) return true;

  if (o1 == null || o2 == null) return false;

  if (o1 instanceof Date && o2 instanceof Date) return new Date(o1.getMinutes()) === new Date(o2.getMinutes());

  if (o1 instanceof RegExp && o2 instanceof RegExp) return String(o1) == String(o2);

  if (Array.isArray(o1) && Array.isArray(o2)) {
    if (o1.length !== o2.length) return false;
    for (let i = 0; i < o1.length; i++) {
      if (!compareEM(o1[i], o2[i])) return false;
    }
    return true;
  }

  if (typeof o1 === "object" && typeof o2 === "object") {
    const k1 = Object.keys(o1);
    const k2 = Object.keys(o2);

    if (k1.length !== k2.length) return false;

    for (let i of k1) {
      if (!compareEM(o1[i], o2[i])) return false;
    }
    return true;
  }
  return false;
};

const x1 = {
  govind: "age",
  age: "10",
  hob: [1, 2, 3],
  nest: {
    1: 2,
    2: {
      3: 4,
      govind: "again",
    },
  },
};

const x2 = {
  govind: "age",
  age: "10",
  hob: [1, 2, 3],
  nest: {
    1: 2,
    2: {
      3: 4,
      govind: "again",
    },
  },
};

compareEM(x1, x2);
