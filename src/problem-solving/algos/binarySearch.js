function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target === arr[mid]) return mid;

    if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 3, 5, 6, 70], 6));

var searchRange = function (arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let firstPos = -1;
  let lastPos = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      firstPos = mid;
      right = mid - 1;
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (firstPos === -1) {
    return [-1, -1];
  }

  left = 0;
  right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      lastPos = mid;
      left = mid + 1;
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [firstPos, lastPos];
};

searchRange([5, 7, 7, 8, 8, 10], 8);
