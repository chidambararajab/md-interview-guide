/**
 * Solutions for Stack & Queue questions 40-44 with detailed time and space complexity analysis.
 */

/**
 * Question 40: Infix to Postfix expression
 *
 * Convert an infix expression to a postfix expression.
 *
 * @param {string} infix - Infix expression
 * @returns {string} - Postfix expression
 *
 * Time Complexity: O(n) - We process each character in the expression once
 * Space Complexity: O(n) - In worst case, we push all opening operators to the stack
 */
function infixToPostfix(infix) {
  if (!infix) {
    return "";
  }

  const result = [];
  const stack = [];

  // Define operator precedence
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };

  // Helper function to check if a character is an operator
  function isOperator(char) {
    return char in precedence;
  }

  for (const char of infix) {
    // If character is an operand (letter or digit), add to output
    if (/[a-zA-Z0-9]/.test(char)) {
      result.push(char);
    }
    // If character is an opening bracket, push to stack
    else if (char === "(") {
      stack.push(char);
    }
    // If character is a closing bracket, pop from stack until opening bracket
    else if (char === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        result.push(stack.pop());
      }
      // Pop the opening bracket
      if (stack.length > 0 && stack[stack.length - 1] === "(") {
        stack.pop();
      }
    }
    // If character is an operator
    else if (isOperator(char)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        (precedence[stack[stack.length - 1]] > precedence[char] ||
          (precedence[stack[stack.length - 1]] === precedence[char] &&
            char !== "^"))
      ) {
        result.push(stack.pop());
      }
      stack.push(char);
    }
  }

  // Pop any remaining operators from the stack
  while (stack.length > 0) {
    if (stack[stack.length - 1] === "(") {
      return "Invalid Expression"; // Unmatched opening bracket
    }
    result.push(stack.pop());
  }

  return result.join("");
}

/**
 * Question 41: Next Greater Element
 *
 * Find the next greater element for each element in an array.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array where each element is the next greater element
 *
 * Time Complexity: O(n) - We process each element at most twice (once to push, once to pop)
 * Space Complexity: O(n) - For the stack and result array
 */
function nextGreaterElement(nums) {
  if (!nums || nums.length === 0) {
    return [];
  }

  const n = nums.length;
  const result = new Array(n).fill(-1); // Initialize with -1 (no greater element)
  const stack = []; // Stack to store indices

  for (let i = 0; i < n; i++) {
    // While stack is not empty and current element is greater than the element at stack top
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }

    // Push current index to stack
    stack.push(i);
  }

  return result;
}

/**
 * Circular variant: Find the next greater element in a circular array
 *
 * @param {number[]} nums - Array of integers
 * @returns {number[]} - Array where each element is the next greater element
 *
 * Time Complexity: O(n) - We process each element at most twice
 * Space Complexity: O(n) - For the stack and result array
 */
function nextGreaterElementCircular(nums) {
  if (!nums || nums.length === 0) {
    return [];
  }

  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  // Process the array twice to handle circular nature
  for (let i = 0; i < n * 2; i++) {
    const idx = i % n;

    // While stack is not empty and current element is greater than the element at stack top
    while (stack.length > 0 && nums[idx] > nums[stack[stack.length - 1]]) {
      const stackIdx = stack.pop();
      result[stackIdx] = nums[idx];
    }

    // Only push indices from the first iteration
    if (i < n) {
      stack.push(idx);
    }
  }

  return result;
}

/**
 * Question 42: Delete middle element of a stack
 *
 * Delete the middle element of a stack.
 *
 * @param {number[]} stack - Stack represented as an array
 * @returns {number[]} - Stack after deletion
 *
 * Time Complexity: O(n) - We process each element once
 * Space Complexity: O(n) - For the recursion stack
 */
function deleteMiddleElement(stack) {
  if (!stack || stack.length === 0) {
    return stack;
  }

  // Helper function to delete middle element recursively
  function deleteMid(stack, current, middle) {
    // Base case: reached the middle element
    if (current === middle) {
      stack.pop();
      return;
    }

    // Remove current element
    const temp = stack.pop();

    // Recursively delete middle
    deleteMid(stack, current + 1, middle);

    // Push back the removed element
    stack.push(temp);
  }

  const middle = Math.floor(stack.length / 2);
  deleteMid(stack, 0, middle);

  return stack;
}

