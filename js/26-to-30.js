/**
 * Solutions for string questions 26-30 with detailed time and space complexity analysis.
 */

/**
 * Question 26: Check Balanced Parentheses
 *
 * Check if a string has balanced parentheses.
 *
 * @param {string} s - String containing parentheses
 * @returns {boolean} - True if balanced, false otherwise
 *
 * Time Complexity: O(n) - We process each character in the string once
 * Space Complexity: O(n) - In worst case, we push all opening brackets to the stack
 */
function isValidParentheses(s) {
  if (!s) return true;

  const stack = [];
  const openToClose = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (const char of s) {
    // If it's an opening bracket, push to stack
    if (char in openToClose) {
      stack.push(char);
    }
    // If it's a closing bracket
    else if (Object.values(openToClose).includes(char)) {
      // If stack is empty or the top doesn't match
      if (stack.length === 0 || openToClose[stack.pop()] !== char) {
        return false;
      }
    }
    // If it's any other character, ignore it
  }

  // Check if all brackets were closed
  return stack.length === 0;
}

/**
 * Question 27: Sentence Palindrome
 *
 * Check if a sentence is a palindrome ignoring spaces, punctuation, and case.
 *
 * @param {string} sentence - Input sentence
 * @returns {boolean} - True if palindrome, false otherwise
 *
 * Time Complexity: O(n) - We process each character in the string
 * Space Complexity: O(1) - We use constant extra space
 */
function isSentencePalindrome(sentence) {
  if (!sentence) return true;

  // Clean the string: remove non-alphanumeric characters and convert to lowercase
  const cleanSentence = sentence.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Check if it's a palindrome using two pointers
  let left = 0;
  let right = cleanSentence.length - 1;

  while (left < right) {
    if (cleanSentence[left] !== cleanSentence[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

/**
 * Question 28: Longest Palindromic Substring
 *
 * Find the longest palindromic substring in a string.
 *
 * @param {string} s - Input string
 * @returns {Object} - Object containing the palindrome and its indices
 *
 * Time Complexity: O(n²) - For each character, we expand around it
 * Space Complexity: O(1) - We use constant extra space
 */
function longestPalindrome(s) {
  if (!s || s.length === 0) {
    return { palindrome: "", start: -1, end: -1 };
  }

  let start = 0;
  let maxLength = 1; // Single character is always a palindrome

  // Helper function to expand around a center
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // If current palindrome is longer, update result
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  // Check each character as a potential center of a palindrome
  for (let i = 0; i < s.length; i++) {
    // Expand for odd-length palindromes
    expandAroundCenter(i, i);

    // Expand for even-length palindromes
    expandAroundCenter(i, i + 1);
  }

  return {
    palindrome: s.substring(start, start + maxLength),
    start,
    end: start + maxLength - 1,
  };
}

/**
 * Question 29: Palindromic Substrings
 *
 * Count all palindromic substrings in a string.
 *
 * @param {string} s - Input string
 * @returns {Object} - Object containing count and list of palindromic substrings
 *
 * Time Complexity: O(n²) - For each character, we expand around it
 * Space Complexity: O(n²) - To store all palindromic substrings in worst case
 */
function countPalindromicSubstrings(s) {
  if (!s || s.length === 0) {
    return { count: 0, palindromes: [] };
  }

  let count = 0;
  const palindromes = [];

  // Helper function to expand around a center
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      palindromes.push(s.substring(left, right + 1));
      count++;
      left--;
      right++;
    }
  }

  // Check each character as a potential center of a palindrome
  for (let i = 0; i < s.length; i++) {
    // Expand for odd-length palindromes
    expandAroundCenter(i, i);

    // Expand for even-length palindromes
    expandAroundCenter(i, i + 1);
  }

  return { count, palindromes };
}

/**
 * Question 30: Longest Common Prefix
 *
 * Find the longest common prefix among an array of strings.
 *
 * @param {string[]} strs - Array of strings
 * @returns {string} - Longest common prefix
 *
 * Time Complexity: O(S) - Where S is the sum of all characters in all strings
 * Space Complexity: O(1) - We use constant extra space
 */
function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) {
    return "";
  }

  // Start with the first string as the prefix
  let prefix = strs[0];

  // Compare with remaining strings
  for (let i = 1; i < strs.length; i++) {
    // Find the common prefix between current prefix and current string
    let j = 0;
    while (
      j < prefix.length &&
      j < strs[i].length &&
      prefix[j] === strs[i][j]
    ) {
      j++;
    }

    // Update prefix to the common part
    prefix = prefix.substring(0, j);

    // If prefix becomes empty, return it
    if (prefix === "") {
      return "";
    }
  }

  return prefix;
}

/**
 * Alternative solution for Longest Common Prefix using vertical scanning
 *
 * @param {string[]} strs - Array of strings
 * @returns {string} - Longest common prefix
 *
 * Time Complexity: O(S) - Where S is the sum of all characters in all strings
 * Space Complexity: O(1) - We use constant extra space
 */
function longestCommonPrefixVertical(strs) {
  if (!strs || strs.length === 0) {
    return "";
  }

  // Scan vertically (character by character)
  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    // Check if this character is the same in all strings
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  // If we get here, the entire first string is a prefix
  return strs[0];
}
