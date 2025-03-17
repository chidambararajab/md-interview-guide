# DSA Sorting Algorithms - As Explained by Your Chennai Friend

## Intro

Machan, sorting algorithms-na array-la irukra elements ellam correct order-la arrange pannradu. Nee interview-ku prepare pannriya? Indha sorting algorithms ellam kandippa kekka chance irukku, so chumma relax panni padichuko.

## 1. Bubble Sort - The Noob's Algorithm

### Basic Idea

Dei, Bubble Sort is like arranging your cricket team by height - compare two players side by side, swap them if they're wrong order-la irukku, apparam next pair-ku move on pannu. Biggest element last position-ku bubble up aagum.

```javascript
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  
  // Best practice: Add a flag to optimize for already sorted arrays
  for (let i = 0; i < n-1; i++) {
    swapped = false;
    
    for (let j = A0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        // ES6 swap syntax - clean and easy
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping happened in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}
```

### Simple Example

Array: [5, 1, 4, 2, 8]

First Pass:
- 5 > 1? Yes, so swap → [1, 5, 4, 2, 8]
- 5 > 4? Yes, so swap → [1, 4, 5, 2, 8]
- 5 > 2? Yes, so swap → [1, 4, 2, 5, 8]
- 5 > 8? No, so don't swap

Second Pass:
- Repeat the process but ignore the last element (already in place)

### Time & Space

**Time Complexity:**
- Best Case: O(n) - Array already sorted ah iruntha, oru pass panniduven
- Worst Case: O(n²) - Complete reverse order la iruntha, full comparison pannanumm

**Space Complexity:** O(1) - Extra variables thavira vere edhu storage-um use panna maaten

Machan, idhu n² time-na enna? Comparison count: (n-1) + (n-2) + ... + 2 + 1 = n(n-1)/2 which is approximately n² when n is large. Outer loop n times run aagum, inner loop n times run aagum - that's n² operations!

## 2. Selection Sort - The Simple One

### Basic Idea 

Da, Selection Sort is like picking a team one by one. Unsorted portion-la smallest player-a find pannu, sorted portion-oda end-la vekka. Simple!

```javascript
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n-1; i++) {
    // Find the minimum element in the unsorted part
    let minIdx = i;
    
    for (let j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Only swap if we found a new minimum
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}
```

### Simple Example

Array: [64, 25, 12, 22, 11]

First Pass:
- Find minimum in [64, 25, 12, 22, 11]: 11 at position 4
- Swap 64 and 11: [11, 25, 12, 22, 64]

Second Pass:
- Find minimum in [25, 12, 22, 64]: 12 at position 2
- Swap 25 and 12: [11, 12, 25, 22, 64]

And so on...

### Time & Space

**Time Complexity:**
- Always O(n²) regardless of input - Best, average, worst ellame same

**Space Complexity:** O(1) - No extra memory needed apart from few variables

Selection sort time complexity always O(n²) yenna? Because you're always scanning the unsorted portion fully to find the minimum. Array already sorted ah irundhalum reverse ah irundhalum, you still go through n² / 2 comparisons anyway. But space complexity is O(1) so memory efficient.

## 3. Insertion Sort - The Card Player's Algorithm

### Basic Idea

