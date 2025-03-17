/**
 * Solutions for string questions 21-25 with detailed time and space complexity analysis.
 */

/**
 * Question 21: Longest Substring Without Repeating Characters
 *
 * Find the length of the longest substring without repeating characters.
 *
 * @param {string} s - Input string
 * @returns {Object} - Object containing length and the substring
 *
 * Time Complexity: O(n) - We process each character in the string once
 * Space Complexity: O(min(n, m)) - Where m is the size of the character set (alphabet)
 */
function lengthOfLongestSubstring(s) {
  if (!s || s.length === 0) {
    return { length: 0, substring: "" };
  }

  const charMap = new Map(); // Map to store the index of each character
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];

    // If we've seen this character and it's in the current window
    if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
      // Move the start to the position after the previous occurrence
      start = charMap.get(currentChar) + 1;
    }
    // Update max length if current window is larger
    else if (end - start + 1 > maxLength) {
      maxLength = end - start + 1;
      maxStart = start;
    }

    // Update the position of the current character
    charMap.set(currentChar, end);
  }

  return {
    length: maxLength,
    substring: s.substring(maxStart, maxStart + maxLength),
  };
}

/**
 * Question 22: Longest Repeating Character Replacement
 *
 * Find the length of the longest substring with the same letter after replacement.
 *
 * @param {string} s - Input string
 * @param {number} k - Number of replacements allowed
 * @returns {Object} - Object containing length and the substring
 *
 * Time Complexity: O(n) - We process each character in the string once
 * Space Complexity: O(1) - We use a fixed-size array for character frequencies (26 for uppercase letters)
 */
function characterReplacement(s, k) {
  if (!s || s.length === 0) {
    return { length: 0, substring: "" };
  }

  // For uppercase English letters (can be modified for other character sets)
  const charFreq = new Array(26).fill(0);
  let maxCount = 0; // Count of the most frequent character in the current window
  let start = 0;
  let maxLength = 0;
  let maxStart = 0;

  for (let end = 0; end < s.length; end++) {
    // Convert character to 0-25 range (for 'A' to 'Z')
    const charIndex = s.charCodeAt(end) - "A".charCodeAt(0);
    charFreq[charIndex]++;

    // Update the count of the most frequent character
    maxCount = Math.max(maxCount, charFreq[charIndex]);

    // If the number of replacements needed exceeds k, shrink the window
    if (end - start + 1 - maxCount > k) {
      // Decrement the frequency of the character at start
      charFreq[s.charCodeAt(start) - "A".charCodeAt(0)]--;
      start++;
    }

    // Update max length if current window is larger
    if (end - start + 1 > maxLength) {
      maxLength = end - start + 1;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: s.substring(maxStart, maxStart + maxLength),
  };
}

/**
 * Question 23: Smallest Window Containing All Characters
 *
 * Find the smallest substring that contains all characters of a pattern.
 *
 * @param {string} s - Input string
 * @param {string} pattern - Pattern to search for
 * @returns {Object} - Object containing the window and its indices
 *
 * Time Complexity: O(n + m) - Where n is the length of the string and m is the length of the pattern
 * Space Complexity: O(m) - We store frequency of characters in the pattern
 */
function minWindow(s, pattern) {
  if (!s || !pattern || s.length < pattern.length) {
    return { window: "", start: -1, end: -1 };
  }

  // Create a frequency map for the pattern
  const patternFreq = new Map();
  for (const char of pattern) {
    patternFreq.set(char, (patternFreq.get(char) || 0) + 1);
  }

  let required = patternFreq.size; // Number of unique characters needed
  let formed = 0; // Number of unique characters matched with correct frequency

  // Frequency map for the current window
  const windowFreq = new Map();

  let start = 0;
  let minLen = Infinity;
  let resultStart = -1;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    // Update frequency of current character in window
    windowFreq.set(char, (windowFreq.get(char) || 0) + 1);

    // Check if this character helps in forming the required window
    if (
      patternFreq.has(char) &&
      windowFreq.get(char) === patternFreq.get(char)
    ) {
      formed++;
    }

    // Try to minimize the window by moving the start pointer
    while (formed === required) {
      // Update the result if current window is smaller
      if (end - start + 1 < minLen) {
        minLen = end - start + 1;
        resultStart = start;
      }

      // Remove the leftmost character from the window
      const leftChar = s[start];
      windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);

      // If removing this character breaks the window
      if (
        patternFreq.has(leftChar) &&
        windowFreq.get(leftChar) < patternFreq.get(leftChar)
      ) {
        formed--;
      }

      start++;
    }
  }

  return {
    window:
      resultStart === -1 ? "" : s.substring(resultStart, resultStart + minLen),
    start: resultStart,
    end: resultStart === -1 ? -1 : resultStart + minLen - 1,
  };
}

