
const qcArrau = [2, 45, 6, 1, 0, 800, 200, 10, 9000, 2200];
const quickSort = (arr, low, high) => {
    if (low >= high) return;

    const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    swapIT(arr, randomIndex, high);
    
    const pivotEL = arr[high];

    let LT = low;
    let current = low;
    let GT = high;

    while (current <= GT) {
      if (arr[current] < pivotEL) {
        swapIT(arr, LT, current);
        LT++;
        current++;
      } else if (arr[current] > pivotEL) {
        swapIT(arr, current, GT);
        GT--;
      } else current++;
    }
    quickSort(arr, low, LT - 1);
    quickSort(arr, GT + 1, high);
    return arr;
  };

  const swapIT = (arr, i, j) => {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  };
  console.log(quickSort(qcArrau, 0, 9));