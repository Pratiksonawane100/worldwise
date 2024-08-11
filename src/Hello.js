function findMissingNumber(arr) {
  arr.sort((a, b) => a - b); // Sort the array if it's not already sorted
  let expected = arr[0];
  for (let num of arr) {
    console.log("a:", num);

    if (num !== expected) {
      console.log(expected);
      return expected;
    }
    expected++;
  }
  return expected; // If no missing number found after array elements
}

const arr = [11, 12, 14];
const missingNumber = findMissingNumber(arr);
console.log(missingNumber); // Output: 2
