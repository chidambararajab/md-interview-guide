/**
 * Solutions for linked list questions 31-35 with detailed time and space complexity analysis.
 *
 * Definition for a singly linked list node:
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  if (!arr || arr.length === 0) return null;

  const dummy = new ListNode(0);
  let current = dummy;

  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return dummy.next;
}

// Helper function to convert a linked list to an array (for display)
function linkedListToArray(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

/**
 * Question 31: Reverse a Linked List
 *
 * Reverse a singly linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - New head of the reversed linked list
 *
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(1) - We use constant extra space
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    // Store next node
    const next = current.next;

    // Reverse the link
    current.next = prev;

    // Move pointers forward
    prev = current;
    current = next;
  }

  // prev is the new head
  return prev;
}

/**
 * Recursive solution for reversing a linked list
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - New head of the reversed linked list
 *
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(n) - Due to the recursion stack
 */
function reverseListRecursive(head) {
  // Base case: empty list or single node
  if (!head || !head.next) {
    return head;
  }

  // Reverse the rest of the list
  const newHead = reverseListRecursive(head.next);

  // Change references for current node
  head.next.next = head;
  head.next = null;

  return newHead;
}

/**
 * Question 32: Detect Cycle in a Linked List
 *
 * Determine if a linked list has a cycle.
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {boolean} - True if cycle exists, false otherwise
 *
 * Time Complexity: O(n) - In worst case, we visit each node once
 * Space Complexity: O(1) - We use constant extra space with Floyd's algorithm
 */
function hasCycle(head) {
  if (!head || !head.next) {
    return false;
  }

  // Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // Move one step
    fast = fast.next.next; // Move two steps

    // If cycle exists, slow and fast will meet
    if (slow === fast) {
      return true;
    }
  }

  // If we reach the end, no cycle
  return false;
}

/**
 * Find the starting point of the cycle in a linked list
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode|null} - Start node of the cycle, or null if no cycle
 *
 * Time Complexity: O(n) - We visit each node at most twice
 * Space Complexity: O(1) - We use constant extra space
 */
function detectCycle(head) {
  if (!head || !head.next) {
    return null;
  }

  // Floyd's Cycle-Finding Algorithm (Phase 1)
  let slow = head;
  let fast = head;
  let hasCycle = false;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }

  // If no cycle found
  if (!hasCycle) {
    return null;
  }

  // Phase 2: Find the start of the cycle
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

/**
 * Question 33: Merge Two Sorted Lists
 *
 * Merge two sorted linked lists into one sorted list.
 *
 * @param {ListNode} l1 - Head of first sorted linked list
 * @param {ListNode} l2 - Head of second sorted linked list
 * @returns {ListNode} - Head of merged sorted linked list
 *
 * Time Complexity: O(n + m) - Where n and m are the lengths of the two lists
 * Space Complexity: O(1) - We use constant extra space (only pointers)
 */
function mergeTwoLists(l1, l2) {
  // Create a dummy head to simplify edge cases
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    // Choose the smaller of the two nodes
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes (if any)
  current.next = l1 || l2;

  return dummy.next;
}

/**
 * Question 34: Merge K Sorted Lists
 *
 * Merge k sorted linked lists into one sorted list.
 *
 * @param {ListNode[]} lists - Array of heads of sorted linked lists
 * @returns {ListNode} - Head of merged sorted linked list
 *
 * Time Complexity: O(N log k) - Where N is the total number of nodes and k is the number of lists
 * Space Complexity: O(1) - We use constant extra space (not counting recursion)
 */
function mergeKLists(lists) {
  if (!lists || lists.length === 0) {
    return null;
  }

  if (lists.length === 1) {
    return lists[0];
  }

  // Helper function to merge two lists
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (l1 && l2) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
  }

  // Merge lists using divide and conquer approach
  function mergeKListsHelper(lists, start, end) {
    if (start === end) {
      return lists[start];
    }

    if (start + 1 === end) {
      return mergeTwoLists(lists[start], lists[end]);
    }

    const mid = Math.floor((start + end) / 2);
    const left = mergeKListsHelper(lists, start, mid);
    const right = mergeKListsHelper(lists, mid + 1, end);

    return mergeTwoLists(left, right);
  }

  return mergeKListsHelper(lists, 0, lists.length - 1);
}

/**
 * Alternative solution for Merge K Sorted Lists using a priority queue
 * (In JavaScript, we simulate a priority queue using an array with sorting)
 *
 * @param {ListNode[]} lists - Array of heads of sorted linked lists
 * @returns {ListNode} - Head of merged sorted linked list
 *
 * Time Complexity: O(N log k) - Where N is the total number of nodes and k is the number of lists
 * Space Complexity: O(k) - For the priority queue
 */
function mergeKListsWithPriorityQueue(lists) {
  if (!lists || lists.length === 0) {
    return null;
  }

  // Create a dummy head
  const dummy = new ListNode(0);
  let current = dummy;

  // Create a priority queue (array) of list nodes
  const pq = [];

  // Add the first node from each list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      pq.push(lists[i]);
    }
  }

  // Process nodes from the priority queue
  while (pq.length > 0) {
    // Sort to find the node with smallest value
    pq.sort((a, b) => a.val - b.val);

    // Get the smallest node
    const node = pq.shift();
    current.next = node;
    current = current.next;

    // Add the next node from the same list
    if (node.next) {
      pq.push(node.next);
    }
  }

  return dummy.next;
}
