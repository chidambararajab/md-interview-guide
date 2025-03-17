/**
 * Solutions for Stack & Queue questions 45-47 with detailed time and space complexity analysis.
 */

/**
 * Question 45: Length of the longest valid substring
 *
 * Find the length of the longest valid (well-formed) parentheses substring.
 *
 * @param {string} s - String containing parentheses
 * @returns {Object} - Object containing length and the substring
 *
 * Time Complexity: O(n) - We process each character once
 * Space Complexity: O(n) - For the stack
 */
function longestValidParentheses(s) {
  if (!s || s.length === 0) {
    return { length: 0, substring: "" };
  }

  const stack = [-1]; // Initialize with -1 as a base index
  let maxLen = 0;
  let start = -1;

  for (let i = 0; i < s.length; i++) {
    // If opening bracket, push its index to the stack
    if (s[i] === "(") {
      stack.push(i);
    }
    // If closing bracket
    else {
      // Pop the top index
      stack.pop();

      // If stack is empty, push current index as new base
      if (stack.length === 0) {
        stack.push(i);
      }
      // Calculate length of current valid substring
      else {
        const len = i - stack[stack.length - 1];

        // Update max length if this is longer
        if (len > maxLen) {
          maxLen = len;
          start = stack[stack.length - 1] + 1;
        }
      }
    }
  }

  return {
    length: maxLen,
    substring: maxLen > 0 ? s.substring(start, start + maxLen) : "",
  };
}

/**
 * Dynamic programming solution for longest valid parentheses
 *
 * @param {string} s - String containing parentheses
 * @returns {Object} - Object containing length and the substring
 *
 * Time Complexity: O(n) - We process each character once
 * Space Complexity: O(n) - For the DP array
 */
function longestValidParenthesesDP(s) {
  if (!s || s.length === 0) {
    return { length: 0, substring: "" };
  }

  const n = s.length;
  const dp = new Array(n).fill(0); // dp[i] = length of longest valid substring ending at i
  let maxLen = 0;
  let end = -1;

  for (let i = 1; i < n; i++) {
    // Only consider closing brackets
    if (s[i] === ")") {
      // Case 1: ()
      if (s[i - 1] === "(") {
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      }
      // Case 2: (...))
      else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === "(") {
        dp[i] =
          dp[i - 1] + 2 + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0);
      }

      // Update max length
      if (dp[i] > maxLen) {
        maxLen = dp[i];
        end = i;
      }
    }
  }

  return {
    length: maxLen,
    substring: maxLen > 0 ? s.substring(end - maxLen + 1, end + 1) : "",
  };
}

/**
 * Question 46: Print Right View of a Binary Tree
 *
 * Print the right view of a binary tree.
 *
 * Definition for a binary tree node:
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Array of nodes visible from the right side
 *
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(h) - Where h is the height of the tree
 */
function rightSideView(root) {
  if (!root) {
    return [];
  }

  const result = [];

  // Level order traversal (BFS)
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    // Process all nodes at the current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // If this is the rightmost node of the level, add to result
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      // Add children to the queue
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return result;
}

/**
 * DFS solution for right side view
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Array of nodes visible from the right side
 *
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(h) - Where h is the height of the tree (for the recursion stack)
 */
function rightSideViewDFS(root) {
  if (!root) {
    return [];
  }

  const result = [];

  // Helper function for DFS
  function dfs(node, level) {
    if (!node) {
      return;
    }

    // If this is the first node we've seen at this level
    if (level === result.length) {
      result.push(node.val);
    }

    // Visit right first, then left (to ensure right side view)
    dfs(node.right, level + 1);
    dfs(node.left, level + 1);
  }

  dfs(root, 0);
  return result;
}

/**
 * Question 47: Find the first circular tour that visits all
 *
 * Find the first petrol pump from where a circular tour is possible.
 * Each pump has a certain amount of petrol and distance to the next pump.
 *
 * @param {number[]} petrol - Array of petrol at each pump
 * @param {number[]} distance - Array of distances to the next pump
 * @returns {number} - Index of starting pump, or -1 if no solution exists
 *
 * Time Complexity: O(n) - We process each pump at most twice
 * Space Complexity: O(1) - We use constant extra space
 */
function findStartingPoint(petrol, distance) {
  if (!petrol || !distance || petrol.length !== distance.length) {
    return -1;
  }

  const n = petrol.length;

  // Start with first pump
  let start = 0;
  let currentPetrol = 0;
  let totalDeficit = 0;

  for (let i = 0; i < n; i++) {
    const remaining = petrol[i] - distance[i];
    currentPetrol += remaining;

    // If we can't reach the next pump
    if (currentPetrol < 0) {
      // Add the deficit
      totalDeficit += currentPetrol;

      // Try starting from the next pump
      start = i + 1;
      currentPetrol = 0;
    }
  }

  // If we still have petrol left after considering all deficits, a solution exists
  return totalDeficit + currentPetrol >= 0 ? start : -1;
}
