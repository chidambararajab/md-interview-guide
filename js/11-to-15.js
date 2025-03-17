/**
 * Solutions for array questions 11-15 with detailed time and space complexity analysis.
 */

/**
 * Question 11: Factorial of a large number
 *
 * Calculate factorial of a large number (beyond the range of standard data types).
 *
 * @param {number} n - Integer for which to calculate factorial
 * @returns {string} - String representation of the factorial value
 *
 * Time Complexity: O(n²) - For each of the n multiplications, we may need O(n) operations for the multiplication
 * Space Complexity: O(n) - The result array can have up to n digits
 */
function factorial(n) {
  // Handle special cases
  if (n < 0) return "Error: Factorial not defined for negative numbers";
  if (n === 0 || n === 1) return "1";

  // Initialize result array with 1
  const result = [1];

  // Calculate factorial using array-based multiplication
  for (let i = 2; i <= n; i++) {
    // Multiply the current number with each digit in result
    let carry = 0;

    for (let j = 0; j < result.length; j++) {
      const product = result[j] * i + carry;
      result[j] = product % 10; // Keep the last digit
      carry = Math.floor(product / 10); // Carry the rest
    }

    // Add any remaining carry digits
    while (carry > 0) {
      result.push(carry % 10);
      carry = Math.floor(carry / 10);
    }
  }

  // Reverse the array and join to get the final string
  return result.reverse().join("");
}

/**
 * Question 12: Trapping Rain Water
 *
 * Calculate how much water can be trapped between bars of varying heights.
 *
 * @param {number[]} height - Array of bar heights
 * @returns {number} - Total amount of trapped water
 *
 * Time Complexity: O(n) - We scan the array three times
 * Space Complexity: O(n) - We use two auxiliary arrays of size n
 */
function trap(height) {
  if (height.length <= 2) return 0;

  const n = height.length;
  let totalWater = 0;

  // Arrays to store the maximum height to the left and right of each bar
  const leftMax = new Array(n);
  const rightMax = new Array(n);

  // Calculate maximum height to the left of each bar
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }

  // Calculate maximum height to the right of each bar
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }

  // Calculate trapped water at each position
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    totalWater += waterLevel - height[i];
  }

  return totalWater;
}

/**
 * Trapping Rain Water - Optimized with Two Pointers
 *
 * This optimized solution uses constant space with a two-pointer approach.
 *
 * @param {number[]} height - Array of bar heights
 * @returns {number} - Total amount of trapped water
 *
 * Time Complexity: O(n) - We scan the array once with two pointers
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function trapOptimized(height) {
  if (height.length <= 2) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let totalWater = 0;

  while (left < right) {
    // Update the maximum height seen from left and right
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    // If the left bar is lower, calculate water trapped at that position
    if (leftMax <= rightMax) {
      totalWater += leftMax - height[left];
      left++;
    }
    // Otherwise, calculate water trapped at the right position
    else {
      totalWater += rightMax - height[right];
      right--;
    }
  }

  return totalWater;
}

/**
 * Question 13: Chocolate Distribution Problem
 *
 * Distribute chocolates such that the difference between maximum and minimum
 * chocolates given is minimized.
 *
 * @param {number[]} chocolates - Array of chocolate packet sizes
 * @param {number} students - Number of students
 * @returns {Object} - Object containing minimum difference and distribution details
 *
 * Time Complexity: O(n log n) - Dominated by the sorting operation
 * Space Complexity: O(1) - Excluding the sorting, we use constant extra space
 */
function distributeChocolates(chocolates, students) {
  if (
    chocolates.length === 0 ||
    students === 0 ||
    chocolates.length < students
  ) {
    return { minDifference: -1, distribution: [] };
  }

  // Sort the chocolate packets
  chocolates.sort((a, b) => a - b);

  let minDifference = Infinity;
  let result = [];

  // Find the minimum difference by checking all possible distributions
  for (let i = 0; i <= chocolates.length - students; i++) {
    const currentDifference = chocolates[i + students - 1] - chocolates[i];

    if (currentDifference < minDifference) {
      minDifference = currentDifference;
      result = chocolates.slice(i, i + students);
    }
  }

  return { minDifference, distribution: result };
}

/**
 * Question 14: Insert Interval
 *
 * Insert a new interval into a sorted list of non-overlapping intervals.
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @param {number[]} newInterval - New interval to insert [start, end]
 * @returns {number[][]} - Array of intervals after insertion and merging
 *
 * Time Complexity: O(n) - We scan through the intervals array once
 * Space Complexity: O(n) - In the worst case, the output might have all intervals
 */
function insertInterval(intervals, newInterval) {
  if (intervals.length === 0) {
    return [newInterval];
  }

  const result = [];
  let [newStart, newEnd] = newInterval;
  let i = 0;

  // Add all intervals that come before the new interval
  while (i < intervals.length && intervals[i][1] < newStart) {
    result.push(intervals[i]);
    i++;
  }

  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newEnd) {
    newStart = Math.min(newStart, intervals[i][0]);
    newEnd = Math.max(newEnd, intervals[i][1]);
    i++;
  }

  // Add the merged interval
  result.push([newStart, newEnd]);

  // Add all remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

/**
 * Question 15: Merge Intervals
 *
 * Merge all overlapping intervals.
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @returns {number[][]} - Array of merged non-overlapping intervals
 *
 * Time Complexity: O(n log n) - Dominated by the sorting operation
 * Space Complexity: O(n) - For the result array
 */
function mergeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = result[result.length - 1];

    // If current interval overlaps with the last merged interval, update end time
    if (currentInterval[0] <= lastMergedInterval[1]) {
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1]
      );
    }
    // Otherwise, add it to the result
    else {
      result.push(currentInterval);
    }
  }

  return result;
}
