const isPalindrome = (str) => {
  let left = 0;
  let right = str.length - 1;
  while (left <= right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
};

isPalindrome("121");

const printFiboTillCertainPoint = (num) => {
  //   The Fibonacci sequence starts with 0, 1, and each next number is the sum of the previous two.
  // Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
  const arr = [0, 1];
  for (let i = 2; i <= num; i++) {
    const currSum = arr[i - 2] + arr[i - 1];
    arr.push(currSum);
  }
  return arr;
};

console.log(printFiboTillCertainPoint(10));

const longestSequesnceOfneighbours = (arr) => {
  let currMax = 0;
  let master = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i - 1] == arr[i]) {
      currMax++;
      master = Math.max(master, currMax);
    } else {
      currMax = 0;
    }
  }
  return master;
};

const rotateArrayOptimised = (arr, k) => {
  let size = arr.length;
  k = k % size;

  reverse(arr, 0, size - 1);
  reverse(arr, 0, k);
  reverse(arr, k, size - 1);
  return arr;
};

const reverse = (arr, i, j) => {
  while (i <= j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
};

console.log(rotateArrayOptimised([-1, -100, 3, 99], 2));

const infiniteCurruing = (a) => {
  return function (b) {
    if (b) return infiniteCurruing(a + b);
    return a;
  };
};

infiniteCurruing(1)(2)(10)();
infiniteCurruing(1)();

const groupAnagrams = (arr) => {
  const obj = {};
  for (let i of arr) {
    const keyForID = i.split("").sort().join("");
    if (obj[keyForID]) {
      obj[keyForID].push(i);
    } else {
      obj[keyForID] = [i];
    }
  }
  return obj;
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

const move0s = (arr) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    if (arr[left] == 0) {
      let temp = arr[right];
      arr[right] = arr[left];
      arr[left] = temp;
      right--;
    } else {
      left++;
    }
  }
  return arr;
};

move0s([0, 1, 0, 3, 12]);

/*
  Given array with only values 0, 1, and 2
  Sort them in-place using two pointers
  Input: [2,0,2,1,1,0]
  Output: [0,0,1,1,2,2]
  
  Think: Similar to previous problem but with three values instead of two!
  */

const sortin = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    if (arr[left] === 2) {
      let temp = arr[right];
      arr[right] = arr[left];
      arr[left] = temp;
      right--;
    } else {
      left++;
    }
  }

  left = 0;
  right = arr.length - 1;

  while (left <= right) {
    if (arr[right] === 0) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
    } else {
      right--;
    }
  }
  return arr;
};
sortin([2, 0, 2, 1, 1, 0, 1, 2, 2, 1, 0, 0, 1, 2, 1, 0]);

const lengthOfLongestSubstring = (str) => {
  const seen = new Set();
  let left = 0;
  let master = 0;
  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      console.log(seen);

      seen.delete(str[left]);
      left++;
    }
    seen.add(str[right]);
    master = Math.max(master, right - left + 1);
  }
  return master;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3

function maxSumSubarray(arr, k) {
  // max sum withing a sub array
  let maxSum = 0;
  let currSum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    currSum += arr[right];
    if (right >= k - 1) {
      maxSum = Math.max(maxSum, currSum);
      currSum -= arr[left];
      left++;
    }
  }
  return maxSum;
}
maxSumSubarray([2, 3, 1, 4, 5, 6, 2, 1], 2);

function findAveragesOfSubarrays(arr, k) {
  const arr2 = [];
  let sum = 0;
  let left = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    if (right >= k - 1) {
      const currAvg = sum / k;
      arr2.push(currAvg);
      sum -= arr[left];
      left++;
    }
  }
  return arr2;
}

findAveragesOfSubarrays([2, 6, 10, 10, 70, 2], 2);

/// find the smallest num in an array with a window of size k and return all arr

