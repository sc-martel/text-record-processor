/**
 * Algoritms used in the text-record-processor application.
 * Includes merge sort, and binary search.
 * 
 * This file contains the algorithms used to complete Enhancement Two.
 * 
 * Update 7/27/2024: Improved comments describing the algorithms
 * 
 * The merge sort algorithm sorts an array with a time complexity of O(n log n),
 * Binary search is then used on the sorted data with a time complexity O(log n) which is a significant
 * improvement compared to the previous linear search which had a time complexity of 0(n).
 *
 * Author: Scott Martel
 * Date: 07/27/2024
 */

/**
 * Performs merge sort on an array of items.
 * 
 * Time Complexity: O(n log n)
 * 
 * Enhancement 7/27/2024: Improved comments
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
 * Time Complexity: O(n)
 * 
 * Enhancement 7/27/2024: Improved comments
 *
 * @param {Array} left - The left sorted array.
 * @param {Array} right - The right sorted array.
 * @returns {Array} - The merged sorted array.
 */
const merge = (left, right) => {
  // Initialize an empty array to hold the merged result
  let result = [];
  // Initialize pointers to track the current index of the left and right arrays
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare the elements of the two arrays one by one and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    // Compare the current elements of both arrays and push the smaller element to the result array
    if (left[leftIndex][0] < right[rightIndex][0]) {
      result.push(left[leftIndex]); // Push the element from the left array to the result array
      leftIndex++; // Move the pointer of the left array to the next element
    } else {
      result.push(right[rightIndex]); // Push the element from the right array to the result array
      rightIndex++; // Move the pointer of the right array to the next element
    }
  }

  // Concatenate any remaining elements from the left array to the result array
  // This takes care of the case where the left array has leftover elements
  result = result.concat(left.slice(leftIndex));

  // Concatenate any remaining elements from the right array to the result array
  // This handles takes care of the case where the right array has leftover elements
  result = result.concat(right.slice(rightIndex));

  // Return the merged and sorted result array
  return result;
};

/**
 * Performs binary search on a sorted array to find the item.
 * 
 * Time Complexity: O(log n)
 * 
 * Enhancement 7/27/2024: Improved comments
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