/**
 * Question 24: Check for Anagram
 *
 * Determine if two strings are anagrams of each other.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} - True if strings are anagrams, false otherwise
 *
 * Time Complexity: O(n) - Where n is the length of the strings
 * Space Complexity: O(1) - We use a fixed-size array for character frequencies
 */
function isAnagram(s, t) {
  // If lengths are different, they can't be anagrams
  if (s.length !== t.length) {
    return false;
  }

  // Use a frequency counter approach
  const freqCounter = new Map();

  // Count frequencies in the first string
  for (const char of s) {
    freqCounter.set(char, (freqCounter.get(char) || 0) + 1);
  }

  // Check frequencies in the second string
  for (const char of t) {
    // If character is not in the map or its frequency becomes negative
    if (!freqCounter.has(char) || freqCounter.get(char) === 0) {
      return false;
    }

    freqCounter.set(char, freqCounter.get(char) - 1);
  }

  return true;
}

/**
 * Question 25: Print all anagrams together
 *
 * Group all anagrams from a list of words.
 *
 * @param {string[]} words - Array of words
 * @returns {string[][]} - Array of arrays, where each inner array contains anagrams
 *
 * Time Complexity: O(n * k log k) - Where n is the number of words and k is the maximum word length
 * Space Complexity: O(n * k) - For storing the groups of anagrams
 */
function groupAnagrams(words) {
  if (!words || words.length === 0) {
    return [];
  }

  const anagramGroups = new Map();

  for (const word of words) {
    // Sort the characters in the word to get a key
    const sortedWord = word.split("").sort().join("");

    // Add the word to the appropriate group
    if (!anagramGroups.has(sortedWord)) {
      anagramGroups.set(sortedWord, []);
    }

    anagramGroups.get(sortedWord).push(word);
  }

  // Convert map values to array
  return Array.from(anagramGroups.values());
}

/**
 * Optimized solution for grouping anagrams that doesn't use sorting
 *
 * @param {string[]} words - Array of words
 * @returns {string[][]} - Array of arrays, where each inner array contains anagrams
 *
 * Time Complexity: O(n * k) - Where n is the number of words and k is the maximum word length
 * Space Complexity: O(n * k) - For storing the groups of anagrams
 */
function groupAnagramsOptimized(words) {
  if (!words || words.length === 0) {
    return [];
  }

  const anagramGroups = new Map();

  for (const word of words) {
    // Generate a frequency-based key
    // (e.g., "a1b2c3" for a word with 1 'a', 2 'b's, and 3 'c's)
    const freq = new Array(26).fill(0);

    for (const char of word) {
      const index = char.charCodeAt(0) - "a".charCodeAt(0);
      freq[index]++;
    }

    // Create a unique key for this frequency pattern
    const key = freq
      .map((count, index) => {
        if (count > 0) {
          return String.fromCharCode("a".charCodeAt(0) + index) + count;
        }
        return "";
      })
      .join("");

    // Add the word to the appropriate group
    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
    }

    anagramGroups.get(key).push(word);
  }

  // Convert map values to array
  return Array.from(anagramGroups.values());
}
