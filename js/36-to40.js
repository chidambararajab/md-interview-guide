/**
 * Solutions for linked list questions 35-39 with detailed time and space complexity analysis.
 *
 * Definition for a singly linked list node:
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */

/**
 * Question 35: Remove Nth Node From End Of List
 *
 * Remove the n-th node from the end of a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} n - Position from the end to remove
 * @returns {ListNode} - Head of the modified linked list
 *
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We use constant extra space
 */
function removeNthFromEnd(head, n) {
  if (!head || n <= 0) {
    return head;
  }

  // Create a dummy node to handle edge cases (removing the head)
  const dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;

  // Advance first pointer by n+1 steps
  for (let i = 0; i <= n; i++) {
    if (!first) return head; // Invalid n (greater than list length)
    first = first.next;
  }

  // Move both pointers until first reaches the end
  while (first) {
    first = first.next;
    second = second.next;
  }

  // Remove the nth node from the end
  second.next = second.next.next;

  return dummy.next;
}

/**
 * Question 36: Reorder List
 *
 * Reorder the list to L0 → Ln → L1 → Ln-1 → L2 → Ln-2...
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - Head of the reordered linked list
 *
 * Time Complexity: O(n) - We traverse the list multiple times but still O(n)
 * Space Complexity: O(1) - We use constant extra space
 */
function reorderList(head) {
  if (!head || !head.next) {
    return head;
  }

  // Step 1: Find the middle of the linked list
  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let prev = null;
  let current = slow.next;
  slow.next = null; // Cut off the first half

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // Step 3: Merge the two halves
  let first = head;
  let second = prev;

  while (second) {
    const firstNext = first.next;
    const secondNext = second.next;

    first.next = second;
    second.next = firstNext;

    first = firstNext;
    second = secondNext;
  }

  return head;
}

/**
 * Question 37: Add 1 to a number represented as linked list
 *
 * Add 1 to a number represented as a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - Head of the resulting linked list
 *
 * Time Complexity: O(n) - We may need to traverse the list twice
 * Space Complexity: O(1) - We use constant extra space
 */
function addOne(head) {
  if (!head) {
    return new ListNode(1);
  }

  // Step 1: Reverse the list
  let reversed = reverseList(head);

  // Step 2: Add 1 to the number
  let current = reversed;
  let carry = 1; // Start with 1 to add

  while (current) {
    const sum = current.val + carry;
    current.val = sum % 10;
    carry = Math.floor(sum / 10);

    // If carry becomes 0, we're done
    if (carry === 0) {
      break;
    }

    // If we're at the last node and still have carry
    if (!current.next && carry > 0) {
      current.next = new ListNode(carry);
      break;
    }

    current = current.next;
  }

  // Step 3: Reverse back
  return reverseList(reversed);

  // Helper function to reverse a list
  function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return prev;
  }
}

/**
 * Question 38: Middle of a given linked list
 *
 * Find the middle node of a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - Middle node of the linked list
 *
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We use constant extra space
 */
function middleNode(head) {
  if (!head || !head.next) {
    return head;
  }

  // Fast and slow pointer approach
  let slow = head;
  let fast = head;

  // When fast reaches the end, slow will be at the middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/**
 * Alternative solution that returns the first middle node when there are two middle nodes
 *
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} - Middle node of the linked list
 *
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We use constant extra space
 */
function findFirstMiddleNode(head) {
  if (!head || !head.next) {
    return head;
  }

  let slow = head;
  let fast = head;

  // Modified condition to find the first middle node when there are two
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/**
 * Question 39: Delete last occurrence from linked list
 *
 * Delete the last occurrence of a key in a linked list.
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} key - Key to delete
 * @returns {ListNode} - Head of the modified linked list
 *
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We use constant extra space
 */
function deleteLastOccurrence(head, key) {
  if (!head) {
    return null;
  }

  let lastOccurrence = null;
  let current = head;
  let prev = null;

  // Find the last occurrence
  while (current) {
    if (current.val === key) {
      lastOccurrence = { node: current, prev };
    }
    prev = current;
    current = current.next;
  }

  // If key not found, return original list
  if (!lastOccurrence) {
    return head;
  }

  // Delete the last occurrence
  if (lastOccurrence.prev) {
    // If it's not the head
    lastOccurrence.prev.next = lastOccurrence.node.next;
  } else {
    // If it's the head
    head = head.next;
  }

  return head;
}

/**
 * Alternative iterative solution for deleting the last occurrence
 *
 * @param {ListNode} head - Head of the linked list
 * @param {number} key - Key to delete
 * @returns {ListNode} - Head of the modified linked list
 *
 * Time Complexity: O(n) - We traverse the list twice in worst case
 * Space Complexity: O(1) - We use constant extra space
 */
function deleteLastOccurrenceIterative(head, key) {
  if (!head) {
    return null;
  }

  // Dummy node to handle edge cases
  const dummy = new ListNode(0);
  dummy.next = head;

  let lastKeyPos = -1;
  let current = dummy.next;
  let pos = 0;

  // Find position of last occurrence
  while (current) {
    if (current.val === key) {
      lastKeyPos = pos;
    }
    current = current.next;
    pos++;
  }

  // If key not found, return original list
  if (lastKeyPos === -1) {
    return head;
  }

  // Find the node just before the last occurrence
  current = dummy;
  pos = -1;

  while (pos < lastKeyPos - 1) {
    current = current.next;
    pos++;
  }

  // Delete the node
  current.next = current.next.next;

  return dummy.next;
}
