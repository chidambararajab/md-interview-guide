# DSA Sorting Algorithms - Concepts in Chennai Tanglish

## Intro

Machan, sorting algorithms-na array-la irukra elements ellam correct order-la arrange pannradu. Interview preparation-ku indha concepts romba important, so chumma relax panni padichuko.

## 1. Bubble Sort

### Concept

Bubble Sort-la, nee adjacent elements-a compare panni, wrong order-la iruntha swap panra. Each pass-la, largest element array-oda end-ku "bubble up" aagum.

```javascript
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  
  for (let i = 0; i < n-1; i++) {
    swapped = false;
    
    for (let j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping happened, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}
```

### Simple Example

Array: [5, 1, 4, 2, 8]

First Pass-la:
- 5 > 1? Yes, so swap → [1, 5, 4, 2, 8]
- 5 > 4? Yes, so swap → [1, 4, 5, 2, 8]
- 5 > 2? Yes, so swap → [1, 4, 2, 5, 8]
- 5 > 8? No, so don't swap

Second Pass-la repeating, but last element sorted aachi so process panna vendaam.

### Time & Space

**Time Complexity:**
- Best Case: O(n) - Array already sorted ah iruntha, oru pass panniduven
- Worst Case: O(n²) - Complete reverse order la iruntha, full comparison pannanumm

**Space Complexity:** O(1) - Extra variables thavira vere edhu storage-um use panna maaten

Dei, n² time complexity na enna? Array-la n elements irukku, and worst case-la almost n passes pannanumm. Each pass-la n-i comparisons. So total: (n-1) + (n-2) + ... + 2 + 1 = n(n-1)/2 which is approximately n².

## 2. Selection Sort

### Concept

Selection Sort-la, array-ai sorted and unsorted parts-ah divide panrom. Each time unsorted part-la smallest element-ah find panni, sorted part-oda end-la veppom.

```javascript
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n-1; i++) {
    // Find the minimum element
    let minIdx = i;
    
    for (let j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum with first unsorted
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}
```

### Simple Example

Array: [64, 25, 12, 22, 11]

First Pass-la:
- Find minimum in [64, 25, 12, 22, 11]: 11 at position 4
- Swap 64 and 11: [11, 25, 12, 22, 64]

Second Pass-la:
- Find minimum in [25, 12, 22, 64]: 12 at position 2
- Swap 25 and 12: [11, 12, 25, 22, 64]

And so on...

### Time & Space

**Time Complexity:**
- Always O(n²) - Best, average, worst case ellame same

**Space Complexity:** O(1) - Few variables thavira extra memory thaevai illa

Selection sort time complexity always O(n²) yenna? Because you're always scanning the unsorted portion fully to find the minimum. Array already sorted ah irundhalum reverse ah irundhalum, you still need to do about n²/2 comparisons.

## 3. Insertion Sort

### Concept

Insertion sort-la, array-ai sorted and unsorted parts-ah consider pannuvom. One by one unsorted elements-ah eduthu, sorted portion-la correct position-la insert pannuvom.

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // Pick the element to be inserted
    let key = arr[i];
    let j = i - 1;
    
    // Shift elements greater than key
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
- Take 13, already correct position: [11, 12, 13, 5, 6]
- Take 5, shift until correct spot: [5, 11, 12, 13, 6]
- Take 6, shift until correct spot: [5, 6, 11, 12, 13]

### Time & Space

**Time Complexity:**
- Best Case: O(n) - Array already sorted ah iruntha
- Worst Case: O(n²) - Array reverse sorted ah iruntha

**Space Complexity:** O(1) - Just a few variables

Insertion sort romba efficient for small arrays and "nearly sorted" arrays. Best case O(n) because already sorted na, inner while loop execute aagaadhu. Worst case O(n²) because each element might need to be compared with all previous elements.

## 4. Merge Sort

### Concept

Merge Sort "divide and conquer" strategy use pannudhu. Main concept: array-ai halves-ah divide pannu, recursively sort pannu, then merge pannu.

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