Machi, insertion sort romba simple - playing cards sort pannra mathiri. Left side sorted ah vachi, one by one cards-ah eduthu, correct position-la insert pannuva.

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // Pick the element to be inserted
    let key = arr[i];
    let j = i - 1;
    
    // Shift elements that are greater than key
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}
```

### Simple Example

Array: [12, 11, 13, 5, 6]

- Start with [12] (considered sorted)
- Take 11, compare with 12, place before: [11, 12, 13, 5, 6]
- Take 13, it's already in right place: [11, 12, 13, 5, 6]
- Take 5, shift until correct spot: [5, 11, 12, 13, 6]
- Take 6, shift until correct spot: [5, 6, 11, 12, 13]

### Time & Space

**Time Complexity:**
- Best Case: O(n) - Array already sorted ah iruntha
- Worst Case: O(n²) - Array reverse sorted ah iruntha

**Space Complexity:** O(1) - Just a few variables, no extra arrays

Real life-la, insertion sort is perfect for small arrays or nearly sorted arrays. Adaptive-nu solluvainga - meaning already sorted portions-a disturb panna maaten.

## 4. Merge Sort - The Efficient Divider

### Basic Idea

Dei, merge sort is divide and conquer champion! Big problem-a small problems-ah break pannu, solve pannu, merge pannu. Recursive ah work pannum.

```javascript
function mergeSort(arr) {
  // Base case
  if (arr.length <= 1) return arr;
  
  // Divide array into halves
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Merge the sorted halves
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  // Compare elements and merge
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### Simple Example

Array: [38, 27, 43, 3, 9, 82, 10]

1. Split into [38, 27, 43, 3] and [9, 82, 10]
2. Keep splitting until single elements
3. Merge back in sorted order

Visualization:
```
[38, 27, 43, 3, 9, 82, 10]
   /                 \
[38, 27, 43, 3]    [9, 82, 10]
   /     \           /    \
[38, 27]  [43, 3]  [9]  [82, 10]
```

And then we merge back upwards!

### Time & Space

**Time Complexity:**
- Always O(n log n) - Best, average, worst cases are all same

**Space Complexity:** O(n) - We need extra space for the merged arrays

Machan, n log n time complexity eppadi varudhu? Array-ah log n times divide pannrom (because we divide by 2 each time). Each level-la n operations to merge. So n × log n = O(n log n).

But space complexity O(n) is a drawback - extra memory venumm, in-place algorithm illa.

## 5. Quick Sort - The Practical Favorite

### Basic Idea

Dei, quick sort is like gully cricket team selection. Oru player-ah captain (pivot) ah select pannu. Captain-ah vida periya players right side, chinna players left side. Apparam recurse.

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Find pivot position
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort elements before and after pivot
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Choose rightmost as pivot
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

### Simple Example

Array: [10, 7, 8, 9, 1, 5]

1. Choose 5 as pivot
2. After partitioning: [1, 5, 8, 9, 10, 7] with pivot at index 1
3. Recursively sort [1] and [8, 9, 10, 7]

### Time & Space

**Time Complexity:**
- Best & Average Case: O(n log n) - When partitioning is balanced
- Worst Case: O(n²) - When pivot is always smallest/largest

**Space Complexity:** O(log n) on average for recursion stack

Machan, quick sort most real-world situations-la extremely fast. But worst-case time complexity O(n²) when array already sorted or reverse sorted ah iruntha (using last element as pivot). Randomized pivot or "median of three" strategy use panni improve pannalaam.

## 6. Heap Sort - The Underrated One

### Basic Idea

Dei, heap sort is binary heap (complete binary tree) use panni sort pannradhu. Max heap build pannu (parent is greater than children), then repeatedly extract max.

```javascript
function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Heapify reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  // Check if left/right child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root, swap and continue heapifying
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
```

### Time & Space

**Time Complexity:**
- Always O(n log n) for all cases

**Space Complexity:** O(1) - In-place sorting

Machan, heap sort has consistent performance - always O(n log n) regardless of input distribution. Space complexity is O(1) because it's in-place. But cache-friendly illa, so practical performance sometimes slower than quick sort.

## 7. Counting Sort - The Integer Specialist

### Basic Idea

Da, counting sort is for when you have a small range of integers. Element frequency count pannu, then rebuild.

```javascript
function countingSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Find max value to determine count array size
  const max = Math.max(...arr);
  
  // Create count array and initialize with zeros
  const count = Array(max + 1).fill(0);
  
  // Count occurrences of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  
  // Rebuild the sorted array
  let sortedIndex = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[sortedIndex++] = i;
      count[i]--;
    }
  }
  
  return arr;
}
```

### Simple Example

Array: [4, 2, 2, 8, 3, 3, 1]

1. Max is 8, so create count array of size 9 (0-8)
2. Count occurrences: count = [0, 1, 2, 2, 1, 0, 0, 0, 1]
3. Rebuild sorted array: [1, 2, 2, 3, 3, 4, 8]

### Time & Space

**Time Complexity:** O(n + k) where k is the range of input
**Space Complexity:** O(k) for the count array

Machan, it's liner time (not n log n) but only works well for small range of integers. If k is much larger than n, then space waste aagum and performance kuraiyum.

## 8. Radix Sort - The Multi-pass Wonder

### Basic Idea

Dei, radix sort digit by digit sort pannradhu - least significant digit-la irundhu most significant digit varaikkum. Each digit position-ku oru pass.

```javascript
function radixSort(arr) {
  // Find the maximum number to know number of digits
  const max = Math.max(...arr);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = Array(n).fill(0);
  const count = Array(10).fill(0); // 0-9 digits
  
  // Store count of occurrences by current digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] to contain actual position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
```

### Time & Space

**Time Complexity:** O(d * (n + k)) where d is number of digits, k is the range (10 for decimal)
**Space Complexity:** O(n + k)

Machan, for long numbers, this is faster than comparison-based sorts like quick sort or merge sort. Practical la d is usually small constant, so effectively O(n) time complexity! But elements all positive integers-ah irukkanum.

## Which Algorithm to Use When?

- **Small arrays or nearly sorted data**: Insertion Sort
- **Memory is tight**: Bubble, Selection, or Insertion Sort
- **General purpose sorting**: Quick Sort (average case best)
- **Stability important**: Merge Sort
- **Guaranteed performance**: Merge Sort or Heap Sort
- **Integer data with small range**: Counting Sort
- **Integer data with large values**: Radix Sort

Machan remember, real-world code-la, programming language-oda built-in sort functions use pannradhu best. Java-la Arrays.sort(), JavaScript-la Array.prototype.sort() - these are optimized implementations, usually hybrid algorithms like Timsort (combo of merge sort and insertion sort).

## Pro Tips for Interviews

1. **Time space tradeoff** pathi pessu - faster algorithms usually need more space
2. **Stability** pathi mention pannu - a stable sort maintains relative order of equal elements
3. **In-place vs extra space** differentiate pannu
4. **Adaptive algorithms** pathi sollu - they work faster on partially sorted data
5. **Code optimizations** show pannu - like swapped flag in bubble sort

Machan, DSA interview-la ipdi sorting algorithms explain panna, nalla impress pannuva! Best of luck!
