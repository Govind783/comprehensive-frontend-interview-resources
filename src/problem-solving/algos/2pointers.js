/*
Given a sorted array nums and a value val, remove all instances of val in-place.
Return the new length and modify nums so first k elements are correct.
Order of remaining elements doesn't matter.

Example:
nums = [0,1,2,2,3,4,2], val = 2
Output: 4 (new length)
nums = [0,1,3,4,_,_,_] (first 4 elements matter)
*/

const remIp = (arr, k) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    if (arr[left] == k) {
      arr.splice(left, 1);
      right--;
    } else {
      left++;
    }
  }
  return arr;
};

remIp([0, 1, 2, 2, 3, 4, 2], 2);

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
