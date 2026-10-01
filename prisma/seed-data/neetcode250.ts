// NeetCode 250 problems that are NOT part of NeetCode 150.
// Sources (fetched 2026-09-28):
//   - problem list: neetcode.io/practice (problems flagged neetcode250)
//   - patterns: NeetCode category + optimal approach in the NeetCode solution article
//     (github.com/neetcode-gh/leetcode/tree/main/articles), checked against LeetCode topic tags
//   - companies: LeetCode company tags from github.com/liquidslr/leetcode-company-wise-problems
//     and github.com/snehasishroy/leetcode-companywise-interview-questions (union of both;
//     Meta -> Facebook, ByteDance/TikTok -> Bytedance)
// The 150 problems shared with NeetCode 150 are seeded by prisma/seed.ts and are
// intentionally excluded here. Applied by prisma/seed-neetcode250.ts (insert-only).

export type NeetCode250ProblemSeed = {
  platform: 'leetcode'
  problemId: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  url: string
  companies: string[]
  patternNames: string[]
  tags: string[]
}

export const NEETCODE_250_TAG = 'Neetcode250'

export const NEETCODE_250_EXTRA_PROBLEMS: NeetCode250ProblemSeed[] = [
  // ===== ARRAYS & HASHING =====
  { platform: 'leetcode', problemId: '1929', title: 'Concatenation of Array', difficulty: 'easy', url: 'https://leetcode.com/problems/concatenation-of-array', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: [], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '14', title: 'Longest Common Prefix', difficulty: 'easy', url: 'https://leetcode.com/problems/longest-common-prefix', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Trie'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '27', title: 'Remove Element', difficulty: 'easy', url: 'https://leetcode.com/problems/remove-element', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '169', title: 'Majority Element', difficulty: 'easy', url: 'https://leetcode.com/problems/majority-element', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '705', title: 'Design HashSet', difficulty: 'easy', url: 'https://leetcode.com/problems/design-hashset', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '706', title: 'Design HashMap', difficulty: 'easy', url: 'https://leetcode.com/problems/design-hashmap', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '290', title: 'Word Pattern', difficulty: 'easy', url: 'https://leetcode.com/problems/word-pattern', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '380', title: 'Insert Delete GetRandom O(1)', difficulty: 'medium', url: 'https://leetcode.com/problems/insert-delete-getrandom-o1', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Hashing', 'Composite Data Structures'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '912', title: 'Sort an Array', difficulty: 'medium', url: 'https://leetcode.com/problems/sort-an-array', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Sorting'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '75', title: 'Sort Colors', difficulty: 'medium', url: 'https://leetcode.com/problems/sort-colors', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Two pointers', 'Sorting'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '304', title: 'Range Sum Query 2D Immutable', difficulty: 'medium', url: 'https://leetcode.com/problems/range-sum-query-2d-immutable', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Prefix sum', 'Matrix'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '122', title: 'Best Time to Buy And Sell Stock II', difficulty: 'medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Greedy'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '229', title: 'Majority Element II', difficulty: 'medium', url: 'https://leetcode.com/problems/majority-element-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '560', title: 'Subarray Sum Equals K', difficulty: 'medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Grab', 'Agoda'], patternNames: ['Prefix sum', 'Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '41', title: 'First Missing Positive', difficulty: 'hard', url: 'https://leetcode.com/problems/first-missing-positive', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Netflix'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },

  // ===== TWO POINTERS =====
  { platform: 'leetcode', problemId: '344', title: 'Reverse String', difficulty: 'easy', url: 'https://leetcode.com/problems/reverse-string', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '680', title: 'Valid Palindrome II', difficulty: 'easy', url: 'https://leetcode.com/problems/valid-palindrome-ii', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1768', title: 'Merge Strings Alternately', difficulty: 'easy', url: 'https://leetcode.com/problems/merge-strings-alternately', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '88', title: 'Merge Sorted Array', difficulty: 'easy', url: 'https://leetcode.com/problems/merge-sorted-array', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '26', title: 'Remove Duplicates From Sorted Array', difficulty: 'easy', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '18', title: '4Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/4sum', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Sorting', 'Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '189', title: 'Rotate Array', difficulty: 'medium', url: 'https://leetcode.com/problems/rotate-array', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Two pointers'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '881', title: 'Boats to Save People', difficulty: 'medium', url: 'https://leetcode.com/problems/boats-to-save-people', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Sorting', 'Two pointers', 'Greedy'], tags: [NEETCODE_250_TAG] },

  // ===== SLIDING WINDOW =====
  { platform: 'leetcode', problemId: '219', title: 'Contains Duplicate II', difficulty: 'easy', url: 'https://leetcode.com/problems/contains-duplicate-ii', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Netflix'], patternNames: ['Sliding window', 'Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '209', title: 'Minimum Size Subarray Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/minimum-size-subarray-sum', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Sliding window'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '658', title: 'Find K Closest Elements', difficulty: 'medium', url: 'https://leetcode.com/problems/find-k-closest-elements', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Binary search', 'Sliding window'], tags: [NEETCODE_250_TAG] },

  // ===== STACK =====
  { platform: 'leetcode', problemId: '682', title: 'Baseball Game', difficulty: 'easy', url: 'https://leetcode.com/problems/baseball-game', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '225', title: 'Implement Stack Using Queues', difficulty: 'easy', url: 'https://leetcode.com/problems/implement-stack-using-queues', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '232', title: 'Implement Queue using Stacks', difficulty: 'easy', url: 'https://leetcode.com/problems/implement-queue-using-stacks', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '735', title: 'Asteroid Collision', difficulty: 'medium', url: 'https://leetcode.com/problems/asteroid-collision', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '901', title: 'Online Stock Span', difficulty: 'medium', url: 'https://leetcode.com/problems/online-stock-span', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Monotonic stack'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '71', title: 'Simplify Path', difficulty: 'medium', url: 'https://leetcode.com/problems/simplify-path', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Grab'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '394', title: 'Decode String', difficulty: 'medium', url: 'https://leetcode.com/problems/decode-string', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Stack simulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '895', title: 'Maximum Frequency Stack', difficulty: 'hard', url: 'https://leetcode.com/problems/maximum-frequency-stack', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Stack simulation', 'Hashing'], tags: [NEETCODE_250_TAG] },

  // ===== BINARY SEARCH =====
  { platform: 'leetcode', problemId: '35', title: 'Search Insert Position', difficulty: 'easy', url: 'https://leetcode.com/problems/search-insert-position', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '374', title: 'Guess Number Higher Or Lower', difficulty: 'easy', url: 'https://leetcode.com/problems/guess-number-higher-or-lower', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '69', title: 'Sqrt(x)', difficulty: 'easy', url: 'https://leetcode.com/problems/sqrtx', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Binary search on answer'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1011', title: 'Capacity to Ship Packages Within D Days', difficulty: 'medium', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Binary search on answer'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '81', title: 'Search In Rotated Sorted Array II', difficulty: 'medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '410', title: 'Split Array Largest Sum', difficulty: 'hard', url: 'https://leetcode.com/problems/split-array-largest-sum', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search on answer'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1095', title: 'Find in Mountain Array', difficulty: 'hard', url: 'https://leetcode.com/problems/find-in-mountain-array', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search'], tags: [NEETCODE_250_TAG] },

  // ===== LINKED LIST =====
  { platform: 'leetcode', problemId: '92', title: 'Reverse Linked List II', difficulty: 'medium', url: 'https://leetcode.com/problems/reverse-linked-list-ii', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Linked list - Reverse', 'Linked list - Dummy node'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '622', title: 'Design Circular Queue', difficulty: 'medium', url: 'https://leetcode.com/problems/design-circular-queue', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Composite Data Structures'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '460', title: 'LFU Cache', difficulty: 'hard', url: 'https://leetcode.com/problems/lfu-cache', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Netflix', 'Bytedance'], patternNames: ['Composite Data Structures'], tags: [NEETCODE_250_TAG] },

  // ===== TREES =====
  { platform: 'leetcode', problemId: '94', title: 'Binary Tree Inorder Traversal', difficulty: 'easy', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Tree DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '144', title: 'Binary Tree Preorder Traversal', difficulty: 'easy', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Tree DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '145', title: 'Binary Tree Postorder Traversal', difficulty: 'easy', url: 'https://leetcode.com/problems/binary-tree-postorder-traversal', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Tree DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '701', title: 'Insert into a Binary Search Tree', difficulty: 'medium', url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Binary search tree invariants'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '450', title: 'Delete Node in a BST', difficulty: 'medium', url: 'https://leetcode.com/problems/delete-node-in-a-bst', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Binary search tree invariants'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '427', title: 'Construct Quad Tree', difficulty: 'medium', url: 'https://leetcode.com/problems/construct-quad-tree', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Tree DFS', 'Matrix'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '337', title: 'House Robber III', difficulty: 'medium', url: 'https://leetcode.com/problems/house-robber-iii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Tree DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1325', title: 'Delete Leaves With a Given Value', difficulty: 'medium', url: 'https://leetcode.com/problems/delete-leaves-with-a-given-value', companies: ['Amazon', 'Google', 'Microsoft'], patternNames: ['Tree DFS'], tags: [NEETCODE_250_TAG] },

  // ===== HEAP / PRIORITY QUEUE =====
  { platform: 'leetcode', problemId: '1834', title: 'Single Threaded CPU', difficulty: 'medium', url: 'https://leetcode.com/problems/single-threaded-cpu', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Sorting', 'Heap'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '767', title: 'Reorganize String', difficulty: 'medium', url: 'https://leetcode.com/problems/reorganize-string', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['Greedy + heap'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1405', title: 'Longest Happy String', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-happy-string', companies: ['Amazon', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Greedy + heap'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1094', title: 'Car Pooling', difficulty: 'medium', url: 'https://leetcode.com/problems/car-pooling', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Sweep line', 'Heap'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '502', title: 'IPO', difficulty: 'hard', url: 'https://leetcode.com/problems/ipo', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Greedy + heap', 'Two Heaps'], tags: [NEETCODE_250_TAG] },

  // ===== BACKTRACKING =====
  { platform: 'leetcode', problemId: '1863', title: 'Sum of All Subsets XOR Total', difficulty: 'easy', url: 'https://leetcode.com/problems/sum-of-all-subset-xor-totals', companies: ['Amazon', 'Google', 'Microsoft'], patternNames: ['Backtracking', 'Bit manipulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '77', title: 'Combinations', difficulty: 'medium', url: 'https://leetcode.com/problems/combinations', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Backtracking'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '47', title: 'Permutations II', difficulty: 'medium', url: 'https://leetcode.com/problems/permutations-ii', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Backtracking'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '473', title: 'Matchsticks to Square', difficulty: 'medium', url: 'https://leetcode.com/problems/matchsticks-to-square', companies: ['Amazon', 'Facebook', 'Google', 'Bytedance'], patternNames: ['Backtracking'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '698', title: 'Partition to K Equal Sum Subsets', difficulty: 'medium', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Backtracking'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '52', title: 'N Queens II', difficulty: 'hard', url: 'https://leetcode.com/problems/n-queens-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Backtracking'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '140', title: 'Word Break II', difficulty: 'hard', url: 'https://leetcode.com/problems/word-break-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Backtracking', 'Backtracking + memoization'], tags: [NEETCODE_250_TAG] },

  // ===== TRIES =====
  { platform: 'leetcode', problemId: '2707', title: 'Extra Characters in a String', difficulty: 'medium', url: 'https://leetcode.com/problems/extra-characters-in-a-string', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['String DP', 'Trie'], tags: [NEETCODE_250_TAG] },

  // ===== GRAPHS =====
  { platform: 'leetcode', problemId: '463', title: 'Island Perimeter', difficulty: 'easy', url: 'https://leetcode.com/problems/island-perimeter', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Grid traversal'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '953', title: 'Verifying An Alien Dictionary', difficulty: 'easy', url: 'https://leetcode.com/problems/verifying-an-alien-dictionary', companies: ['Amazon', 'Apple', 'Facebook', 'Google'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '997', title: 'Find the Town Judge', difficulty: 'easy', url: 'https://leetcode.com/problems/find-the-town-judge', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '752', title: 'Open The Lock', difficulty: 'medium', url: 'https://leetcode.com/problems/open-the-lock', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Implicit state space BFS/DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1462', title: 'Course Schedule IV', difficulty: 'medium', url: 'https://leetcode.com/problems/course-schedule-iv', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Topological sort', 'Graph DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '721', title: 'Accounts Merge', difficulty: 'medium', url: 'https://leetcode.com/problems/accounts-merge', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Grab'], patternNames: ['Union-Find', 'Graph DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '399', title: 'Evaluate Division', difficulty: 'medium', url: 'https://leetcode.com/problems/evaluate-division', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Graph BFS', 'Graph DFS'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '310', title: 'Minimum Height Trees', difficulty: 'medium', url: 'https://leetcode.com/problems/minimum-height-trees', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Topological sort', 'Graph BFS'], tags: [NEETCODE_250_TAG] },

  // ===== ADVANCED GRAPHS =====
  { platform: 'leetcode', problemId: '1631', title: 'Path with Minimum Effort', difficulty: 'medium', url: 'https://leetcode.com/problems/path-with-minimum-effort', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Shortest path', 'Grid traversal'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1489', title: 'Find Critical and Pseudo Critical Edges in Minimum Spanning Tree', difficulty: 'hard', url: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Minimum spanning tree (MST)', 'Union-Find'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '2392', title: 'Build a Matrix With Conditions', difficulty: 'hard', url: 'https://leetcode.com/problems/build-a-matrix-with-conditions', companies: ['Google'], patternNames: ['Topological sort'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '2709', title: 'Greatest Common Divisor Traversal', difficulty: 'hard', url: 'https://leetcode.com/problems/greatest-common-divisor-traversal', companies: [], patternNames: ['Union-Find', 'Math'], tags: [NEETCODE_250_TAG] },

  // ===== 1-D DYNAMIC PROGRAMMING =====
  { platform: 'leetcode', problemId: '1137', title: 'N-th Tribonacci Number', difficulty: 'easy', url: 'https://leetcode.com/problems/n-th-tribonacci-number', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['1D DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '377', title: 'Combination Sum IV', difficulty: 'medium', url: 'https://leetcode.com/problems/combination-sum-iv', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['1D DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '279', title: 'Perfect Squares', difficulty: 'medium', url: 'https://leetcode.com/problems/perfect-squares', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Knapsack DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '343', title: 'Integer Break', difficulty: 'medium', url: 'https://leetcode.com/problems/integer-break', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['1D DP', 'Math'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1406', title: 'Stone Game III', difficulty: 'hard', url: 'https://leetcode.com/problems/stone-game-iii', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['1D DP'], tags: [NEETCODE_250_TAG] },

  // ===== 2-D DYNAMIC PROGRAMMING =====
  { platform: 'leetcode', problemId: '63', title: 'Unique Paths II', difficulty: 'medium', url: 'https://leetcode.com/problems/unique-paths-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance', 'Agoda'], patternNames: ['2D DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '64', title: 'Minimum Path Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/minimum-path-sum', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['2D DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1049', title: 'Last Stone Weight II', difficulty: 'medium', url: 'https://leetcode.com/problems/last-stone-weight-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Knapsack DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '877', title: 'Stone Game', difficulty: 'medium', url: 'https://leetcode.com/problems/stone-game', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Interval DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1140', title: 'Stone Game II', difficulty: 'medium', url: 'https://leetcode.com/problems/stone-game-ii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['2D DP', 'Prefix sum'], tags: [NEETCODE_250_TAG] },

  // ===== GREEDY =====
  { platform: 'leetcode', problemId: '860', title: 'Lemonade Change', difficulty: 'easy', url: 'https://leetcode.com/problems/lemonade-change', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Greedy'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '918', title: 'Maximum Sum Circular Subarray', difficulty: 'medium', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Kadane'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '978', title: 'Longest Turbulent Subarray', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-turbulent-subarray', companies: ['Amazon', 'Google', 'Microsoft'], patternNames: ['Sliding window', '1D DP'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1871', title: 'Jump Game VII', difficulty: 'medium', url: 'https://leetcode.com/problems/jump-game-vii', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['1D DP', 'Sliding window'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '649', title: 'Dota2 Senate', difficulty: 'medium', url: 'https://leetcode.com/problems/dota2-senate', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Greedy', 'Queue / BFS usage'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '135', title: 'Candy', difficulty: 'hard', url: 'https://leetcode.com/problems/candy', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Greedy'], tags: [NEETCODE_250_TAG] },

  // ===== INTERVALS =====
  { platform: 'leetcode', problemId: '2402', title: 'Meeting Rooms III', difficulty: 'hard', url: 'https://leetcode.com/problems/meeting-rooms-iii', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Intervals', 'Heap'], tags: [NEETCODE_250_TAG] },

  // ===== MATH & GEOMETRY =====
  { platform: 'leetcode', problemId: '168', title: 'Excel Sheet Column Title', difficulty: 'easy', url: 'https://leetcode.com/problems/excel-sheet-column-title', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Math'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '1071', title: 'Greatest Common Divisor of Strings', difficulty: 'easy', url: 'https://leetcode.com/problems/greatest-common-divisor-of-strings', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Math'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '2807', title: 'Insert Greatest Common Divisors in Linked List', difficulty: 'medium', url: 'https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list', companies: ['Facebook', 'Google', 'Microsoft'], patternNames: ['Math'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '867', title: 'Transpose Matrix', difficulty: 'easy', url: 'https://leetcode.com/problems/transpose-matrix', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Matrix'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '13', title: 'Roman to Integer', difficulty: 'easy', url: 'https://leetcode.com/problems/roman-to-integer', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Bytedance'], patternNames: ['Hashing'], tags: [NEETCODE_250_TAG] },

  // ===== BIT MANIPULATION =====
  { platform: 'leetcode', problemId: '67', title: 'Add Binary', difficulty: 'easy', url: 'https://leetcode.com/problems/add-binary', companies: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Bit manipulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '201', title: 'Bitwise AND of Numbers Range', difficulty: 'medium', url: 'https://leetcode.com/problems/bitwise-and-of-numbers-range', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Bit manipulation'], tags: [NEETCODE_250_TAG] },
  { platform: 'leetcode', problemId: '3133', title: 'Minimum Array End', difficulty: 'medium', url: 'https://leetcode.com/problems/minimum-array-end', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Bit manipulation'], tags: [NEETCODE_250_TAG] },
]

// LeetCode ids of the full official NeetCode 250 list (includes the NeetCode 150).
// Every problem with one of these ids gets NEETCODE_250_TAG.
export const NEETCODE_250_OFFICIAL_IDS: string[] = [
  '1929', '217', '242', '1', '14', '49', '27', '169', '705', '706', '912', '75', '347', '271', '304', '238', '36', '128', '122', '229',
  '560', '41', '344', '125', '680', '1768', '88', '26', '167', '15', '18', '189', '11', '881', '42', '219', '121', '3', '424', '567',
  '209', '658', '76', '239', '682', '20', '225', '232', '155', '150', '735', '739', '901', '853', '71', '394', '895', '84', '704', '35',
  '374', '69', '74', '875', '1011', '153', '33', '81', '981', '410', '4', '1095', '206', '21', '141', '143', '19', '138', '2', '287',
  '92', '622', '146', '460', '23', '25', '94', '144', '145', '226', '104', '543', '110', '100', '572', '235', '701', '450', '102', '199',
  '427', '1448', '98', '230', '105', '337', '1325', '124', '297', '703', '1046', '973', '215', '621', '355', '1834', '767', '1405', '1094', '295',
  '502', '1863', '78', '39', '40', '77', '46', '90', '47', '22', '79', '131', '17', '473', '698', '51', '52', '140', '208', '211',
  '2707', '212', '463', '953', '997', '200', '695', '133', '286', '994', '417', '130', '752', '207', '210', '261', '1462', '323', '684', '721',
  '399', '310', '127', '1631', '743', '332', '1584', '778', '269', '787', '1489', '2392', '2709', '70', '746', '1137', '198', '213', '5', '647',
  '91', '322', '152', '139', '300', '416', '377', '279', '343', '1406', '62', '63', '64', '1143', '1049', '309', '518', '494', '97', '877',
  '1140', '329', '115', '72', '312', '10', '860', '53', '918', '978', '55', '45', '1871', '134', '846', '649', '1899', '763', '678', '135',
  '57', '56', '435', '252', '253', '2402', '1851', '168', '1071', '2807', '867', '48', '54', '73', '202', '66', '13', '50', '43', '2013',
  '136', '191', '338', '67', '190', '268', '371', '7', '201', '3133',
]

// Problems tagged NEETCODE_250_TAG on top of the official list (personal additions).
export const NEETCODE_250_CUSTOM_IDS: string[] = ['290', '380']

export const NEETCODE_250_ALL_IDS: string[] = [...NEETCODE_250_OFFICIAL_IDS, ...NEETCODE_250_CUSTOM_IDS]