const smallestiNSubar = (arr, k) => {
  const final = [];
  const tempArr = [];

  for (let right = 0; right < arr.length; right++) {
    tempArr.push(arr[right]);

    if (right >= k - 1) {
      const smallestInTheSubarr = Math.min(...tempArr);
      final.push(smallestInTheSubarr);
      tempArr.shift();
    }
  }
  return final;
};

smallestiNSubar([1, 3, 4, 6, 8, 90, 12, 4], 2);
smallestiNSubar([1, 3, 4, 6, 8, 90, 12, 4], 4);
smallestiNSubar([1, 3, 4, 6, 8, 90, 12, 4], 5);

const remoInPlace = (arr) => {
  let left = 0;
  arr.sort((a, b) => a - b);
  for (let right = 1; right < arr.length; right++) {
    if (arr[left] !== arr[right]) {
      left++;
      arr[left] = arr[right];
    }
  }
  return arr.slice(0, left + 1);
};

// Example usage:
const nums = [1, 4, 5, 67, 11, 2, 3, 21, 2, 3, 422, 3, 4, 522, 6, 22, 1, 2, 1, 1, 1, 1, 2, 4, 5];
console.log("Original array:", [...nums]);
const result = remoInPlace(nums);
console.log("After removing duplicates:", result);

var searchRange = function (arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let firstPos = -1;
  let lastPos = -1;

  // Find the first occurrence (leftmost)
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      firstPos = mid;
      right = mid - 1; // Continue searching on the left side
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // If target not found, return [-1, -1]
  if (firstPos === -1) {
    return [-1, -1];
  }

  // Reset for second search
  left = 0;
  right = arr.length - 1;

  // Find the last occurrence (rightmost)
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      lastPos = mid;
      left = mid + 1; // Continue searching on the right side
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [firstPos, lastPos];
};

searchRange([5, 7, 7, 8, 8, 10], 8);

const findSecondlargest = (arr) => {
  let largest = -1;
  let secondLargest = -1;

  if (arr.length < 2) {
    return Math.min(arr[0], arr[1]);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
      // fundametylally smaller than larges and greatern than secind largest
    } else if (arr[i] < largest && arr[i] > secondLargest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
};
console.log(findSecondlargest([3123, 45, 67, 8, 9, 11, 33, 4]));

const compress = (str) => {
  let finalStr = "";
  let conter = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == str[i + 1]) {
      ++conter;
    } else {
      if (conter + 1 !== 1) {
        finalStr += str[i] + (conter + 1);
      } else {
        finalStr += str[i];
      }
      conter = 0;
    }
  }
  return finalStr;
};

compress("aaa"); // 'a3'
compress("aaabba"); // 'a3b2a'
compress("aaabb"); // 'a3b2'
compress("a"); // 'a'
compress("aa"); // 'a2'