/**
 * Iterative solution for deleting the middle element
 *
 * @param {number[]} stack - Stack represented as an array
 * @returns {number[]} - Stack after deletion
 *
 * Time Complexity: O(n) - We process each element at most twice
 * Space Complexity: O(n) - For the auxiliary stack
 */
function deleteMiddleElementIterative(stack) {
  if (!stack || stack.length === 0) {
    return stack;
  }

  const middle = Math.floor(stack.length / 2);
  const tempStack = [];

  // Pop elements until we reach the middle
  for (let i = 0; i < middle; i++) {
    tempStack.push(stack.pop());
  }

  // Remove the middle element
  stack.pop();

  // Push back the removed elements
  while (tempStack.length > 0) {
    stack.push(tempStack.pop());
  }

  return stack;
}

/**
 * Question 43: Check mirror in n-ary tree
 *
 * Check if two n-ary trees are mirror images of each other.
 *
 * This implementation assumes each node has a value and an array of children.
 *
 * @param {TreeNode} root1 - Root of first tree
 * @param {TreeNode} root2 - Root of second tree
 * @returns {boolean} - True if trees are mirrors, false otherwise
 *
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(h) - Where h is the height of the tree (for the recursion stack)
 */
function areMirrors(root1, root2) {
  // Both null, they are mirrors
  if (!root1 && !root2) {
    return true;
  }

  // One null but not both, they aren't mirrors
  if (!root1 || !root2) {
    return false;
  }

  // Values don't match, they aren't mirrors
  if (root1.val !== root2.val) {
    return false;
  }

  // Different number of children, they aren't mirrors
  if (root1.children.length !== root2.children.length) {
    return false;
  }

  // Check if children are mirrors in reverse order
  const n = root1.children.length;
  for (let i = 0; i < n; i++) {
    if (!areMirrors(root1.children[i], root2.children[n - 1 - i])) {
      return false;
    }
  }

  return true;
}

/**
 * Question 44: The Celebrity Problem
 *
 * Find a celebrity in a party (someone everyone knows but who knows no one).
 *
 * @param {number[][]} relations - Matrix where relations[i][j] = 1 if i knows j, 0 otherwise
 * @returns {number} - Index of the celebrity, or -1 if no celebrity exists
 *
 * Time Complexity: O(n) - We make at most 2n comparisons
 * Space Complexity: O(1) - We use constant extra space
 */
function findCelebrity(relations) {
  if (!relations || relations.length === 0) {
    return -1;
  }

  const n = relations.length;
  let candidate = 0;

  // Find a potential celebrity
  for (let i = 1; i < n; i++) {
    // If candidate knows i, then candidate can't be a celebrity
    // If candidate doesn't know i, then i can't be a celebrity
    if (relations[candidate][i] === 1) {
      candidate = i;
    }
  }

  // Verify the candidate
  for (let i = 0; i < n; i++) {
    // Skip self
    if (i === candidate) {
      continue;
    }

    // If candidate knows i or i doesn't know candidate, then candidate isn't a celebrity
    if (relations[candidate][i] === 1 || relations[i][candidate] === 0) {
      return -1;
    }
  }

  return candidate;
}

/**
 * Stack-based solution for the Celebrity Problem
 *
 * @param {number[][]} relations - Matrix where relations[i][j] = 1 if i knows j, 0 otherwise
 * @returns {number} - Index of the celebrity, or -1 if no celebrity exists
 *
 * Time Complexity: O(n) - We make at most 2n comparisons
 * Space Complexity: O(n) - For the stack
 */
function findCelebrityWithStack(relations) {
  if (!relations || relations.length === 0) {
    return -1;
  }

  const n = relations.length;
  const stack = [];

  // Push all people to the stack
  for (let i = 0; i < n; i++) {
    stack.push(i);
  }

  // Find a potential celebrity
  while (stack.length > 1) {
    const a = stack.pop();
    const b = stack.pop();

    // If a knows b, a can't be a celebrity
    // If a doesn't know b, b can't be a celebrity
    if (relations[a][b] === 1) {
      stack.push(b);
    } else {
      stack.push(a);
    }
  }

  const candidate = stack.pop();

  // Verify the candidate
  for (let i = 0; i < n; i++) {
    if (i === candidate) {
      continue;
    }

    if (relations[candidate][i] === 1 || relations[i][candidate] === 0) {
      return -1;
    }
  }

  return candidate;
}
