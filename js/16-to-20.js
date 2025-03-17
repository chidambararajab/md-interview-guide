/**
 * Solutions for questions 16-20 (Array and Matrix questions) with detailed time and space complexity analysis.
 */

/**
 * Question 16: Non-overlapping Intervals
 *
 * Find the minimum number of intervals to remove to make the rest non-overlapping.
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @returns {Object} - Object containing count of removed intervals and remaining intervals
 *
 * Time Complexity: O(n log n) - Dominated by the sorting operation
 * Space Complexity: O(n) - For storing the remaining intervals (in worst case, we remove none)
 */
function eraseOverlapIntervals(intervals) {
  if (intervals.length <= 1) {
    return { removed: 0, remaining: [...intervals] };
  }

  // Sort intervals by end time (greedy approach)
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let end = intervals[0][1];
  const remaining = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    // If current interval overlaps with the previous one, remove it
    if (intervals[i][0] < end) {
      count++;
    }
    // Otherwise, keep it and update the end time
    else {
      end = intervals[i][1];
      remaining.push(intervals[i]);
    }
  }

  return { removed: count, remaining };
}

/**
 * Question 17: Set Matrix Zeroes
 *
 * If an element in a matrix is 0, set its entire row and column to 0.
 *
 * @param {number[][]} matrix - 2D matrix of numbers
 * @returns {number[][]} - Modified matrix
 *
 * Time Complexity: O(m*n) - We need to scan the entire matrix twice
 * Space Complexity: O(1) - We use the first row and column as markers
 */
function setZeroes(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return matrix;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  // Check if first row and column need to be zeroed
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Check first row
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Check first column
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Use first row and first column as markers
  // If matrix[i][j] is 0, mark matrix[i][0] and matrix[0][j] as 0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Zero out rows based on markers in first column
  for (let i = 1; i < m; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 1; j < n; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Zero out columns based on markers in first row
  for (let j = 1; j < n; j++) {
    if (matrix[0][j] === 0) {
      for (let i = 1; i < m; i++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Zero out first row if needed
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // Zero out first column if needed
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
}

/**
 * Question 18: Spiral Matrix
 *
 * Return all elements of a matrix in spiral order.
 *
 * @param {number[][]} matrix - 2D matrix of numbers
 * @returns {number[]} - Array of elements in spiral order
 *
 * Time Complexity: O(m*n) - We visit each element exactly once
 * Space Complexity: O(1) - Excluding the output array, we use constant extra space
 */
function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  let direction = 0;

  while (top <= bottom && left <= right) {
    // Move right
    if (direction === 0) {
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top++;
    }
    // Move down
    else if (direction === 1) {
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--;
    }
    // Move left
    else if (direction === 2) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    // Move up
    else if (direction === 3) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }

    // Update direction (0 -> right, 1 -> down, 2 -> left, 3 -> up)
    direction = (direction + 1) % 4;
  }

  return result;
}

/**
 * Question 19: Transpose of a matrix
 *
 * Find the transpose of a given matrix.
 *
 * @param {number[][]} matrix - 2D matrix of numbers
 * @returns {number[][]} - Transposed matrix
 *
 * Time Complexity: O(m*n) - We visit each element exactly once
 * Space Complexity: O(m*n) - We create a new matrix of size n*m
 */
function transpose(matrix) {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const m = matrix.length; // Number of rows
  const n = matrix[0].length; // Number of columns

  // Create a new matrix with swapped dimensions
  const result = Array(n)
    .fill()
    .map(() => Array(m).fill(0));

  // Fill in the transposed values
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}

/**
 * Question 20: Word Search
 *
 * Determine if a word exists in a grid of letters.
 *
 * @param {character[][]} board - 2D grid of characters
 * @param {string} word - Word to search for
 * @returns {boolean} - True if the word exists in the grid, false otherwise
 *
 * Time Complexity: O(m*n*4^L) - where L is the length of the word
 * For each cell (m*n), we potentially explore 4 directions for each character of the word.
 *
 * Space Complexity: O(L) - The recursion depth is bounded by the word length
 */
function exist(board, word) {
  if (!board || board.length === 0 || !word) {
    return false;
  }

  const m = board.length;
  const n = board[0].length;

  // Helper function for DFS
  function dfs(i, j, index) {
    // If we've matched all characters in the word
    if (index === word.length) {
      return true;
    }

    // Out of bounds or character doesn't match
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[index]) {
      return false;
    }

    // Mark as visited by changing the character temporarily
    const temp = board[i][j];
    board[i][j] = "#"; // Use a character that won't match any word

    // Try all four directions
    const found =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1);

    // Restore the original character
    board[i][j] = temp;

    return found;
  }

  // Try starting from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
}