const twoObjectsEqual = (o1, o2) => {
  if (o1 == o2) return true;

  if (o1 == null || o2 == null) return false;

  // date/ regex, arr, object, nested pobject

  if (o1 instanceof Date && o2 instanceof Date) return o1.getTime() === o2.getTime();
  if (o1 instanceof RegExp && o2 instanceof RegExp) return String(o1) === String(o2);

  if (Array.isArray(o1) && Array.isArray(o2)) {
    if (o1.length !== o2.length) {
      return false;
    }

    for (let i = 0; i < o1.length; i++) {
      if (!twoObjectsEqual(o1[i], o2[i])) return false;
    }
    return true;
  }

  if (typeof o1 == "object" && typeof o2 == "object") {
    const key1 = Object.keys(o1);
    const key2 = Object.keys(o2);
    if (key1.length !== key2.length) return false;

    for (let i of key1) {
      if (!key2.includes(i)) return false;
      if (!twoObjectsEqual(o1[i], o2[i])) return false;
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

twoObjectsEqual(x1, x2);

const arr1 = [1, 4, 5, 9, 20, 22];
const arr2 = [2, 3, 6, 7, 8];

const mergeSortedArrays = (a1, a2) => {
  let a1p = 0;
  let a2p = 0;
  const final = [];
  while (a1p < a1.length && a2p < a2.length) {
    if (a1[a1p] <= a2[a2p]) {
      final.push(a1[a1p]);
      a1p++;
    } else {
      final.push(a2[a2p]);
      a2p++;
    }
  }

  while (a1p < a1.length) {
    final.push(a1[a1p]);
    a1p++;
  }

  while (a2p < a2.length) {
    final.push(a2[a2p]);
    a2p++;
  }
  return final;
};
mergeSortedArrays(arr1, arr2);

const maxProfit = (arr) => {
  let minBP = arr[0];
  let PR = 0;

  for (let i of arr) {
    if (i < minBP) {
      minBP = i;
    } else if (i - minBP > PR) {
      PR = i - minBP;
    }
  }
  return PR;
};

maxProfit([7, 1, 5, 3, 6, 4]);

const isAnagram = (s1, s2) => {
  const o1 = {},
    o2 = {};

  if (s1.length !== s2.length) return false;
  for (let i = 0; i < s1.length; i++) {
    o1[s1[i]] = (o1[s1[i]] || 0) + 1;
    o2[s2[i]] = (o2[s2[i]] || 0) + 1;
  }

  for (let key in o1) {
    if (o1[key] != o2[key]) return false;
  }
  return true;
};
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false

const mostWater = (arr) => {
  // ar = w * h
  // l and h
  let left = 0,
    right = arr.length - 1,
    maxAra = 0;
  while (left < right) {
    let width = right - left;
    let height = Math.min(arr[left], arr[right]);
    const area = width * height;

    maxAra = Math.max(area, maxAra);

    if (arr[left] < arr[right]) left++;
    else right--;
  }
  return maxAra;
};
mostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]);

const calculator = (() => {
  let max = 0;
  return {
    add(n) {
      max += n;
      return calculator;
    },
    subtract(n) {
      max -= n;
      return calculator;
    },
    divide(n) {
      max /= n;
      return calculator;
    },
    multiply(n) {
      max *= n;
      return calculator;
    },
    getTotal() {
      return max;
    },
  };
})();

console.log(calculator.add(10).subtract(2).divide(2).multiply(5).getTotal());

const groupEm = (arr) => {
  const groupOfOccurences = {};
  for (let i of arr) {
    if (!groupOfOccurences[i]) {
      groupOfOccurences[i] = 1;
    } else {
      groupOfOccurences[i] = groupOfOccurences[i] + 1;
    }
  }
  const final = {};
  for (let key in groupOfOccurences) {
    if (!final[groupOfOccurences[key]]) {
      final[groupOfOccurences[key]] = [];
    }
    final[groupOfOccurences[key]].push(key);
  }
  return Object.values(final);
};

console.log(groupEm([1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5]));

const isPangram = (str) => {
  const allWordsArr = "abcdefghijklmnopqrstuvwxyz".split("");
  return allWordsArr.every((i) => str.includes(i));
};

const bfs = (obj, node) => {
  const seen = new Set(),
    result = [];
  const currNode = [node];

  while (currNode.length > 0) {
    const processed = currNode.shift();
    if (!seen.has(processed)) {
      seen.add(processed);
      result.push(processed);
      currNode.push(...obj[processed]);
    }
  }
  return result;
};

const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F", "G"],
  D: [],
  E: [],
  F: [],
  G: [],
};

bfs(graph, "A");

const cachedApi = async () => {
  const cache = {};

  // NUANCE, make sure to empty the cache object since variables within closures are not auto garbage collected

  return async (URL, valid) => {
    const rn = Date.now();
    if (cache[URL] && cache[URL].expiry > rn) {
      console.log("cached");
      return cache[URL].data;
    }

    const newData = await makeApiCall(URL);
    cache[URL] = {
      data: newData,
      expiry: Date.now() + valid,
    };
    console.log("CALLED");
    return newData;
  };
};

const makeApiCall = async (URL) => {
  const res = await fetch(URL);
  return await res.json();
};