Divide process:
```
[38, 27, 43, 3, 9, 82, 10]
   /                 \
[38, 27, 43, 3]    [9, 82, 10]
   /     \           /    \
[38, 27]  [43, 3]  [9]  [82, 10]
```

Merge process: Single elements merge pannrom, then those sorted subarrays merge pannrom, final array varaikkum.

### Time & Space

**Time Complexity:**
- Always O(n log n) - Best, average, worst cases are all same

**Space Complexity:** O(n) - We need extra space for the merged arrays

Machan, n log n time complexity eppadi varudhu? Array-ai log n times divide pannuvom (because we divide by 2 each time). Each level-la n elements merge panna vendiyirukkum. So n × log n = O(n log n).

Merge sort consistent performance kudukum but O(n) space complexity is a drawback - extra memory thaevaipadudhu.

## 5. Quick Sort

### Concept

Quick Sort-um "divide and conquer" algorithm dhan. Main idea: Oru element-ai pivot-ah select pannu, pivot-ai vida chinna elements left side-la, periya elements right side-la arrange pannu, apparam recursively sort pannu.

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
  const pivot = arr[high]; // Choose rightmost element as pivot
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

Quick sort most real-world situations-la extremely fast. O(n²) worst case varudhu when array already sorted ah iruntha or reverse sorted ah iruntha (if you always pick first/last element as pivot). But randomized pivot select panna, worst case avoid pannalaam.

## 6. Heap Sort

### Concept

Heap Sort binary heap data structure use pannudhu. Process: max heap build pannu (parent is greater than children), then repeatedly maximum extract pannu.

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

Heap sort has consistent performance - always O(n log n) regardless of input distribution. Building the heap takes O(n), extracting each element takes O(log n), so total is O(n log n). Space complexity is O(1) because it's in-place. But practical performance often slower than quick sort yenna cache locality reasons-ku.

## 7. Counting Sort

### Concept

Counting Sort non-comparison based algorithm. Small range of integers-ku use pannalaam. Concept: element frequency count pannu, apparam rebuilt pannu.

```javascript
function countingSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Find max value
  const max = Math.max(...arr);
  
  // Create count array
  const count = Array(max + 1).fill(0);
  
  // Count occurrences
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

1. Max is 8, so create count array of size 9
2. Count occurrences: count = [0, 1, 2, 2, 1, 0, 0, 0, 1]
3. Rebuild sorted array: [1, 2, 2, 3, 3, 4, 8]

### Time & Space

**Time Complexity:** O(n + k) where k is the range of input
**Space Complexity:** O(k) for the count array

Counting sort linear time-la run aagudhu (O(n) can be better than O(n log n)), but only for small range of integers. k >> n na, space waste aagum and performance affected.

## 8. Radix Sort

### Concept

Radix Sort digit by digit sort pannudhu. Least significant digit-lendhu most significant digit varaikkum sort pannuvom, stable sort-ah.

```javascript
function radixSort(arr) {
  // Find max number to know number of digits
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
  
  // Update count[i] to position in output
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
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

**Time Complexity:** O(d * (n + k)) where d is number of digits, k is base (usually 10)
**Space Complexity:** O(n + k)

Machan, for integers with small number of digits, radix sort can be faster than comparison-based sorts like quick sort or merge sort. Practical-la d is small constant, so effectively linear (O(n)) time.

## Which Algorithm to Use When?

- **Small arrays or nearly sorted**: Insertion Sort
- **General purpose**: Quick Sort (average case best)
- **Guaranteed performance needed**: Merge Sort or Heap Sort
- **Integer data with small range**: Counting Sort
- **Integer data with large values**: Radix Sort

Machan, nee concepts-ai purinjikittu, each algorithm-oda pros and cons understand panni iruntha, nalla developer aava. Time complexity, space complexity, and algorithm behavior correct-ah explain panna therinju iruntha, interview-la definite-ah stand out pannuva!
