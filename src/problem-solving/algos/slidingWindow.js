function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let currentSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    currentSum += arr[windowEnd];

    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, currentSum);

      currentSum -= arr[windowStart];

      windowStart++;
    }
  }

  return maxSum;
}

function findAveragesOfSubarrays(arr, k) {
  let left = 0;
  const res = [];
  let sum = 0;

  for (let right = 0; right < arr.length; right++) {
    sum = sum + arr[right];

    if (right >= k - 1) {
      res.push(sum / k);
      sum -= arr[left];
      left++;
    }
  }
  return res;
}

findAveragesOfSubarrays([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);
