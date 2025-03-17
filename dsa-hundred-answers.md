# JavaScript Solutions for Top 5 Array Questions

This document provides detailed solutions for the first 5 array questions from the DSA interview questions list, including time and space complexity analysis and explanations of the approach.

## Table of Contents
1. [Pair with the given Sum (Two Sum)](#1-pair-with-the-given-sum-two-sum)
2. [Best Time to Buy and Sell Stock](#2-best-time-to-buy-and-sell-stock)
3. [Find Duplicates](#3-find-duplicates)
4. [Product of Array Except Self](#4-product-of-array-except-self)
5. [Maximum Subarray](#5-maximum-subarray-kadanes-algorithm)

## 1. Pair with the given Sum (Two Sum)

### Problem
Find a pair of elements from an array whose sum equals a given number.

### Solution

```javascript
/**
 * Find a pair of elements from an array whose sum equals a given number.
 * 
 * @param {number[]} arr - Array of integers
 * @param {number} targetSum - Integer sum to find
 * @returns {number[]|null} - Array containing the pair that sums to target, or null if no such pair exists
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
```

### Example
```javascript
const arr = [1, 4, 45, 6, 10, -8];
const target = 16;
const result = findPairWithSum(arr, target);
console.log(`Pair found: (${result[0]}, ${result[1]})`);  // Output: Pair found: (6, 10)
```

### Complexity Analysis
- **Time Complexity: O(n)**
  - We only need to iterate through the array once
  - Hash map lookups are O(1) on average
  
- **Space Complexity: O(n)**
  - In the worst case, we store almost all elements in the hash map before finding a pair

### Why This Approach?
This solution is optimal because:
1. It avoids the O(n²) time complexity that would come from checking every possible pair using nested loops
2. It trades space for time by using a hash map to remember elements we've seen
3. It can find the answer in a single pass through the array

## 2. Best Time to Buy and Sell Stock

### Problem
Given an array of prices, find the maximum profit by buying and selling a stock once.

### Solution

```javascript
/**
 * Given an array of prices, find the maximum profit by buying and selling a stock once.
 * 
 * @param {number[]} prices - Array of stock prices on consecutive days
 * @returns {Object} - Object containing maxProfit, buyDay, and sellDay
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
```

### Example
```javascript
const prices = [7, 1, 5, 3, 6, 4];
const result = maxProfit(prices);
console.log(`Maximum Profit: ${result.maxProfit}`); // Output: Maximum Profit: 5
console.log(`Buy at day ${result.buyDay} (price: ${prices[result.buyDay]}), sell at day ${result.sellDay} (price: ${prices[result.sellDay]})`);
// Output: Buy at day 1 (price: 1), sell at day 4 (price: 6)
```

### Complexity Analysis
- **Time Complexity: O(n)**
  - We only need one pass through the prices array
  
- **Space Complexity: O(1)**
  - We use a constant amount of variables regardless of input size

### Why This Approach?
This solution is optimal because:
1. It avoids checking every possible buy/sell pair (which would be O(n²))
2. It simultaneously keeps track of the minimum price seen so far while evaluating potential profits
3. The greedy approach works here because we only need to buy at the lowest price before the highest selling price

## 3. Find Duplicates

### Problem
Find all duplicates in an array of integers where each integer appears once or twice.

### Solution - In-place Approach

```javascript
/**
 * Find all duplicates in an array of integers where each integer appears once or twice.
 * This solution modifies the input array.
 * 
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array containing all duplicates
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
```

### Alternative Solution - Using a Set

```javascript
/**
 * Find all duplicates using a hash set (if we can't modify the input).
 * 
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array containing all duplicates
 */
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
```

### Example
```javascript
const nums = [4, 3, 2, 7, 8, 2, 3, 1];
const dupes = findDuplicates(nums);
console.log(`Duplicates: ${dupes}`);  // Output: Duplicates: 2,3
```

### Complexity Analysis
- **In-place Solution:**
  - **Time Complexity: O(n)** - We iterate through the array once
  - **Space Complexity: O(1)** - We modify the input array in-place and only use a constant amount of extra space for the output

- **Set Solution:**
  - **Time Complexity: O(n)** - We still only need one pass
  - **Space Complexity: O(n)** - We need to store up to n elements in the hash set

### Why These Approaches?
1. **In-place solution**:
   - Takes advantage of the problem constraint that all values are in range [1, n]
   - Uses the array itself as a hash table by marking visited elements
   - Extremely space-efficient but modifies the input

2. **Set solution**:
   - More general-purpose and doesn't modify the input
   - Easy to understand and implement
   - Slightly higher space complexity

## 4. Product of Array Except Self

### Problem
Calculate the product of all elements in the array except the current element without using division.

### Solution

```javascript
/**
 * Calculate the product of all elements in the array except the current element without using division.
 * 
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array where each element is the product of all elements in nums except nums[i]
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
```

### Example
```javascript
const nums = [1, 2, 3, 4];
const products = productExceptSelf(nums);
console.log(`Output: [${products}]`);  // Output: [24,12,8,6]
```

### Complexity Analysis
- **Time Complexity: O(n)**
  - We make two passes through the array (one left-to-right, one right-to-left)
  
- **Space Complexity: O(1)**
  - Not counting the output array (which is required), we only use a constant amount of extra space

### Why This Approach?
This solution is clever and optimal because:
1. It avoids using division, which could lead to issues if there are zeros in the array
2. It breaks the problem down into two simpler calculations: products of elements to the left and products of elements to the right
3. By combining these two products, we get the product of all elements except self
4. The algorithm maintains linear time complexity and constant extra space

## 5. Maximum Subarray (Kadane's Algorithm)

### Problem
Find the contiguous subarray with the largest sum.

### Solution

```javascript
/**
 * Find the contiguous subarray with the largest sum.
 * 
 * @param {number[]} nums - Array of integers
 * @returns {Object} - Object containing maxSum and the subarray indices
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
    subarray: nums.slice(start, end + 1)
  };
}
```

### Example
```javascript
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(nums);
console.log(`Maximum Sum: ${result.maxSum}`);  // Output: Maximum Sum: 6
console.log(`Subarray: [${result.subarray}]`); // Output: Subarray: [4,-1,2,1]
```

### Complexity Analysis
- **Time Complexity: O(n)**
  - We make a single pass through the array
  
- **Space Complexity: O(1)**
  - We only use a constant amount of variables (not counting the returned subarray)

### Why This Approach?
Kadane's algorithm is optimal for this problem because:
1. It avoids trying all possible subarrays, which would be O(n²) or O(n³)
2. It's based on the dynamic programming concept of optimal substructure
3. At each position, we make a local optimal choice: either start a new subarray or extend the current one
4. This greedy approach works because we only care about the maximum sum

## Conclusion

These solutions demonstrate several key problem-solving techniques:
- Hash maps/sets for O(1) lookups
- In-place modifications to optimize space
- Multiple passes to break down complex problems
- Greedy algorithms and dynamic programming concepts

Each solution is designed to be optimal in terms of time and space complexity for its specific problem constraints. Understanding these patterns will help you tackle similar array problems in interviews and practical applications.