/**
 * Solutions for array questions 6-10 with detailed time and space complexity analysis.
 */

/**
 * Question 6: Maximum Product Subarray
 *
 * Find the contiguous subarray with the largest product.
 *
 * @param {number[]} nums - Array of integers
 * @returns {Object} - Object containing maxProduct and the subarray indices
 *
 * Time Complexity: O(n) - We make a single pass through the array
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function maxProductSubarray(nums) {
  if (nums.length === 0) {
    return { maxProduct: 0, start: -1, end: -1, subarray: [] };
  }

  // We need to track both max and min products because of negative numbers
  // A negative number can turn a minimum product into a maximum product
  let maxEndingHere = nums[0];
  let minEndingHere = nums[0];
  let maxSoFar = nums[0];

  // Track indices for the resulting subarray
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    // If current number is negative, swap max and min
    // This is because multiplying by a negative turns max to min and min to max
    if (nums[i] < 0) {
      [maxEndingHere, minEndingHere] = [minEndingHere, maxEndingHere];
    }

    // Update max product ending at current position
    // Either start new subarray or continue previous subarray
    if (nums[i] > maxEndingHere * nums[i]) {
      maxEndingHere = nums[i];
      tempStart = i;
    } else {
      maxEndingHere = maxEndingHere * nums[i];
    }

    // Update min product ending at current position
    minEndingHere = Math.min(nums[i], minEndingHere * nums[i]);

    // Update global max product if we found a new max
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }

  return {
    maxProduct: maxSoFar,
    start,
    end,
    subarray: nums.slice(start, end + 1),
  };
}

// Note: The above implementation has a flaw in tracking the correct subarray indices
// when multiplying by negative numbers. A more complex implementation is required
// to correctly track the exact subarray. Here's a more accurate version:

function maxProductSubarrayAccurate(nums) {
  if (nums.length === 0) return { maxProduct: 0, subarray: [] };

  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  let minEndingHere = nums[0];
  let startTemp = 0;
  let start = 0;
  let end = 0;

  // For properly tracking the subarray
  let maxStart = [0];
  let minStart = [0];

  for (let i = 1; i < nums.length; i++) {
    const prevMax = maxEndingHere;
    const prevMin = minEndingHere;
    const prevMaxStart = [...maxStart];
    const prevMinStart = [...minStart];

    // Calculate new max product ending here
    if (nums[i] >= 0) {
      maxEndingHere = Math.max(nums[i], prevMax * nums[i]);
      minEndingHere = Math.min(nums[i], prevMin * nums[i]);

      if (nums[i] > prevMax * nums[i]) {
        maxStart = [i];
      } else {
        maxStart = prevMaxStart;
      }

      if (nums[i] < prevMin * nums[i]) {
        minStart = [i];
      } else {
        minStart = prevMinStart;
      }
    } else {
      maxEndingHere = Math.max(nums[i], prevMin * nums[i]);
      minEndingHere = Math.min(nums[i], prevMax * nums[i]);

      if (nums[i] > prevMin * nums[i]) {
        maxStart = [i];
      } else {
        maxStart = prevMinStart;
      }

      if (nums[i] < prevMax * nums[i]) {
        minStart = [i];
      } else {
        minStart = prevMaxStart;
      }
    }

    // Update global max
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = maxStart[0];
      end = i;
    }
  }

  return {
    maxProduct: maxSoFar,
    start,
    end,
    subarray: nums.slice(start, end + 1),
  };
}

/**
 * Question 7: Minimum in Rotated Sorted Array
 *
 * Find the minimum element in a rotated sorted array.
 *
 * @param {number[]} nums - Rotated sorted array of integers
 * @returns {number} - Minimum element in the array
 *
 * Time Complexity: O(log n) - We use binary search to find the minimum
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function findMinInRotatedSortedArray(nums) {
  if (nums.length === 0) return null;
  if (nums.length === 1) return nums[0];

  // If array is not rotated
  if (nums[0] < nums[nums.length - 1]) return nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Integer division without overflow
    const mid = left + Math.floor((right - left) / 2);

    // If mid element is greater than the rightmost element,
    // then the minimum is in the right half
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // Otherwise, the minimum is in the left half (including mid)
    else {
      right = mid;
    }
  }

  // At this point, left == right and points to the minimum
  return nums[left];
}

/**
 * Question 8: Search in Rotated Sorted Array
 *
 * Search for a target value in a rotated sorted array.
 *
 * @param {number[]} nums - Rotated sorted array of integers
 * @param {number} target - Target value to search for
 * @returns {number} - Index of target if found, -1 otherwise
 *
 * Time Complexity: O(log n) - We use a modified binary search
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function searchInRotatedSortedArray(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    // Found the target
    if (nums[mid] === target) {
      return mid;
    }

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is in the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Otherwise, right half is sorted
    else {
      // Check if target is in the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  // Target not found
  return -1;
}

/**
 * Question 9: 3 Sum
 *
 * Find all triplets in the array that sum up to a target value.
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[][]} - Array of triplets that sum to target
 *
 * Time Complexity: O(n²) - We sort the array (O(n log n)) and then use a two-pointer approach (O(n²))
 * Space Complexity: O(1) - Excluding the output array, we use constant extra space
 *                           (though sorting may use O(log n) space internally)
 */
function threeSum(nums, target = 0) {
  const result = [];
  if (nums.length < 3) return result;

  // Sort the array to make duplicate handling easier
  // and to use the two-pointer approach
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // If the smallest possible sum (with current i) is greater than target, break
    if (nums[i] + nums[i + 1] + nums[i + 2] > target) break;

    // If the largest possible sum (with current i) is less than target, skip
    if (nums[i] + nums[nums.length - 2] + nums[nums.length - 1] < target)
      continue;

    // Use two pointers to find pairs that sum to (target - nums[i])
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        // Found a triplet
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for the second element
        while (left < right && nums[left] === nums[left + 1]) left++;

        // Skip duplicates for the third element
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move both pointers inward
        left++;
        right--;
      }
    }
  }

  return result;
}

/**
 * Question 10: Container With Most Water
 *
 * Find two lines that together with the x-axis form a container that holds the most water.
 *
 * @param {number[]} height - Array of heights
 * @returns {Object} - Object containing maximum area and the indices of the two lines
 *
 * Time Complexity: O(n) - We use a two-pointer approach to scan the array once
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function maxArea(height) {
  if (height.length < 2) return { maxArea: 0, left: -1, right: -1 };

  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  let maxLeft = 0;
  let maxRight = 0;

  while (left < right) {
    // Calculate width of container
    const width = right - left;

    // Calculate height of container (limited by the shorter line)
    const h = Math.min(height[left], height[right]);

    // Calculate area
    const area = width * h;

    // Update maximum area if current area is larger
    if (area > maxWater) {
      maxWater = area;
      maxLeft = left;
      maxRight = right;
    }

    // Move the pointer at the shorter line inward
    // This is the key insight: we can only increase area by potentially
    // finding a taller line to replace the shorter one
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return {
    maxArea: maxWater,
    left: maxLeft,
    right: maxRight,
    lines: [height[maxLeft], height[maxRight]],
  };
}