const fetchFromCacheOrCall = await cachedApi();

(async () => {
  console.log(await fetchFromCacheOrCall("https://jsonplaceholder.typicode.com/todos/1", 2000));
  console.log(await fetchFromCacheOrCall("https://jsonplaceholder.typicode.com/todos/1", 2000));
})();

// <div id="hello" class="foo">
//   <h1>HELLO</h1>
//   <p>
//     <span class="bar">World</span>
//   </p>
// </div>
// <section id="hello-2" class="foo-2">
//   <h1>HELLO-2</h1>
//   <p>
//     <span class="bar-2">World</span>
//   </p>
// </section>

const toHtml = (arr) => {
  const fragment = document.createDocumentFragment();

  for (let i of arr) {
    const specificElement = document.createElement(i.type);
    if (i.props) {
      Object.entries(i.props).map(([key, value]) => {
        specificElement.setAttribute(key, value);
      });
    }
    if (i.children) {
      if (Array.isArray(i.children)) {
        specificElement.appendChild(toHtml(i.children));
      } else {
        specificElement.innerText = i.children;
      }
    }
    fragment.appendChild(specificElement);
  }
  return fragment;
};

(() => {
  if (typeof window !== "undefined") {
    const x = toHtml([
      {
        type: "div",
        props: { id: "hello", class: "foo" },
        children: [
          { type: "h1", children: "HELLO" },
          { type: "p", children: [{ type: "span", props: { class: "bar" }, children: "World" }] },
        ],
      },
      {
        type: "section",
        props: { id: "hello-2", class: "foo-2" },
        children: [
          { type: "h1", children: "HELLO-2" },
          { type: "p", children: [{ type: "span", props: { class: "bar-2" }, children: "World" }] },
        ],
      },
    ]);
    console.log(x);
  }
})();

const flattenObject = (obj, parent, result = {}) => {
  for (let key in obj) {
    const combined = parent ? parent + "." + key : key;

    if (obj[key] == undefined) {
      result[combined] = obj[key];
    }

    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        const arrayKey = `${combined}[${index}]`; // explain
        typeof item === "object" ? flattenObject(item, arrayKey, result) : (result[arrayKey] = item);
      });
    } else if (typeof obj[key] === "object") {
      flattenObject(obj[key], combined, result);
    } else {
      result[combined] = obj[key];
    }
  }
  return result;
};

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

flattenObject(object);

function removeDuplicates2(nums) {
  if (nums.length <= 1) return nums;

  return [...new Set(nums)];
}

const nums1 = [1, 1, 2];
const nums2 = [1, 2, 3, 4, 5];
const n3 = [11, 2, 34, 1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 2, 3, 4, 555, 666, 777, 2, 33, 555, 666];
console.log(removeDuplicates2(nums1));
console.log(removeDuplicates2(nums2));
console.log(removeDuplicates2(n3));

const obj = {
  a: {
    b: {
      c: "value",
    },
  },
};
const findPath = (str, currObj) => {
  const arr = str.split(".");
  return arr.reduce((acc, curr) => {
    if (curr && curr in acc) {
      acc = acc[curr];
    }
    return acc;
  }, currObj);
};
console.log(findPath("a.b.c", obj));

const asyncPromise = () => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r(true);
    }, 100);
  });
};
const makePromises = async (BS, BCC) => {
  const finalArr = [];
  // [...], [...], [....], [....]
  for (let i = 0; i < BS; i++) {
    const individualArray = Array.from({ length: BCC }).map(() => {
      return asyncPromise();
    });
    finalArr.push(individualArray);
  }
  return finalArr;
};

const masterFN = async () => {
  const arrOfBatches = await makePromises(3, 10);

  const finalArr = [];
  for (let i of arrOfBatches) {
    const prResolved = await Promise.all(i);

    finalArr.push(prResolved);
  }

  return finalArr;
};

(async () => {
  console.log(await masterFN(), "dsadad");
})();

