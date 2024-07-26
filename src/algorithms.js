/**
 * Algoritms used in the text-record-processor application.
 * Includes merge sort, and binary search.
 *
 * Author: Scott Martel
 * Date: 07/25/2024
 */

/**
 * Performs merge sort on an array of items.
 *
 * @param {Array} arr - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
export const mergeSort = (arr) => {
  // Base case: if the array has 1 or 0 elements, it is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle index to split the array into two halves
  const middle = Math.floor(arr.length / 2);

  // Recursively sort the left half
  const left = mergeSort(arr.slice(0, middle));

  // Recursively sort the right half
  const right = mergeSort(arr.slice(middle));

  // Merge the two sorted halves into a single sorted array
  return merge(left, right);
};

/**
 * Merges two sorted arrays into one sorted array.
 *
 * @param {Array} left - The left sorted array.
 * @param {Array} right - The right sorted array.
 * @returns {Array} - The merged sorted array.
 */
const merge = (left, right) => {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare the elements of the two arrays one by one and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][0] < right[rightIndex][0]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate any remaining elements from the left and right arrays
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

/**
 * Performs binary search on a sorted array to find the item.
 *
 * @param {Array} arr - The sorted array.
 * @param {string} target - The target item to search for.
 * @returns {number} - The index of the target item, or -1 if not found.
 */
export const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  // Perform binary search by repeatedly dividing the search interval in half
  while (left <= right) {
    // Find the middle index
    const middle = Math.floor((left + right) / 2);

    // Extract the item at the middle index
    const [item] = arr[middle];

    // Compare the middle item with the target
    if (item.toLowerCase() === target) {
      // If the middle item is the target, return the middle index
      return middle;
    } else if (item.toLowerCase() < target) {
      // If the target is greater, ignore the left half
      left = middle + 1;
    } else {
      // If the target is smaller, ignore the right half
      right = middle - 1;
    }
  }

  // If the target is not found, return -1
  return -1;
};
