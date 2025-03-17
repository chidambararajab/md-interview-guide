# Top 100 Data Structure and Algorithms (DSA) Interview Questions

*Last Updated: March 17, 2025*

This document contains the top 100 DSA interview questions organized by topic, with sample inputs and outputs to help you practice effectively.

## Table of Contents
- [Array Questions](#array-questions)
- [Matrix Questions](#matrix-questions)
- [String Questions](#string-questions)
- [Linked List Questions](#linked-list-questions)
- [Stack & Queue Questions](#stack--queue-questions)
- [Tree Questions](#tree-questions)
- [Heap Questions](#heap-questions)
- [Graph Questions](#graph-questions)
- [Dynamic Programming Questions](#dynamic-programming-questions)
- [Bit Manipulation Questions](#bit-manipulation-questions)

## Array Questions

### 1. Pair with the given Sum
**Problem:** Find a pair of elements from an array whose sum equals a given number.

**Sample Input:**
```
Array: [1, 4, 45, 6, 10, -8]
Sum: 16
```

**Sample Output:**
```
Pair found: (6, 10)
```

### 2. Best Time to Buy and Sell Stock
**Problem:** Given an array of prices, find the maximum profit by buying and selling a stock once.

**Sample Input:**
```
Prices: [7, 1, 5, 3, 6, 4]
```

**Sample Output:**
```
Maximum Profit: 5
Buy at 1, sell at 6
```

### 3. Find duplicates
**Problem:** Find all duplicates in an array of integers where each integer appears once or twice.

**Sample Input:**
```
Array: [4, 3, 2, 7, 8, 2, 3, 1]
```

**Sample Output:**
```
Duplicates: [2, 3]
```

### 4. Product of Array Except Self
**Problem:** Calculate the product of all elements in the array except the current element without using division.

**Sample Input:**
```
Array: [1, 2, 3, 4]
```

**Sample Output:**
```
Output: [24, 12, 8, 6]
```

### 5. Maximum Subarray
**Problem:** Find the contiguous subarray with the largest sum.

**Sample Input:**
```
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

**Sample Output:**
```
Maximum Sum: 6
Subarray: [4, -1, 2, 1]
```

### 6. Maximum Product Subarray
**Problem:** Find the contiguous subarray with the largest product.

**Sample Input:**
```
Array: [2, 3, -2, 4]
```

**Sample Output:**
```
Maximum Product: 6
Subarray: [2, 3]
```

### 7. Minimum in Rotated Sorted
**Problem:** Find the minimum element in a rotated sorted array.

**Sample Input:**
```
Array: [4, 5, 6, 7, 0, 1, 2]
```

**Sample Output:**
```
Minimum: 0
```

### 8. Search in Rotated Sorted
**Problem:** Search for a target value in a rotated sorted array.

**Sample Input:**
```
Array: [4, 5, 6, 7, 0, 1, 2]
Target: 0
```

**Sample Output:**
```
Index: 4
```

### 9. 3 Sum
**Problem:** Find all triplets in the array that sum up to a target value.

**Sample Input:**
```
Array: [-1, 0, 1, 2, -1, -4]
Target: 0
```

**Sample Output:**
```
Triplets: [[-1, 0, 1], [-1, -1, 2]]
```

### 10. Container With Most Water
**Problem:** Find two lines that together with the x-axis form a container that holds the most water.

**Sample Input:**
```
Height: [1, 8, 6, 2, 5, 4, 8, 3, 7]
```

**Sample Output:**
```
Maximum Area: 49
```

### 11. Factorial of a large number
**Problem:** Calculate factorial of a large number (beyond the range of standard data types).

**Sample Input:**
```
N: 100
```

**Sample Output:**
```
Factorial: 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000
```

### 12. Trapping Rain Water
**Problem:** Calculate how much water can be trapped between bars of varying heights.

**Sample Input:**
```
Heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
```

**Sample Output:**
```
Trapped Water: 6
```

### 13. Chocolate Distribution Problem
**Problem:** Distribute chocolates such that the difference between maximum and minimum chocolates given is minimized.

**Sample Input:**
```
Chocolates: [7, 3, 2, 4, 9, 12, 56]
Students: 3
```

**Sample Output:**
```
Minimum Difference: 2
```

### 14. Insert Interval
**Problem:** Insert a new interval into a sorted list of non-overlapping intervals.

**Sample Input:**
```
Intervals: [[1,3], [6,9]]
New Interval: [2,5]
```

**Sample Output:**
```
Result: [[1,5], [6,9]]
```

### 15. Merge Intervals
**Problem:** Merge all overlapping intervals.

**Sample Input:**
```
Intervals: [[1,3], [2,6], [8,10], [15,18]]
```

**Sample Output:**
```
Merged: [[1,6], [8,10], [15,18]]
```

### 16. Non-overlapping Intervals
**Problem:** Find the minimum number of intervals to remove to make the rest non-overlapping.

**Sample Input:**
```
Intervals: [[1,2], [2,3], [3,4], [1,3]]
```

**Sample Output:**
```
Minimum Removals: 1
```

## Matrix Questions

### 17. Set Matrix Zeroes
**Problem:** If an element in a matrix is 0, set its entire row and column to 0.

**Sample Input:**
```
Matrix: [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
]
```

**Sample Output:**
```
Result: [
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1]
]
```

### 18. Spiral Matrix
**Problem:** Return all elements of a matrix in spiral order.

**Sample Input:**
```
Matrix: [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

**Sample Output:**
```
Spiral Order: [1, 2, 3, 6, 9, 8, 7, 4, 5]
```

### 19. Transpose of a matrix
**Problem:** Find the transpose of a given matrix.

**Sample Input:**
```
Matrix: [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

**Sample Output:**
```
Transpose: [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]
```

### 20. Word Search
**Problem:** Determine if a word exists in a grid of letters.

**Sample Input:**
```
Board: [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
Word: "ABCCED"
```

**Sample Output:**
```
Found: true
```

## String Questions

### 21. Longest Substring Without Repeating
**Problem:** Find the length of the longest substring without repeating characters.

**Sample Input:**
```
String: "abcabcbb"
```

**Sample Output:**
```
Length: 3
Substring: "abc"
```

### 22. Longest Repeating Character Replacement
**Problem:** Find the length of the longest substring with the same letter after replacement.

**Sample Input:**
```
String: "AABABBA"
K (replacements): 1
```

**Sample Output:**
```
Length: 4
```

### 23. Smallest window containing all characters
**Problem:** Find the smallest substring that contains all characters of a pattern.

**Sample Input:**
```
String: "ADOBECODEBANC"
Pattern: "ABC"
```

**Sample Output:**
```
Smallest Window: "BANC"
```

### 24. Check for Anagram
**Problem:** Determine if two strings are anagrams of each other.

**Sample Input:**
```
String 1: "listen"
String 2: "silent"
```

**Sample Output:**
```
Is Anagram: true
```

### 25. Print all anagrams together
**Problem:** Group all anagrams from a list of words.

**Sample Input:**
```
Words: ["eat", "tea", "tan", "ate", "nat", "bat"]
```

**Sample Output:**
```
Groups: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### 26. Check Balanced Parentheses
**Problem:** Check if a string has balanced parentheses.

**Sample Input:**
```
String: "{[()]}"
```

**Sample Output:**
```
Balanced: true
```

### 27. Sentence Palindrome
**Problem:** Check if a sentence is a palindrome ignoring spaces, punctuation, and case.

**Sample Input:**
```
Sentence: "A man, a plan, a canal: Panama"
```

**Sample Output:**
```
Is Palindrome: true
```

### 28. Longest Palindromic Substring
**Problem:** Find the longest palindromic substring in a string.

**Sample Input:**
```
String: "babad"
```

**Sample Output:**
```
Longest Palindrome: "bab" or "aba"
```

### 29. Palindromic Substrings
**Problem:** Count all palindromic substrings in a string.

**Sample Input:**
```
String: "abc"
```

**Sample Output:**
```
Count: 3 (a, b, c)
```

### 30. Longest Common Prefix
**Problem:** Find the longest common prefix among an array of strings.

**Sample Input:**
```
Strings: ["flower", "flow", "flight"]
```

**Sample Output:**
```
Longest Common Prefix: "fl"
```

## Linked List Questions

### 31. Reverse a Linked List
**Problem:** Reverse a singly linked list.

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 4 -> 5
```

**Sample Output:**
```
Reversed: 5 -> 4 -> 3 -> 2 -> 1
```

### 32. Detect Cycle in a Linked List
**Problem:** Determine if a linked list has a cycle.

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 4 -> 2 (points back to 2)
```

**Sample Output:**
```
Has Cycle: true
```

### 33. Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists into one sorted list.

**Sample Input:**
```
List1: 1 -> 2 -> 4
List2: 1 -> 3 -> 4
```

**Sample Output:**
```
Merged: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### 34. Merge K Sorted Lists
**Problem:** Merge k sorted linked lists into one sorted list.

**Sample Input:**
```
Lists: [
  1 -> 4 -> 5,
  1 -> 3 -> 4,
  2 -> 6
]
```

**Sample Output:**
```
Merged: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
```

### 35. Remove Nth Node From End Of List
**Problem:** Remove the n-th node from the end of a linked list.

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 4 -> 5
n: 2
```

**Sample Output:**
```
Result: 1 -> 2 -> 3 -> 5
```

### 36. Reorder List
**Problem:** Reorder the list to L0 → Ln → L1 → Ln-1 → L2 → Ln-2...

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 4
```

**Sample Output:**
```
Reordered: 1 -> 4 -> 2 -> 3
```

### 37. Add 1 to a number represented as linked list
**Problem:** Add 1 to a number represented as a linked list.

**Sample Input:**
```
List: 1 -> 9 -> 9 (represents 199)
```

**Sample Output:**
```
Result: 2 -> 0 -> 0 (represents 200)
```

### 38. Middle of a given linked list
**Problem:** Find the middle node of a linked list.

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 4 -> 5
```

**Sample Output:**
```
Middle: 3
```

### 39. Delete last occurrence from linked list
**Problem:** Delete the last occurrence of a key in a linked list.

**Sample Input:**
```
List: 1 -> 2 -> 3 -> 2 -> 4
Key: 2
```

**Sample Output:**
```
Result: 1 -> 2 -> 3 -> 4
```

## Stack & Queue Questions

### 40. Infix to Postfix expression
**Problem:** Convert an infix expression to a postfix expression.

**Sample Input:**
```
Expression: "a+b*(c^d-e)^(f+g*h)-i"
```

**Sample Output:**
```
Postfix: "abcd^e-fg*h+^*+i-"
```

### 41. Next Greater Element
**Problem:** Find the next greater element for each element in an array.

**Sample Input:**
```
Array: [4, 5, 2, 25]
```

**Sample Output:**
```
Next Greater: [5, 25, 25, -1]
```

### 42. Delete middle element of a stack
**Problem:** Delete the middle element of a stack.

**Sample Input:**
```
Stack: [1, 2, 3, 4, 5]
```

**Sample Output:**
```
Result: [1, 2, 4, 5]
```

### 43. Check mirror in n-ary tree
**Problem:** Check if two n-ary trees are mirror images of each other.

**Sample Input:**
```
Tree1: [1, 2, 3]
Tree2: [1, 3, 2]
```

**Sample Output:**
```
Is Mirror: true
```

### 44. The Celebrity Problem
**Problem:** Find a celebrity in a party (someone everyone knows but who knows no one).

**Sample Input:**
```
Relations: [
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0]
]
```

**Sample Output:**
```
Celebrity: 2
```

### 45. Length of the longest valid substring
**Problem:** Find the length of the longest valid (well-formed) parentheses substring.

**Sample Input:**
```
String: ")()())"
```

**Sample Output:**
```
Length: 4
```

### 46. Print Right View of a Binary Tree
**Problem:** Print the right view of a binary tree.

**Sample Input:**
```
Tree:
    1
   / \
  2   3
 / \   \
4   5   6
```

**Sample Output:**
```
Right View: [1, 3, 6]
```

### 47. Find the first circular tour that visits all
**Problem:** Find the first petrol pump from where a circular tour is possible.

**Sample Input:**
```
Petrol: [4, 6, 7, 4]
Distance: [6, 5, 3, 5]
```

**Sample Output:**
```
Starting Point: 1
```

## Tree Questions

### 48. Maximum Depth of Binary Tree
**Problem:** Find the maximum depth of a binary tree.

**Sample Input:**
```
Tree:
    3
   / \
  9  20
    /  \
   15   7
```

**Sample Output:**
```
Maximum Depth: 3
```

### 49. Check if two trees have same structure
**Problem:** Check if two binary trees have the same structure.

**Sample Input:**
```
Tree1:
    1
   / \
  2   3

Tree2:
    1
   / \
  3   2
```

**Sample Output:**
```
Same Structure: true
```

### 50. Invert/Flip Binary Tree
**Problem:** Invert a binary tree.

**Sample Input:**
```
Tree:
    4
   / \
  2   7
 / \ / \
1  3 6  9
```

**Sample Output:**
```
Inverted:
    4
   / \
  7   2
 / \ / \
9  6 3  1
```

### 51. Binary Tree Maximum Path Sum
**Problem:** Find the maximum path sum in a binary tree.

**Sample Input:**
```
Tree:
    1
   / \
  2   3
```

**Sample Output:**
```
Maximum Path Sum: 6
```

### 52. Binary Tree Level Order Traversal
**Problem:** Traverse a binary tree in level order.

**Sample Input:**
```
Tree:
    3
   / \
  9  20
    /  \
   15   7
```

**Sample Output:**
```
Level Order: [[3], [9, 20], [15, 7]]
```

### 53. Serialize and Deserialize Binary Tree
**Problem:** Design an algorithm to serialize and deserialize a binary tree.

**Sample Input:**
```
Tree:
    1
   / \
  2   3
     / \
    4   5
```

**Sample Output:**
```
Serialized: "1,2,#,#,3,4,#,#,5,#,#"
Deserialized: Same tree
```

### 54. Subtree of Another Tree
**Problem:** Check if a binary tree is a subtree of another binary tree.

**Sample Input:**
```
Tree:
    3
   / \
  4   5
 / \
1   2

Subtree:
  4
 / \
1   2
```

**Sample Output:**
```
Is Subtree: true
```

### 55. Construct Binary Tree from Preorder and Inorder Traversal
**Problem:** Construct a binary tree from preorder and inorder traversal.

**Sample Input:**
```
Preorder: [3, 9, 20, 15, 7]
Inorder: [9, 3, 15, 20, 7]
```

**Sample Output:**
```
Tree:
    3
   / \
  9  20
    /  \
   15   7
```

### 56. Validate Binary Search Tree
**Problem:** Determine if a binary tree is a valid binary search tree.

**Sample Input:**
```
Tree:
    2
   / \
  1   3
```

**Sample Output:**
```
Is Valid BST: true
```

### 57. Kth Smallest Element in a BST
**Problem:** Find the kth smallest element in a binary search tree.

**Sample Input:**
```
BST:
   3
  / \
 1   4
  \
   2
k: 1
```

**Sample Output:**
```
Kth Smallest: 1
```

### 58. Lowest Common Ancestor of BST
**Problem:** Find the lowest common ancestor of two nodes in a binary search tree.

**Sample Input:**
```
BST:
     6
   /   \
  2     8
 / \   / \
0   4 7   9
   / \
  3   5
p: 2, q: 8
```

**Sample Output:**
```
LCA: 6
```

### 59. Implement Trie (Prefix Tree)
**Problem:** Implement a trie with insert, search, and startsWith methods.

**Sample Input:**
```
Operations:
insert("apple")
search("apple")
search("app")
startsWith("app")
```

**Sample Output:**
```
Results:
true
false
true
```

### 60. Add and Search Word
**Problem:** Design a data structure that supports adding and searching for words.

**Sample Input:**
```
Operations:
addWord("bad")
addWord("dad")
addWord("mad")
search("pad")
search("bad")
search(".ad")
search("b..")
```

**Sample Output:**
```
Results:
false
true
true
false
```

## Heap Questions

### 61. Top K Frequent Elements
**Problem:** Find the k most frequent elements in an array.

**Sample Input:**
```
Array: [1, 1, 1, 2, 2, 3]
k: 2
```

**Sample Output:**
```
Top k: [1, 2]
```

### 62. Find Median from Data Stream
**Problem:** Design a data structure that supports adding integers and finding the median.

**Sample Input:**
```
Operations:
addNum(1)
addNum(2)
findMedian()
addNum(3)
findMedian()
```

**Sample Output:**
```
Results:
1.5
2
```

### 63. Largest triplet product in a stream
**Problem:** Find the largest triplet product at each point in a stream of integers.

**Sample Input:**
```
Stream: [1, 2, 3, 4, 5]
```

**Sample Output:**
```
Products: [-1, -1, 6, 24, 60]
```

### 64. Connect n ropes with minimum cost
**Problem:** Connect n ropes with minimum cost, where cost is the sum of lengths of the ropes.

**Sample Input:**
```
Ropes: [4, 3, 2, 6]
```

**Sample Output:**
```
Minimum Cost: 29
```

## Graph Questions

### 65. Clone Graph
**Problem:** Create a deep copy of a graph.

**Sample Input:**
```
Graph with nodes:
1 -- 2
|    |
4 -- 3
```

**Sample Output:**
```
Identical cloned graph
```

### 66. Course Schedule
**Problem:** Determine if it's possible to finish all courses given prerequisites.

**Sample Input:**
```
Courses: 2
Prerequisites: [[1,0]]
```

**Sample Output:**
```
Can Finish: true
```

### 67. Pacific Atlantic Water Flow
**Problem:** Find cells that can flow to both Pacific and Atlantic oceans.

**Sample Input:**
```
Matrix:
[1, 2, 2, 3, 5]
[3, 2, 3, 4, 4]
[2, 4, 5, 3, 1]
[6, 7, 1, 4, 5]
[5, 1, 1, 2, 4]
```

**Sample Output:**
```
Cells: [[0,4], [1,3], [1,4], [2,2], [3,0], [3,1], [4,0]]
```

### 68. Number of Islands
**Problem:** Count the number of islands in a 2D grid.

**Sample Input:**
```
Grid:
[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
```

**Sample Output:**
```
Islands: 1
```

### 69. Longest Consecutive Sequence
**Problem:** Find the length of the longest consecutive sequence in an array.

**Sample Input:**
```
Array: [100, 4, 200, 1, 3, 2]
```

**Sample Output:**
```
Length: 4 (1, 2, 3, 4)
```

### 70. Snake and Ladder Problem
**Problem:** Find the minimum number of dice throws required to reach the destination.

**Sample Input:**
```
Board: 30 cells
Ladders: 2->15, 14->24
Snakes: 17->4, 20->6
```

**Sample Output:**
```
Minimum Dice Throws: 3
```

### 71. Detect Cycle in a Directed Graph
**Problem:** Check if a directed graph contains a cycle.

**Sample Input:**
```
Graph:
0 -> 1 -> 2 -> 3
     ^    |
     |    v
     5 <- 4
```

**Sample Output:**
```
Has Cycle: true
```

### 72. Bridges in a graph
**Problem:** Find all bridges in an undirected graph.

**Sample Input:**
```
Graph:
0 -- 1
|    |
2 -- 3
```

**Sample Output:**
```
Bridges: None
```

### 73. Check whether a given graph is Bipartite or not
**Problem:** Determine if a graph can be divided into two sets with no edges within each set.

**Sample Input:**
```
Graph:
0 -- 1
|    |
3 -- 2
```

**Sample Output:**
```
Is Bipartite: true
```

### 74. Find size of the largest region in Boolean Matrix
**Problem:** Find the size of the largest region connected by 1s in a binary matrix.

**Sample Input:**
```
Matrix:
[
  [0, 0, 1, 1, 0],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1]
]
```

**Sample Output:**
```
Largest Region: 6
```

### 75. Flood fill Algorithm
**Problem:** Implement a flood fill algorithm.

**Sample Input:**
```
Image:
[
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
]
Start: (1, 1)
New Color: 2
```

**Sample Output:**
```
Result:
[
  [2, 2, 2],
  [2, 2, 0],
  [2, 0, 1]
]
```

### 76. Strongly Connected Components
**Problem:** Find all strongly connected components in a directed graph.

**Sample Input:**
```
Graph:
0 -> 1 -> 2 -> 3
^              |
|              v
5 <- 4 <-------
```

**Sample Output:**
```
SCCs: [0,1,2,3,4,5]
```

### 77. Topological Sorting
**Problem:** Perform a topological sort on a directed acyclic graph.

**Sample Input:**
```
Graph:
5 -> 0 <- 4
|         ^
v         |
2 -> 3 ----
```

**Sample Output:**
```
Topological Sort: [5, 4, 2, 3, 0]
```

## Dynamic Programming Questions

### 78. Count ways to reach the n'th stair
**Problem:** Count the number of ways to reach the nth stair.

**Sample Input:**
```
n: 4
```

**Sample Output:**
```
Ways: 5
```

### 79. Coin Change
**Problem:** Find the fewest number of coins needed to make a given amount.

**Sample Input:**
```
Coins: [1, 2, 5]
Amount: 11
```

**Sample Output:**
```
Minimum Coins: 3 (5 + 5 + 1)
```

### 80. 0/1 Knapsack Problem
**Problem:** Find the maximum value subset of items that fit into a knapsack.

**Sample Input:**
```
Values: [60, 100, 120]
Weights: [10, 20, 30]
Capacity: 50
```

**Sample Output:**
```
Maximum Value: 220
```

### 81. Longest Increasing Subsequence
**Problem:** Find the length of the longest increasing subsequence.

**Sample Input:**
```
Array: [10, 22, 9, 33, 21, 50, 41, 60]
```

**Sample Output:**
```
Length: 5 ([10, 22, 33, 50, 60])
```

### 82. Longest Common Subsequence
**Problem:** Find the length of the longest common subsequence of two strings.

**Sample Input:**
```
String 1: "ABCDGH"
String 2: "AEDFHR"
```

**Sample Output:**
```
Length: 3 ("ADH")
```

### 83. Word Break Problem
**Problem:** Determine if a string can be segmented into words from a dictionary.

**Sample Input:**
```
String: "leetcode"
Dictionary: ["leet", "code"]
```

**Sample Output:**
```
Can Segment: true
```

### 84. Dice Throw
**Problem:** Count the number of ways to get a given sum with n dice having m faces.

**Sample Input:**
```
n: 3
m: 6
Sum: 8
```

**Sample Output:**
```
Ways: 21
```

### 85. Egg Dropping Puzzle
**Problem:** Find the minimum number of trials needed to find the critical floor.

**Sample Input:**
```
Eggs: 2
Floors: 10
```

**Sample Output:**
```
Minimum Trials: 4
```

### 86. Matrix Chain Multiplication
**Problem:** Find the most efficient way to multiply matrices.

**Sample Input:**
```
Dimensions: [40, 20, 30, 10, 30]
```

**Sample Output:**
```
Minimum Operations: 26000
```

### 87. Combination Sum
**Problem:** Find all combinations that sum to a target.

**Sample Input:**
```
Array: [2, 3, 6, 7]
Target: 7
```

**Sample Output:**
```
Combinations: [[2, 2, 3], [7]]
```

### 88. Subset Sum Problem
**Problem:** Determine if a subset of an array sums to a given number.

**Sample Input:**
```
Array: [3, 34, 4, 12, 5, 2]
Sum: 9
```

**Sample Output:**
```
Subset Exists: true (4 + 5)
```

### 89. Find maximum possible stolen value from houses
**Problem:** Find the maximum amount that can be stolen from houses (adjacent houses can't be robbed).

**Sample Input:**
```
House Values: [2, 7, 9, 3, 1]
```

**Sample Output:**
```
Maximum Value: 12 (2 + 9 + 1)
```

### 90. Count Possible Decodings of a given Digit Sequence
**Problem:** Count the number of ways to decode a message.

**Sample Input:**
```
Digit Sequence: "121"
```

**Sample Output:**
```
Decodings: 3 ("ABA", "AU", "LA")
```

### 91. Unique paths in a Grid with Obstacles
**Problem:** Count the number of unique paths in a grid with obstacles.

**Sample Input:**
```
Grid:
[
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]
```

**Sample Output:**
```
Unique Paths: 2
```

### 92. Jump Game
**Problem:** Determine if you can reach the last index of an array.

**Sample Input:**
```
Array: [2, 3, 1, 1, 4]
```

**Sample Output:**
```
Can Reach: true
```

### 93. Cutting a Rod
**Problem:** Find the maximum value obtainable by cutting a rod of length n.

**Sample Input:**
```
Length: 8
Prices: [1, 5, 8, 9, 10, 17, 17, 20]
```

**Sample Output:**
```
Maximum Value: 22
```

### 94. Maximum Product Cutting
**Problem:** Find the maximum product obtained by cutting a rope.

**Sample Input:**
```
Length: 10
```

**Sample Output:**
```
Maximum Product: 36
```

### 95. Count number of ways to cover a distance
**Problem:** Count the number of ways to cover a distance with 1, 2, and 3 steps.

**Sample Input:**
```
Distance: 4
```

**Sample Output:**
```
Ways: 7
```

## Bit Manipulation Questions

### 96. Number of 1 Bits
**Problem:** Count the number of 1 bits in an integer.

**Sample Input:**
```
n: 00000000000000000000000000001011
```

**Sample Output:**
```
Count: 3
```

### 97. Counting Bits
**Problem:** Count the number of 1 bits in each number from 0 to n.

**Sample Input:**
```
n: 5
```

**Sample Output:**
```
Counts: [0, 1, 1, 2, 1, 2]
```

### 98. Missing Number
**Problem:** Find the missing number in an array containing n distinct numbers from 0 to n.

**Sample Input:**
```
Array: [3, 0, 1]
```

**Sample Output:**
```
Missing: 2
```

### 99. Reverse Bits
**Problem:** Reverse the bits of a 32-bit unsigned integer.

**Sample Input:**
```
n: 00000010100101000001111010011100
```

**Sample Output:**
```
Reversed: 00111001011110000010100101000000
```

### 100. Find XOR of all subsets of a set
**Problem:** Find the XOR of XORs of all possible subsets of a set.

**Sample Input:**
```
Set: [1, 2, 3]
```

**Sample Output:**
```
Result: 0
```

## Additional Resources

For more practice problems, check out these related resources:

- Top 75 DSA Questions
- Must Do Coding Questions for Companies like Amazon, Microsoft, Adobe
- Commonly Asked Data Structure Interview Questions
- DSA Tutorial
- System Design Tutorial
- Software Development Roadmap