const accessViaIndexOrID = [
  { name: "Amir", id: "1" },
  { name: "salman", id: "2" },
  { name: "Shahrukh", id: "0" },
];

const filterIT = (arr, accessor) => {
  if (typeof accessor === "number") {
    return arr[accessor] || null;
  }
  return arr.find((item) => {
    if (item.name === accessor || item.id === accessor) {
      return item;
    }
  });
};
console.log(filterIT(accessViaIndexOrID, 2));
console.log(filterIT(accessViaIndexOrID, "Amir"));

const createBrowserHistory = () => {
  const history = [""];
  let index = 0;

  return {
    visit: (u) => (history[++index] = u),
    forward: () => history[++index] || history[--index],
    rewind: () => history[--index] || history[++index],
    currrent: () => history[index],
  };
};

const MH = createBrowserHistory();
MH.visit("google");
MH.visit("fb");
MH.visit("ins");
console.log(MH.currrent());
console.log(MH.rewind());

const throttle = (fn, delay) => {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, delay);
    }
  };
};

const occureanceTest = ["apple", "banana", "apple", "orange", "banana"];

// 5 count occurences
const countOcc = (arr) => {
  return arr.reduce((acc, curr) => {
    if (curr in acc) {
      // acc[curr] ++
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
};
countOcc(occureanceTest);

//   Password Pattern Checker
// Find if a password contains alternating letter-number-letter-number pattern (e.g., "a1b2c3" is valid, "a12b3" is not)

const altering = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      if (!isNaN(str[i])) {
        return false;
      }
    } else {
      if (isNaN(str[i])) {
        return false;
      }
    }
  }
  return true;
};

//   Strict Increase Checker
// Find longest sequence where each number is at least 2 more than previous AND at most 5 more. Example:
//  [1,4,7,9] → 3 (1->4->7 works, but 7->9 fails as difference is only 2)

const strict = (arr) => {
  const final = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff >= 2 && diff <= 5) {
      final.push(arr[i]);
    }
  }
  return final;
};

// make this kind of a fn
console.log(evaluate("add")(2)(3));

// answeer ->
const evaluate = (op) => {
  return (a) => {
    return (b) => {
      return op === "add" ? a + b : op === "subtract" ? a - b : op === "multiply" ? a * b : "invalid";
    };
  };
};

/*
Given an array and a value k, put all elements less than k at the beginning
and all elements greater than or equal to k at the end.
The relative order doesn't matter.

Input: [5,3,8,4,2,7,1,6], k = 5
Output (one valid result): [3,4,2,1,5,8,7,6]

*/

const kp = (arr, k) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    if (arr[left] >= k) {
      let temp = arr[right];
      arr[right] = arr[left];
      arr[left] = temp;
      right--;
    } else {
      left++;
    }
  }
  return arr;
};
kp([5, 3, 8, 4, 2, 7, 1, 6], 5);

const clone = (obj) => {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj.getMinutes());
  if (obj instanceof RegExp) return new RegExp(RegExp);
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((i) => clone(i));
  }

  if (typeof obj == "object") {
    const res = {};
    for (let key in obj) {
      res[key] = clone(obj[key]);
    }
    return res;
  }

  return obj;
};

const original = {
  a: 1,
  b: "string",
  c: true,
  d: null,
  e: undefined,
  f: [1, 2, { g: 3 }],
  h: { i: 4, j: [5, 6] },
  k: new Date(),
  l: /pattern/g,
};

const cloned = clone(original);

// lets test
original.f[2].g = 100;
original.h.j[0] = 200;

console.log(original.f[2].g); // 100
console.log(cloned.f[2].g); // 3 (unchanged)

console.log(original.h.j[0]); // 200
console.log(cloned.h.j[0]); // 5 (unchanged)

// make this `sleep` fn which delays and after 3s prints bye
async function main() {
  console.log("hello");
  await sleep();
  console.log("bye");
}

main();

// ANSWER, solution for sleep
const sleep = (timer = 3000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  });
};
