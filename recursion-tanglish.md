# Recursion in Tanglish - A Simple Guide with Examples

## Introduction to Recursion

Vanakkam! Inda documentla naan ungalukku recursion pathi explain pannuven. Recursion enbadhu oru function adhe function-ai call pannradhu. Idhu kodukkapatta periya problem-ai chinna chinna pieces-aa break panni solve seiyya help pannum.

(Welcome! In this document, I will explain recursion to you. Recursion is when a function calls itself. This helps solve large problems by breaking them down into smaller pieces.)

## Recursion Basic Concept

Oru recursion function-la rendu main parts irukku:

1. **Base Case** - Idhu recursion-ai niruthardhu. Idhu illa na, function end-e aagadhu.
2. **Recursive Case** - Idhu problem-ai chinna problem-aa reduce panni same function-ai thirumba call pannum.

(A recursive function has two main parts:

1. Base Case - This stops the recursion. Without this, the function will never end.
2. Recursive Case - This reduces the problem and calls the same function again.)

Ithu oru simple example paakalaam:

```javascript
function countDown(n) {
  // Base case
  if (n <= 0) {
    console.log("Done!");
    return;
  }

  // Current value
  console.log(n);

  // Recursive case
  countDown(n - 1);
}

countDown(5);
// Output:
// 5
// 4
// 3
// 2
// 1
// Done!
```

## Recursion Memory Management

Neenga recursion-ai purinjikka, memory management-ai purinjikkanumm. Oru function call aana, adhu stack-la push aagum. Return aana, pop aagum.

(To understand recursion, you need to understand memory management. When a function is called, it's pushed onto the call stack. When it returns, it's popped off.)

```
countDown(5) calls countDown(4) calls countDown(3) calls countDown(2) calls countDown(1) calls countDown(0)
```

Idhu call stack-la ippadi irukum:

```
countDown(0)
countDown(1)
countDown(2)
countDown(3)
countDown(4)
countDown(5)
```

Base case reach aana apparam, function-gal reverse order-la complete aagum:

```
countDown(0) completes
countDown(1) completes
countDown(2) completes
countDown(3) completes
countDown(4) completes
countDown(5) completes
```

## Classic Examples of Recursion in DSA

### 1. Factorial

Factorial is a classic recursion example. n! enbadhu 1 × 2 × ... × n.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 × 4 × 3 × 2 × 1)
```

### 2. Fibonacci Sequence

Fibonacci sequence-la, aduththa number enbadhu adhukku munnadi irukkra rendu numbers-in sum aagum.

```javascript
function fibonacci(n) {
  // Base cases
  if (n <= 1) {
    return n;
  }

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)); // 5
// Sequence: 0, 1, 1, 2, 3, 5
```

### 3. Binary Search (Recursion Version)

Binary search enbadhu oru sorted array-la oru element-ai kandupidikka use pannra efficient algorithm:

```javascript
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Find middle index
  const mid = Math.floor((left + right) / 2);

  // If element is at the middle
  if (arr[mid] === target) {
    return mid;
  }

  // If element is smaller than middle, search in left half
  if (arr[mid] > target) {
    return binarySearch(arr, target, left, mid - 1);
  }

  // If element is larger than middle, search in right half
  return binarySearch(arr, target, mid + 1, right);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(arr, 7)); // 6 (index of 7)
```

### 4. Tree Traversal

Tree traversal-um recursion use panni seyyalaam. Idhu oru simple example:

```javascript
// Define a tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Inorder Traversal (Left, Root, Right)
function inorderTraversal(node, result = []) {
  // Base case
  if (node === null) {
    return result;
  }

  // Recursive case
  inorderTraversal(node.left, result);
  result.push(node.value);
  inorderTraversal(node.right, result);

  return result;
}

// Create a simple tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(inorderTraversal(root)); // [4, 2, 5, 1, 3]
```

## Common Recursion Pitfalls

### 1. Stack Overflow

Romba deep-aa recursion panna, stack overflow error varalaaam. Idhu avoid panna, neenga proper base case podanum.

### 2. Inefficient Recursion

Factorial, Fibonacci pola simple algorithms recursion-la implement pannalam, aanaa inefficient aagalam. Idha solve panna, "memoization" technique use pannalaam:

```javascript
function fibonacciMemo(n, memo = {}) {
  if (n in memo) {
    return memo[n];
  }

  if (n <= 1) {
    return n;
  }

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

console.log(fibonacciMemo(50));
```

## Conclusion

Recursion powerful technique. Base case-ai correct-aa define panni, memory efficiency maintain pannardhu important. Neenga recursion-ai DSA-la use panna start pannalaam, adhukku help-aa intha examples-ai practice pannunga. Happy coding!
