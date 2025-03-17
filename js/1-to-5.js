/**
 * Solutions for the first 5 array questions with detailed time and space complexity analysis.
 * Each solution follows JavaScript best practices and includes clear explanations.
 */

/**
 * Question 1: Pair with the given Sum (Two Sum)
 *
 * Find a pair of elements from an array whose sum equals a given number.
 *
 * @param {number[]} arr - Array of integers
 * @param {number} targetSum - Integer sum to find
 * @returns {number[]|null} - Array containing the pair that sums to target, or null if no such pair exists
 *
 * Time Complexity: O(n) - We iterate through the array once
 * Space Complexity: O(n) - In worst case, we store almost all elements in the hash map
 */
function findPairWithSum(arr, targetSum) {
  const seen = new Map();

  for (const num of arr) {
    const complement = targetSum - num;

    // If we've seen the complement before, we found our pair
    if (seen.has(complement)) {
      return [complement, num];
    }

    // Otherwise, add current number to our map
    seen.set(num, true);
  }

  // If we get here, no pair was found
  return null;
}

// Example usage:
// const arr = [1, 4, 45, 6, 10, -8];
// const target = 16;
// const result = findPairWithSum(arr, target);
// console.log(`Pair found: (${result[0]}, ${result[1]})`);  // Output: Pair found: (6, 10)

/**
 * Question 2: Best Time to Buy and Sell Stock
 *
 * Given an array of prices, find the maximum profit by buying and selling a stock once.
 *
 * @param {number[]} prices - Array of stock prices on consecutive days
 * @returns {Object} - Object containing maxProfit, buyDay, and sellDay
 *
 * Time Complexity: O(n) - We only need to iterate through the array once
 * Space Complexity: O(1) - We only use a constant amount of variables regardless of input size
 */
function maxProfit(prices) {
  if (prices.length < 2) {
    return { maxProfit: 0, buyDay: -1, sellDay: -1 };
  }

  let minPrice = prices[0];
  let minDay = 0;
  let maxProfit = 0;
  let buyDay = -1;
  let sellDay = -1;

  for (let i = 1; i < prices.length; i++) {
    // If we find a new minimum price, update it
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minDay = i;
    }
    // If current profit is better than max profit, update max profit and buy/sell days
    else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
      buyDay = minDay;
      sellDay = i;
    }
  }

  return { maxProfit, buyDay, sellDay };
}

// Example usage:
// const prices = [7, 1, 5, 3, 6, 4];
// const result = maxProfit(prices);
// console.log(`Maximum Profit: ${result.maxProfit}`); // Output: Maximum Profit: 5
// console.log(`Buy at day ${result.buyDay} (price: ${prices[result.buyDay]}), sell at day ${result.sellDay} (price: ${prices[result.sellDay]})`);

/**
 * Question 3: Find duplicates in an array
 *
 * Find all duplicates in an array of integers where each integer appears once or twice.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array containing all duplicates
 *
 * Time Complexity: O(n) - We iterate through the array once
 * Space Complexity: O(1) - We modify the input array in-place and only use a constant amount of extra space
 *                           (If we can't modify the input, space complexity would be O(n) using a hash set)
 */
function findDuplicates(nums) {
  const duplicates = [];

  // This solution uses the array indices as a hash map
  // It works because all values are in range [1, n] where n is array length
  for (let i = 0; i < nums.length; i++) {
    // Get the index corresponding to the current value
    // We use Math.abs because we might have marked it as negative already
    const index = Math.abs(nums[i]) - 1;

    // If the number at this index is negative, we've seen this value before
    if (nums[index] < 0) {
      duplicates.push(Math.abs(nums[i]));
    } else {
      // Mark as visited by making it negative
      nums[index] = -nums[index];
    }
  }

  // Restore the array (optional, if we don't want to modify input)
  for (let i = 0; i < nums.length; i++) {
    nums[i] = Math.abs(nums[i]);
  }

  return duplicates;
}

// Alternative implementation using a hash set (if we can't modify the input)
function findDuplicatesWithSet(nums) {
  const seen = new Set();
  const duplicates = [];

  for (const num of nums) {
    if (seen.has(num)) {
      duplicates.push(num);
    } else {
      seen.add(num);
    }
  }

  return duplicates;
}

// Example usage:
// const nums = [4, 3, 2, 7, 8, 2, 3, 1];
// const dupes = findDuplicates(nums);
// console.log(`Duplicates: ${dupes}`);  // Output: Duplicates: 2,3

/**
 * Question 4: Product of Array Except Self
 *
 * Calculate the product of all elements in the array except the current element without using division.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array where each element is the product of all elements in nums except nums[i]
 *
 * Time Complexity: O(n) - We make three passes through the array (two for calculations, one for result)
 * Space Complexity: O(1) - Not counting the output array which is required, we use constant extra space
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // First pass: calculate products of all elements to the left of each element
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Second pass: multiply by products of all elements to the right of each element
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// Example usage:
// const nums = [1, 2, 3, 4];
// const products = productExceptSelf(nums);
// console.log(`Output: [${products}]`);  // Output: [24,12,8,6]

/**
 * Question 5: Maximum Subarray (Kadane's Algorithm)
 *
 * Find the contiguous subarray with the largest sum.
 *
 * @param {number[]} nums - Array of integers
 * @returns {Object} - Object containing maxSum and the subarray indices
 *
 * Time Complexity: O(n) - We make a single pass through the array
 * Space Complexity: O(1) - We only use a constant amount of variables
 */
function maxSubArray(nums) {
  if (nums.length === 0) {
    return { maxSum: 0, start: -1, end: -1 };
  }

  let currentSum = nums[0];
  let maxSum = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    // If current element is better than continuing the previous subarray
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }

    // Update maxSum if we found a better sum
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return {
    maxSum,
    start,
    end,
    subarray: nums.slice(start, end + 1),
  };
}

// Example usage:
// const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// const result = maxSubArray(nums);
// console.log(`Maximum Sum: ${result.maxSum}`);  // Output: Maximum Sum: 6
// console.log(`Subarray: [${result.subarray}]`); // Output: Subarray: [4,-1,2,1]
