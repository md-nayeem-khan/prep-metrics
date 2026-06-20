import { PrismaClient } from '@prisma/client'
import { SD_TOPIC_SEED, SD_QUESTION_SEED } from './seed-data/system-design'
import { COMPETENCY_SEED, BEHAVIORAL_QUESTION_SEED } from './seed-data/behavioral'

const prisma = new PrismaClient()

// All seeded content is owned by this user so it passes the per-user scoping
// filter in lib/prisma.ts and is visible in the app (rows with userId=null are
// filtered out for authenticated requests). Override with SEED_USER_ID if needed.
const SEED_USER_ID = process.env.SEED_USER_ID ?? 'usr_nayeem1505'

export type PatternSeed = {
	name: string
	category: string
	description?: string
}

export type ProblemTagSeed = {
	name: string
}

export type CompanySeed = {
	name: string
	type: 'group' | 'company'
	description?: string
}

export type ProblemSeed = {
  platform: 'leetcode'
  problemId: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  url: string
  companies: string[]
  patternNames: string[]
  tags: string[]
}

export const COMPANY_SEED: CompanySeed[] = [
	{ name: 'Amazon', type: 'company' },
	{ name: 'Apple', type: 'company' },
	{ name: 'Facebook', type: 'company' },
	{ name: 'Google', type: 'company' },
	{ name: 'Microsoft', type: 'company' },
	{ name: 'Netflix', type: 'company' },
	{ name: 'Bytedance', type: 'company' },
	{ name: 'Grab', type: 'company' },
	{ name: 'Agoda', type: 'company' },
]

export const PROBLEM_TAGS: ProblemTagSeed[] = [
	{ name: 'Blind75' },
	{ name: 'Neetcode150' },
]

export type MilestoneSeed = {
  title: string
  description: string
  targetValue: number
  dueDate: string
}

export type GoalSeed = {
  title: string
  description: string
  type: 'problemCount' | 'patternMastery' | 'companyReady' | 'speedImprovement' | 'streakDays' | 'custom' | 'systemDesignReadiness' | 'behavioralCoverage' | 'storyBankSize' | 'topicMastery'
  track?: 'coding' | 'systemDesign' | 'behavioral'
  targetValue: number
  unit: 'problems' | 'patterns' | 'days' | 'minutes' | 'sessions' | 'percentage' | 'stories' | 'competencies'
  startDate: string
  deadline: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  targetPattern: string | null
  targetCompany: string | null
  targetDifficulty: string | null
  milestones: MilestoneSeed[]
}

export const DEFAULT_TAGS = ['Blind75', 'Neetcode150']

export const PATTERNS: PatternSeed[] = [
  // =========================
  // CORE - ARRAYS & STRINGS
  // =========================
  { name: 'Two pointers', category: 'Core - Arrays & strings', description: 'opposite ends, same direction, fast/slow pointer techniques' },
  { name: 'Sliding window', category: 'Core - Arrays & strings', description: 'fixed and variable size window with dynamic constraints' },
  { name: 'Prefix sum', category: 'Core - Arrays & strings', description: 'range sum queries and cumulative transformations' },
  { name: 'Binary search', category: 'Core - Arrays & strings', description: 'search in sorted space' },
  {
    name: 'Binary search on answer',
    category: 'Core - Arrays & strings',
    description: 'monotonic predicate; the key skill is recognizing that the answer space is monotonic (if X works, X+1 also works). Search minimal/maximal feasible value. Candidates fail not on the binary search itself but on identifying when to apply it.',
  },
  { name: 'Hashing', category: 'Core - Arrays & strings', description: 'frequency map, grouping, deduplication' },
  { name: 'Sorting', category: 'Core - Arrays & strings', description: 'interval merging, scheduling, ordering decisions' },
  { name: 'Intervals', category: 'Core - Arrays & strings', description: 'merge/insert intervals, meeting rooms, overlap scheduling' },
  { name: 'Sweep line', category: 'Core - Arrays & strings', description: 'event-based overlap counting using +1/-1' },
  { name: 'Monotonic stack', category: 'Core - Arrays & strings', description: 'next greater/smaller, histogram problems' },
  { name: 'Monotonic queue', category: 'Core - Arrays & strings', description: 'sliding window min/max' },
  { name: 'Kadane', category: 'Core - Arrays & strings', description: 'optimal subarray sum variants' },
  { name: 'Selection', category: 'Core - Arrays & strings', description: 'quickselect, heap-based selection' },
  { name: 'Matrix', category: 'Core - Arrays & strings', description: 'spiral traversal, 90-degree rotation, diagonal parsing' },
 
  // =========================
  // CORE - LINKED LIST
  // =========================
  { name: 'Linked list - Dummy node', category: 'Core - Linked list', description: 'simplify insertion/deletion edge cases' },
  { name: 'Linked list - Fast/slow pointers', category: 'Core - Linked list', description: 'cycle detection, middle node' },
  { name: 'Linked list - Reverse', category: 'Core - Linked list', description: 'full and k-group reversal' },
  { name: 'Linked list - Merge', category: 'Core - Linked list', description: 'merge sorted lists' },
 
  // =========================
  // CORE - STACK / QUEUE
  // =========================
  { name: 'Stack simulation', category: 'Core - Stack & queue', description: 'parsing, validation, recursion simulation' },
  { name: 'Queue / BFS usage', category: 'Core - Stack & queue', description: 'level order traversal and state expansion' },
 
  // =========================
  // CORE - TREES
  // =========================
  { name: 'Tree DFS', category: 'Core - Trees', description: 'recursive traversal and subtree aggregation' },
  { name: 'Tree BFS', category: 'Core - Trees', description: 'level order traversal' },
  { name: 'Tree path problems', category: 'Core - Trees', description: 'path sum, diameter, max path' },
  { name: 'Binary search tree invariants', category: 'Core - Trees', description: 'inorder sorted property' },
  { name: 'Lowest common ancestor', category: 'Core - Trees', description: 'LCA in trees and BST' },
  { name: 'Trie', category: 'Core - Trees', description: 'prefix tree, autocomplete, word search' },
 
  // =========================
  // CORE - GRAPHS
  // =========================
  { name: 'Graph DFS', category: 'Core - Graphs', description: 'traversal and connected components' },
  { name: 'Graph BFS', category: 'Core - Graphs', description: 'shortest path in unweighted graph' },
  { name: 'Grid traversal', category: 'Core - Graphs', description: 'implicit graph DFS/BFS (islands, flood fill)' },
  { name: 'Multi-source BFS', category: 'Core - Graphs', description: 'multiple starting points' },
  {
    name: 'Implicit state space BFS/DFS',
    category: 'Core - Graphs',
    description: 'BFS/DFS where nodes are states, not coordinates (e.g. word ladder, lock combination, sliding puzzle). The graph is conceptual — each unique state is a node, each valid transition is an edge. Distinct from grid traversal.',
  },
  { name: 'Topological sort', category: 'Core - Graphs', description: 'DAG ordering (Kahn / DFS)' },
  {
    name: 'Cycle detection in graphs',
    category: 'Core - Graphs',
    description: 'DFS with visited/rec-stack coloring for directed graphs (white-gray-black). Distinct from Union-Find which covers undirected graphs. Core for dependency, scheduling, and course-prerequisite problems.',
  },
  {
    name: 'Union-Find',
    category: 'Core - Graphs',
    description: 'connectivity and cycle detection in undirected graphs. Always implement with path compression + union by rank for near-O(1) ops (inverse Ackermann). Interviewers at 5 YOE specifically probe the complexity guarantee.',
  },
  { name: 'Shortest path', category: 'Core - Graphs', description: 'Dijkstra-style problems' },
  { name: 'Bipartite graph', category: 'Core - Graphs', description: '2-coloring and odd cycle detection' },
 
  // =========================
  // CORE - DYNAMIC PROGRAMMING
  // =========================
  { name: '1D DP', category: 'Core - Dynamic programming', description: 'linear state transitions' },
  { name: '2D DP', category: 'Core - Dynamic programming', description: 'grid/table DP' },
  { name: 'Sequence DP', category: 'Core - Dynamic programming', description: 'LIS, LCS patterns' },
  { name: 'Knapsack DP', category: 'Core - Dynamic programming', description: '0/1 and unbounded variants' },
  { name: 'String DP', category: 'Core - Dynamic programming', description: 'edit distance, palindrome partitioning' },
  {
    name: 'State machine DP',
    category: 'Core - Dynamic programming',
    description: 'explicit states (hold, sold, cooldown) as DP dimensions. The key skill is drawing the FSM (state transition diagram) first, then deriving recurrences from it. Classic: buy/sell stock variants.',
  },
 
  // =========================
  // CORE - BACKTRACKING
  // =========================
  { name: 'Backtracking', category: 'Core - Backtracking', description: 'subsets, permutations, combinations' },
  {
    name: 'Backtracking + memoization',category: 'Core - Backtracking', description: 'when a backtracking solution revisits identical sub-states, adding a memo cache converts it to top-down DP — same template, O(states × branches) instead of exponential. The conversion direction: backtracking → add memo = top-down DP.',},
 
  // =========================
  // CORE - GREEDY / HEAP
  // =========================
  {
    name: 'Greedy',
    category: 'Core - Greedy',
    description: 'local optimal choice proven globally optimal. At 5 YOE, interviewers expect justification — use the exchange argument: assume an optimal solution swaps two adjacent choices and show it does not improve the result.',
  },
  { name: 'Heap', category: 'Core - Greedy', description: 'top-k, scheduling, streaming' },
  { name: 'Greedy + heap', category: 'Core - Greedy', description: 'task scheduling, interval problems' },
  { name: 'Two Heaps', category: 'Core - Greedy', description: 'maintaining a running median or balancing data streams' },
 
  // =========================
  // CORE - BIT MANIPULATION
  // =========================
  { name: 'Bit manipulation', category: 'Core - Bit manipulation', description: 'xor, masks, bit tricks' },
 
  // =========================
  // CORE - DATA STRUCTURE DESIGN
  // =========================
  { name: 'Composite Data Structures', category: 'Core - Design', description: 'combining HashMaps with DLLs or Arrays (e.g., LRU/LFU Cache, O(1) structures)' },
  { name: 'Iterator Design', category: 'Core - Design', description: 'flattening nested arrays, BST iterators, peeking iterators' },
 
  // =========================
  // STANDARD (OCCASIONAL)
  // =========================
  { name: 'Rolling hash', category: 'Standard', description: 'Rabin-Karp style substring hashing' },
  { name: 'String matching', category: 'Standard', description: 'KMP, Z-algorithm (Low ROI - prefer Rolling Hash)' },
  { name: 'String encoding', category: 'Standard', description: 'encode/decode, delimiter escaping, length-prefix techniques' },
  { name: 'Range query structures', category: 'Standard', description: 'segment tree, Fenwick tree' },
  { name: 'Meet in the middle', category: 'Standard', description: 'split search space for subset problems' },
  { name: 'Math', category: 'Standard', description: 'number manipulation, modular arithmetic basics, fast exponentiation' },
  {
    name: 'Reservoir sampling / randomization',
    category: 'Standard',
    description: 'random pick with weight, random node in linked list, Fisher-Yates shuffle. Appears more frequently than rolling hash at 5 YOE big tech interviews.',
  },
  {
    name: 'Minimum spanning tree (MST)',
    category: 'Standard', // MOVED from Advanced
    description: 'Kruskal (sort edges + Union-Find) and Prim (greedy with heap). "Min cost to connect all points" is a real 5 YOE question at Google/Meta. Skip only Borůvka and exotic MST variants.',
  },
  { name: 'Interval DP', category: 'Standard', description: 'merge intervals, burst balloons, matrix chain — appears rarely even at senior level; lower priority than other DP patterns' }, // MOVED from Core
 
  // =========================
  // ADVANCED (RARE)
  // =========================
  { name: 'Advanced graph algorithms', category: 'Advanced', description: 'SCC, bridges, articulation points (Safe to skip at 5 YOE)' },
  { name: 'Network flow', category: 'Advanced', description: 'max-flow min-cut problems (Safe to skip at 5 YOE)' },
  { name: 'Advanced DP', category: 'Advanced', description: 'subset DP, digit DP' },
  { name: 'Advanced tree techniques', category: 'Advanced', description: 'HLD, binary lifting' },
  { name: 'Mathematical algorithms', category: 'Advanced', description: 'combinatorics, modular arithmetic' },
];

export const NEETCODE_150_PROBLEMS: ProblemSeed[] = [
  // ===== ARRAYS & HASHING =====
  { platform: 'leetcode', problemId: '217', title: 'Contains Duplicate', difficulty: 'easy', url: 'https://leetcode.com/problems/contains-duplicate', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '242', title: 'Valid Anagram', difficulty: 'easy', url: 'https://leetcode.com/problems/valid-anagram', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Hashing'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '1', title: 'Two Sum', difficulty: 'easy', url: 'https://leetcode.com/problems/two-sum', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Apple'], patternNames: ['Hashing'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '49', title: 'Group Anagrams', difficulty: 'medium', url: 'https://leetcode.com/problems/group-anagrams', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Hashing'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '347', title: 'Top K Frequent Elements', difficulty: 'medium', url: 'https://leetcode.com/problems/top-k-frequent-elements', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Selection', 'Heap'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '271', title: 'Encode and Decode Strings', difficulty: 'medium', url: 'https://leetcode.com/problems/encode-and-decode-strings', companies: ['Facebook', 'Google'], patternNames: ['String encoding'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '238', title: 'Product of Array Except Self', difficulty: 'medium', url: 'https://leetcode.com/problems/product-of-array-except-self', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Prefix sum'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '36', title: 'Valid Sudoku', difficulty: 'medium', url: 'https://leetcode.com/problems/valid-sudoku', companies: ['Amazon', 'Facebook'], patternNames: ['Hashing'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '128', title: 'Longest Consecutive Sequence', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence', companies: ['Amazon', 'Google'], patternNames: ['Hashing'], tags: DEFAULT_TAGS },

  // ===== TWO POINTERS =====
  { platform: 'leetcode', problemId: '125', title: 'Valid Palindrome', difficulty: 'easy', url: 'https://leetcode.com/problems/valid-palindrome', companies: ['Amazon', 'Facebook'], patternNames: ['Two pointers'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '167', title: 'Two Sum II Input Array Is Sorted', difficulty: 'medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Two pointers'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '15', title: '3Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/3sum', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Sorting', 'Two pointers'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '11', title: 'Container With Most Water', difficulty: 'medium', url: 'https://leetcode.com/problems/container-with-most-water', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Two pointers'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '42', title: 'Trapping Rain Water', difficulty: 'hard', url: 'https://leetcode.com/problems/trapping-rain-water', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Two pointers', 'Monotonic stack'], tags: ['Neetcode150'] },

  // ===== SLIDING WINDOW =====
  { platform: 'leetcode', problemId: '121', title: 'Best Time to Buy And Sell Stock', difficulty: 'easy', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', companies: ['Amazon', 'Facebook'], patternNames: ['Greedy'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Sliding window'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '424', title: 'Longest Repeating Character Replacement', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Sliding window'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '567', title: 'Permutation In String', difficulty: 'medium', url: 'https://leetcode.com/problems/permutation-in-string', companies: ['Amazon', 'Facebook'], patternNames: ['Sliding window'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '76', title: 'Minimum Window Substring', difficulty: 'hard', url: 'https://leetcode.com/problems/minimum-window-substring', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Sliding window'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '239', title: 'Sliding Window Maximum', difficulty: 'hard', url: 'https://leetcode.com/problems/sliding-window-maximum', companies: ['Amazon', 'Google'], patternNames: ['Monotonic queue'], tags: ['Neetcode150'] },

  // ===== STACK =====
  { platform: 'leetcode', problemId: '20', title: 'Valid Parentheses', difficulty: 'easy', url: 'https://leetcode.com/problems/valid-parentheses', companies: ['Amazon', 'Facebook'], patternNames: ['Stack simulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '155', title: 'Min Stack', difficulty: 'medium', url: 'https://leetcode.com/problems/min-stack', companies: ['Amazon', 'Facebook'], patternNames: ['Stack simulation'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '150', title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation', companies: ['Amazon'], patternNames: ['Stack simulation'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '739', title: 'Daily Temperatures', difficulty: 'medium', url: 'https://leetcode.com/problems/daily-temperatures', companies: ['Amazon', 'Facebook'], patternNames: ['Monotonic stack'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '853', title: 'Car Fleet', difficulty: 'medium', url: 'https://leetcode.com/problems/car-fleet', companies: ['Amazon', 'Google'], patternNames: ['Sorting', 'Monotonic stack'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '84', title: 'Largest Rectangle In Histogram', difficulty: 'hard', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Monotonic stack'], tags: ['Neetcode150'] },

  // ===== BINARY SEARCH =====
  { platform: 'leetcode', problemId: '704', title: 'Binary Search', difficulty: 'easy', url: 'https://leetcode.com/problems/binary-search', companies: ['Amazon', 'Facebook'], patternNames: ['Binary search'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '74', title: 'Search a 2D Matrix', difficulty: 'medium', url: 'https://leetcode.com/problems/search-a-2d-matrix', companies: ['Amazon', 'Microsoft'], patternNames: ['Binary search'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '875', title: 'Koko Eating Bananas', difficulty: 'medium', url: 'https://leetcode.com/problems/koko-eating-bananas', companies: ['Amazon', 'Google'], patternNames: ['Binary search on answer'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '153', title: 'Find Minimum In Rotated Sorted Array', difficulty: 'medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array', companies: ['Amazon', 'Google'], patternNames: ['Binary search'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '33', title: 'Search In Rotated Sorted Array', difficulty: 'medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Binary search'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '981', title: 'Time Based Key Value Store', difficulty: 'medium', url: 'https://leetcode.com/problems/time-based-key-value-store', companies: ['Amazon', 'Facebook'], patternNames: ['Hashing', 'Binary search'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '4', title: 'Median of Two Sorted Arrays', difficulty: 'hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays', companies: ['Google', 'Microsoft', 'Amazon'], patternNames: ['Binary search'], tags: ['Neetcode150'] },

  // ===== LINKED LIST =====
  { platform: 'leetcode', problemId: '206', title: 'Reverse Linked List', difficulty: 'easy', url: 'https://leetcode.com/problems/reverse-linked-list', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Linked list - Reverse'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '21', title: 'Merge Two Sorted Lists', difficulty: 'easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists', companies: ['Amazon', 'Microsoft'], patternNames: ['Linked list - Merge'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '141', title: 'Linked List Cycle', difficulty: 'easy', url: 'https://leetcode.com/problems/linked-list-cycle', companies: ['Amazon', 'Facebook'], patternNames: ['Linked list - Fast/slow pointers'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '143', title: 'Reorder List', difficulty: 'medium', url: 'https://leetcode.com/problems/reorder-list', companies: ['Amazon', 'Facebook'], patternNames: ['Linked list - Fast/slow pointers', 'Linked list - Reverse'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '19', title: 'Remove Nth Node From End of List', difficulty: 'medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Linked list - Fast/slow pointers'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '138', title: 'Copy List With Random Pointer', difficulty: 'medium', url: 'https://leetcode.com/problems/copy-list-with-random-pointer', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Hashing'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '2', title: 'Add Two Numbers', difficulty: 'medium', url: 'https://leetcode.com/problems/add-two-numbers', companies: ['Amazon', 'Facebook'], patternNames: ['Linked list - Dummy node'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '287', title: 'Find The Duplicate Number', difficulty: 'medium', url: 'https://leetcode.com/problems/find-the-duplicate-number', companies: ['Amazon', 'Google'], patternNames: ['Linked list - Fast/slow pointers'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '146', title: 'LRU Cache', difficulty: 'medium', url: 'https://leetcode.com/problems/lru-cache', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Composite Data Structures'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '23', title: 'Merge K Sorted Lists', difficulty: 'hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists', companies: ['Amazon', 'Google'], patternNames: ['Linked list - Merge', 'Heap'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '25', title: 'Reverse Nodes In K Group', difficulty: 'hard', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group', companies: ['Amazon', 'Facebook'], patternNames: ['Linked list - Reverse'], tags: ['Neetcode150'] },

  // ===== TREES =====
  { platform: 'leetcode', problemId: '226', title: 'Invert Binary Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/invert-binary-tree', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '104', title: 'Maximum Depth of Binary Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree', companies: ['Amazon', 'Facebook'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '543', title: 'Diameter of Binary Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/diameter-of-binary-tree', companies: ['Amazon', 'Facebook'], patternNames: ['Tree DFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '110', title: 'Balanced Binary Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/balanced-binary-tree', companies: ['Amazon', 'Facebook'], patternNames: ['Tree DFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '100', title: 'Same Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/same-tree', companies: ['Amazon'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '572', title: 'Subtree of Another Tree', difficulty: 'easy', url: 'https://leetcode.com/problems/subtree-of-another-tree', companies: ['Amazon'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '235', title: 'Lowest Common Ancestor of a BST', difficulty: 'medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree', companies: ['Amazon', 'Facebook'], patternNames: ['Lowest common ancestor', 'Binary search tree invariants'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '102', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Tree BFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '199', title: 'Binary Tree Right Side View', difficulty: 'medium', url: 'https://leetcode.com/problems/binary-tree-right-side-view', companies: ['Amazon', 'Facebook'], patternNames: ['Tree BFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '1448', title: 'Count Good Nodes In Binary Tree', difficulty: 'medium', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree', companies: ['Amazon'], patternNames: ['Tree DFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '98', title: 'Validate BST', difficulty: 'medium', url: 'https://leetcode.com/problems/validate-binary-search-tree', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], patternNames: ['Binary search tree invariants'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '230', title: 'Kth Smallest Element In BST', difficulty: 'medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst', companies: ['Amazon', 'Google'], patternNames: ['Binary search tree invariants'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '105', title: 'Construct Tree', difficulty: 'medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal', companies: ['Amazon', 'Facebook'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '124', title: 'Binary Tree Max Path Sum', difficulty: 'hard', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum', companies: ['Amazon', 'Google'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '297', title: 'Serialize Tree', difficulty: 'hard', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree', companies: ['Facebook', 'Google'], patternNames: ['Tree DFS'], tags: DEFAULT_TAGS },

  // ===== HEAP =====
  { platform: 'leetcode', problemId: '703', title: 'Kth Largest Stream', difficulty: 'easy', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream', companies: ['Amazon'], patternNames: ['Heap'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '1046', title: 'Last Stone Weight', difficulty: 'easy', url: 'https://leetcode.com/problems/last-stone-weight', companies: ['Amazon'], patternNames: ['Heap'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '973', title: 'K Closest Points', difficulty: 'medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Heap'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '215', title: 'Kth Largest Element', difficulty: 'medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Heap'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '621', title: 'Task Scheduler', difficulty: 'medium', url: 'https://leetcode.com/problems/task-scheduler', companies: ['Amazon', 'Facebook'], patternNames: ['Greedy', 'Heap'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '355', title: 'Design Twitter', difficulty: 'medium', url: 'https://leetcode.com/problems/design-twitter', companies: ['Facebook', 'Google'], patternNames: ['Composite Data Structures'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '295', title: 'Find Median Stream', difficulty: 'hard', url: 'https://leetcode.com/problems/find-median-from-data-stream', companies: ['Google', 'Amazon', 'Microsoft'], patternNames: ['Two Heaps'], tags: DEFAULT_TAGS },

  // ===== BACKTRACKING =====
  { platform: 'leetcode', problemId: '78', title: 'Subsets', difficulty: 'medium', url: 'https://leetcode.com/problems/subsets', companies: ['Amazon', 'Facebook'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '39', title: 'Combination Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/combination-sum', companies: ['Amazon', 'Facebook'], patternNames: ['Backtracking'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '40', title: 'Combination Sum II', difficulty: 'medium', url: 'https://leetcode.com/problems/combination-sum-ii', companies: ['Amazon'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '46', title: 'Permutations', difficulty: 'medium', url: 'https://leetcode.com/problems/permutations', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '90', title: 'Subsets II', difficulty: 'medium', url: 'https://leetcode.com/problems/subsets-ii', companies: ['Amazon'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '22', title: 'Generate Parentheses', difficulty: 'medium', url: 'https://leetcode.com/problems/generate-parentheses', companies: ['Amazon', 'Facebook'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '79', title: 'Word Search', difficulty: 'medium', url: 'https://leetcode.com/problems/word-search', companies: ['Amazon', 'Microsoft'], patternNames: ['Backtracking'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '131', title: 'Palindrome Partitioning', difficulty: 'medium', url: 'https://leetcode.com/problems/palindrome-partitioning', companies: ['Amazon', 'Facebook'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '17', title: 'Letter Combinations', difficulty: 'medium', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', companies: ['Amazon', 'Facebook'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '51', title: 'N Queens', difficulty: 'hard', url: 'https://leetcode.com/problems/n-queens', companies: ['Google', 'Amazon'], patternNames: ['Backtracking'], tags: ['Neetcode150'] },

  // ===== TRIE =====
  { platform: 'leetcode', problemId: '208', title: 'Trie', difficulty: 'medium', url: 'https://leetcode.com/problems/implement-trie-prefix-tree', companies: ['Amazon', 'Google'], patternNames: ['Trie'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '211', title: 'Word Dictionary', difficulty: 'medium', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure', companies: ['Facebook'], patternNames: ['Trie'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '212', title: 'Word Search II', difficulty: 'hard', url: 'https://leetcode.com/problems/word-search-ii', companies: ['Amazon', 'Google'], patternNames: ['Trie'], tags: DEFAULT_TAGS },

  // ===== GRAPHS =====
  { platform: 'leetcode', problemId: '200', title: 'Number of Islands', difficulty: 'medium', url: 'https://leetcode.com/problems/number-of-islands', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], patternNames: ['Grid traversal'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '695', title: 'Max Area of Island', difficulty: 'medium', url: 'https://leetcode.com/problems/max-area-of-island', companies: ['Amazon'], patternNames: ['Grid traversal'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '133', title: 'Clone Graph', difficulty: 'medium', url: 'https://leetcode.com/problems/clone-graph', companies: ['Amazon', 'Facebook'], patternNames: ['Graph DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '286', title: 'Walls And Gates', difficulty: 'medium', url: 'https://leetcode.com/problems/walls-and-gates', companies: ['Google'], patternNames: ['Multi-source BFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '994', title: 'Rotting Oranges', difficulty: 'medium', url: 'https://leetcode.com/problems/rotting-oranges', companies: ['Amazon', 'Facebook'], patternNames: ['Multi-source BFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '417', title: 'Pacific Atlantic', difficulty: 'medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow', companies: ['Google'], patternNames: ['Grid traversal'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '130', title: 'Surrounded Regions', difficulty: 'medium', url: 'https://leetcode.com/problems/surrounded-regions', companies: ['Amazon', 'Facebook'], patternNames: ['Grid traversal'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '207', title: 'Course Schedule', difficulty: 'medium', url: 'https://leetcode.com/problems/course-schedule', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Topological sort', 'Cycle detection in graphs'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '210', title: 'Course Schedule II', difficulty: 'medium', url: 'https://leetcode.com/problems/course-schedule-ii', companies: ['Amazon', 'Facebook'], patternNames: ['Topological sort', 'Cycle detection in graphs'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '261', title: 'Graph Valid Tree', difficulty: 'medium', url: 'https://leetcode.com/problems/graph-valid-tree', companies: ['Amazon', 'Google'], patternNames: ['Union-Find', 'Graph DFS'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '323', title: 'Connected Components', difficulty: 'medium', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph', companies: ['Amazon'], patternNames: ['Union-Find'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '684', title: 'Redundant Connection', difficulty: 'medium', url: 'https://leetcode.com/problems/redundant-connection', companies: ['Amazon', 'Google'], patternNames: ['Union-Find'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '127', title: 'Word Ladder', difficulty: 'hard', url: 'https://leetcode.com/problems/word-ladder', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Implicit state space BFS/DFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '743', title: 'Network Delay', difficulty: 'medium', url: 'https://leetcode.com/problems/network-delay-time', companies: ['Amazon', 'Google'], patternNames: ['Shortest path'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '332', title: 'Reconstruct Itinerary', difficulty: 'hard', url: 'https://leetcode.com/problems/reconstruct-itinerary', companies: ['Amazon', 'Google'], patternNames: ['Graph DFS'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '1584', title: 'Min Cost Connect Points', difficulty: 'medium', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points', companies: ['Google'], patternNames: ['Minimum spanning tree (MST)', 'Union-Find'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '778', title: 'Swim In Rising Water', difficulty: 'hard', url: 'https://leetcode.com/problems/swim-in-rising-water', companies: ['Google'], patternNames: ['Shortest path', 'Grid traversal'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '269', title: 'Alien Dictionary', difficulty: 'hard', url: 'https://leetcode.com/problems/alien-dictionary', companies: ['Google'], patternNames: ['Topological sort'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '787', title: 'Cheapest Flights', difficulty: 'medium', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops', companies: ['Amazon', 'Google'], patternNames: ['Shortest path'], tags: ['Neetcode150'] },

  // ===== DP =====
  { platform: 'leetcode', problemId: '70', title: 'Climbing Stairs', difficulty: 'easy', url: 'https://leetcode.com/problems/climbing-stairs', companies: ['Amazon', 'Facebook'], patternNames: ['1D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '746', title: 'Min Cost Climbing Stairs', difficulty: 'easy', url: 'https://leetcode.com/problems/min-cost-climbing-stairs', companies: ['Amazon'], patternNames: ['1D DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '198', title: 'House Robber', difficulty: 'medium', url: 'https://leetcode.com/problems/house-robber', companies: ['Amazon', 'Facebook'], patternNames: ['1D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '213', title: 'House Robber II', difficulty: 'medium', url: 'https://leetcode.com/problems/house-robber-ii', companies: ['Amazon'], patternNames: ['1D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '5', title: 'Longest Palindromic Substring', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-palindromic-substring', companies: ['Amazon', 'Facebook'], patternNames: ['String DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '647', title: 'Palindromic Substrings', difficulty: 'medium', url: 'https://leetcode.com/problems/palindromic-substrings', companies: ['Amazon'], patternNames: ['String DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '91', title: 'Decode Ways', difficulty: 'medium', url: 'https://leetcode.com/problems/decode-ways', companies: ['Amazon', 'Facebook'], patternNames: ['1D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '322', title: 'Coin Change', difficulty: 'medium', url: 'https://leetcode.com/problems/coin-change', companies: ['Amazon', 'Google', 'Microsoft'], patternNames: ['Knapsack DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '152', title: 'Max Product Subarray', difficulty: 'medium', url: 'https://leetcode.com/problems/maximum-product-subarray', companies: ['Amazon'], patternNames: ['1D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '139', title: 'Word Break', difficulty: 'medium', url: 'https://leetcode.com/problems/word-break', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['String DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '300', title: 'LIS', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Sequence DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '416', title: 'Partition Equal Subset', difficulty: 'medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum', companies: ['Amazon', 'Microsoft'], patternNames: ['Knapsack DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '62', title: 'Unique Paths', difficulty: 'medium', url: 'https://leetcode.com/problems/unique-paths', companies: ['Amazon', 'Microsoft'], patternNames: ['2D DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '1143', title: 'LCS', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-common-subsequence', companies: ['Amazon', 'Google'], patternNames: ['Sequence DP'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '309', title: 'Stock Cooldown', difficulty: 'medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown', companies: ['Amazon'], patternNames: ['State machine DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '518', title: 'Coin Change II', difficulty: 'medium', url: 'https://leetcode.com/problems/coin-change-ii', companies: ['Amazon', 'Google'], patternNames: ['Knapsack DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '494', title: 'Target Sum', difficulty: 'medium', url: 'https://leetcode.com/problems/target-sum', companies: ['Amazon', 'Facebook'], patternNames: ['Knapsack DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '97', title: 'Interleaving String', difficulty: 'medium', url: 'https://leetcode.com/problems/interleaving-string', companies: ['Amazon', 'Microsoft'], patternNames: ['2D DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '329', title: 'Longest Increasing Path', difficulty: 'hard', url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix', companies: ['Google', 'Amazon'], patternNames: ['Backtracking + memoization', 'Grid traversal'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '115', title: 'Distinct Subsequences', difficulty: 'hard', url: 'https://leetcode.com/problems/distinct-subsequences', companies: ['Google', 'Amazon'], patternNames: ['2D DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '72', title: 'Edit Distance', difficulty: 'hard', url: 'https://leetcode.com/problems/edit-distance', companies: ['Google', 'Microsoft', 'Amazon'], patternNames: ['String DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '312', title: 'Burst Balloons', difficulty: 'hard', url: 'https://leetcode.com/problems/burst-balloons', companies: ['Google', 'Amazon'], patternNames: ['Interval DP'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '10', title: 'Regex Matching', difficulty: 'hard', url: 'https://leetcode.com/problems/regular-expression-matching', companies: ['Google', 'Microsoft'], patternNames: ['String DP'], tags: ['Neetcode150'] },

  // ===== GREEDY =====
  { platform: 'leetcode', problemId: '53', title: 'Maximum Subarray', difficulty: 'medium', url: 'https://leetcode.com/problems/maximum-subarray', companies: ['Amazon', 'Facebook'], patternNames: ['Kadane'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '55', title: 'Jump Game', difficulty: 'medium', url: 'https://leetcode.com/problems/jump-game', companies: ['Amazon', 'Facebook', 'Google'], patternNames: ['Greedy'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '45', title: 'Jump Game II', difficulty: 'medium', url: 'https://leetcode.com/problems/jump-game-ii', companies: ['Amazon', 'Google'], patternNames: ['Greedy'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '134', title: 'Gas Station', difficulty: 'medium', url: 'https://leetcode.com/problems/gas-station', companies: ['Amazon'], patternNames: ['Greedy'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '846', title: 'Hand of Straights', difficulty: 'medium', url: 'https://leetcode.com/problems/hand-of-straights', companies: ['Amazon'], patternNames: ['Greedy'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '1899', title: 'Merge Triplets', difficulty: 'medium', url: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet', companies: ['Amazon'], patternNames: ['Greedy'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '763', title: 'Partition Labels', difficulty: 'medium', url: 'https://leetcode.com/problems/partition-labels', companies: ['Amazon', 'Facebook'], patternNames: ['Greedy'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '678', title: 'Valid Parenthesis String', difficulty: 'medium', url: 'https://leetcode.com/problems/valid-parenthesis-string', companies: ['Amazon', 'Facebook'], patternNames: ['Greedy'], tags: ['Neetcode150'] },

  // ===== INTERVALS =====
  { platform: 'leetcode', problemId: '57', title: 'Insert Interval', difficulty: 'medium', url: 'https://leetcode.com/problems/insert-interval', companies: ['Amazon'], patternNames: ['Intervals'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '56', title: 'Merge Intervals', difficulty: 'medium', url: 'https://leetcode.com/problems/merge-intervals', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Intervals'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '435', title: 'Non Overlapping Intervals', difficulty: 'medium', url: 'https://leetcode.com/problems/non-overlapping-intervals', companies: ['Amazon'], patternNames: ['Intervals'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '252', title: 'Meeting Rooms', difficulty: 'easy', url: 'https://leetcode.com/problems/meeting-rooms', companies: ['Amazon'], patternNames: ['Intervals'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '253', title: 'Meeting Rooms II', difficulty: 'medium', url: 'https://leetcode.com/problems/meeting-rooms-ii', companies: ['Amazon', 'Google', 'Facebook'], patternNames: ['Intervals', 'Heap'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '1851', title: 'Min Interval Query', difficulty: 'hard', url: 'https://leetcode.com/problems/minimum-interval-to-include-each-query', companies: ['Google'], patternNames: ['Sorting', 'Heap', 'Sweep line'], tags: ['Neetcode150'] },

  // ===== MATRIX / MATH / BIT =====
  { platform: 'leetcode', problemId: '48', title: 'Rotate Image', difficulty: 'medium', url: 'https://leetcode.com/problems/rotate-image', companies: ['Amazon', 'Facebook'], patternNames: ['Matrix'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '54', title: 'Spiral Matrix', difficulty: 'medium', url: 'https://leetcode.com/problems/spiral-matrix', companies: ['Amazon'], patternNames: ['Matrix'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '73', title: 'Set Matrix Zeroes', difficulty: 'medium', url: 'https://leetcode.com/problems/set-matrix-zeroes', companies: ['Amazon'], patternNames: ['Matrix'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '202', title: 'Happy Number', difficulty: 'easy', url: 'https://leetcode.com/problems/happy-number', companies: ['Amazon'], patternNames: ['Math'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '66', title: 'Plus One', difficulty: 'easy', url: 'https://leetcode.com/problems/plus-one', companies: ['Amazon'], patternNames: ['Math'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '50', title: 'Pow(x, n)', difficulty: 'medium', url: 'https://leetcode.com/problems/powx-n', companies: ['Google', 'Amazon'], patternNames: ['Math'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '43', title: 'Multiply Strings', difficulty: 'medium', url: 'https://leetcode.com/problems/multiply-strings', companies: ['Amazon'], patternNames: ['Math'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '2013', title: 'Detect Squares', difficulty: 'medium', url: 'https://leetcode.com/problems/detect-squares', companies: ['Amazon'], patternNames: ['Hashing', 'Math'], tags: ['Neetcode150'] },

  { platform: 'leetcode', problemId: '136', title: 'Single Number', difficulty: 'easy', url: 'https://leetcode.com/problems/single-number', companies: ['Amazon', 'Google', 'Microsoft'], patternNames: ['Bit manipulation'], tags: ['Neetcode150'] },
  { platform: 'leetcode', problemId: '191', title: 'Number of 1 Bits', difficulty: 'easy', url: 'https://leetcode.com/problems/number-of-1-bits', companies: ['Amazon'], patternNames: ['Bit manipulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '338', title: 'Counting Bits', difficulty: 'easy', url: 'https://leetcode.com/problems/counting-bits', companies: ['Amazon'], patternNames: ['Bit manipulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '190', title: 'Reverse Bits', difficulty: 'easy', url: 'https://leetcode.com/problems/reverse-bits', companies: ['Amazon'], patternNames: ['Bit manipulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '268', title: 'Missing Number', difficulty: 'easy', url: 'https://leetcode.com/problems/missing-number', companies: ['Amazon', 'Google'], patternNames: ['Bit manipulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '371', title: 'Sum of Two Integers', difficulty: 'medium', url: 'https://leetcode.com/problems/sum-of-two-integers', companies: ['Amazon', 'Google'], patternNames: ['Bit manipulation'], tags: DEFAULT_TAGS },
  { platform: 'leetcode', problemId: '7', title: 'Reverse Integer', difficulty: 'medium', url: 'https://leetcode.com/problems/reverse-integer', companies: ['Amazon'], patternNames: ['Math'], tags: ['Neetcode150'] },
];


export const GOAL_MILESTONE_SEED: GoalSeed[] = [
  {
    title: 'Tier 1-2 problem volume',
    description: 'Complete 150 problems aligned to Tier 1-2 from README study plan.',
    type: 'problemCount',
    targetValue: 150,
    unit: 'problems',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'high',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      {
        title: '37 problems',
        description: 'Days 1-7: arrays, strings, basic DS',
        targetValue: 37,
        dueDate: '2026-04-18',
      },
      {
        title: '74 problems',
        description: 'Days 8-14: trees, graphs',
        targetValue: 74,
        dueDate: '2026-04-25',
      },
      {
        title: '90 problems',
        description: 'Days 15-21: DP focus',
        targetValue: 111,
        dueDate: '2026-05-02',
      },
      {
        title: '150 problems',
        description: 'Days 22-30: integration + mocks',
        targetValue: 150,
        dueDate: '2026-05-11',
      },
    ],
  },
  {
    title: '30-day daily practice streak',
    description: 'Solve at least 1 problem per day for 30 days.',
    type: 'streakDays',
    targetValue: 30,
    unit: 'days',
    startDate: '2026-04-11',
    deadline: '2026-05-10',
    priority: 'medium',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      {
        title: 'Week 1 streak',
        description: '7 consecutive days',
        targetValue: 7,
        dueDate: '2026-04-18',
      },
      {
        title: 'Week 2 streak',
        description: '14 consecutive days',
        targetValue: 14,
        dueDate: '2026-04-25',
      },
      {
        title: 'Week 3 streak',
        description: '21 consecutive days',
        targetValue: 21,
        dueDate: '2026-05-02',
      },
      {
        title: '30-day streak',
        description: '30 consecutive days',
        targetValue: 30,
        dueDate: '2026-05-10',
      },
    ],
  },
  {
    title: 'Core pattern mastery',
    description: 'Master core patterns from README and ALGOMETRICS_PATTERNS.',
    type: 'patternMastery',
    targetValue: 12,
    unit: 'patterns',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'high',
    targetPattern: 'Core Fundamentals',
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      {
        title: '4 patterns',
        description: 'Two pointers, sliding window, binary search, prefix sum',
        targetValue: 4,
        dueDate: '2026-04-18',
      },
      {
        title: '8 patterns',
        description: 'Add monotonic stack, heap, linked list, tree DFS/BFS',
        targetValue: 8,
        dueDate: '2026-04-25',
      },
      {
        title: '12 patterns',
        description: 'Add graph BFS/DFS, union-find, DP basics',
        targetValue: 12,
        dueDate: '2026-05-11',
      },
    ],
  },
  {
    title: 'Company-ready: Google medium set',
    description: 'Solve 40 Google-tagged medium problems.',
    type: 'companyReady',
    targetValue: 40,
    unit: 'problems',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'high',
    targetPattern: null,
    targetCompany: 'Google',
    targetDifficulty: 'Medium',
    milestones: [
      {
        title: '10 problems',
        description: 'Company focus warmup',
        targetValue: 10,
        dueDate: '2026-04-18',
      },
      {
        title: '20 problems',
        description: 'Patterns coverage in company set',
        targetValue: 20,
        dueDate: '2026-04-25',
      },
      {
        title: '30 problems',
        description: 'Midpoint coverage',
        targetValue: 30,
        dueDate: '2026-05-03',
      },
      {
        title: '40 problems',
        description: 'Target complete',
        targetValue: 40,
        dueDate: '2026-05-11',
      },
    ],
  },
  {
    title: 'Medium solve speed',
    description: 'Reduce average medium solve time to 25 minutes.',
    type: 'speedImprovement',
    targetValue: 25,
    unit: 'minutes',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'medium',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: 'Medium',
    milestones: [
      {
        title: '40-minute average',
        description: 'Baseline stabilization',
        targetValue: 40,
        dueDate: '2026-04-18',
      },
      {
        title: '35-minute average',
        description: 'Improve pattern recognition time',
        targetValue: 35,
        dueDate: '2026-04-25',
      },
      {
        title: '30-minute average',
        description: 'Consistent medium solves',
        targetValue: 30,
        dueDate: '2026-05-03',
      },
      {
        title: '25-minute average',
        description: 'Target pace',
        targetValue: 25,
        dueDate: '2026-05-11',
      },
    ],
  },
  {
    title: 'Mock interview cadence',
    description: 'Complete 6 mock interviews by the end of the plan.',
    type: 'custom',
    targetValue: 6,
    unit: 'sessions',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'medium',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      {
        title: '2 mock interviews',
        description: 'First two weeks',
        targetValue: 2,
        dueDate: '2026-04-25',
      },
      {
        title: '4 mock interviews',
        description: 'Midpoint checkpoint',
        targetValue: 4,
        dueDate: '2026-05-03',
      },
      {
        title: '6 mock interviews',
        description: 'Target complete',
        targetValue: 6,
        dueDate: '2026-05-11',
      },
    ],
  },
  {
    title: 'System design readiness',
    description: 'Reach 80% system design readiness across the FAANG question bank.',
    type: 'systemDesignReadiness',
    track: 'systemDesign',
    targetValue: 80,
    unit: 'percentage',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'high',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      { title: 'Warm up', description: 'Complete 5 medium designs with self-ratings', targetValue: 30, dueDate: '2026-04-21' },
      { title: 'Build depth', description: 'Cover core building-block topics', targetValue: 55, dueDate: '2026-05-01' },
      { title: 'Interview ready', description: 'Hit 80% readiness on latest attempts', targetValue: 80, dueDate: '2026-05-11' },
    ],
  },
  {
    title: 'Cover all 16 Amazon Leadership Principles',
    description: 'Have at least one strong STAR story practiced for every Amazon LP.',
    type: 'behavioralCoverage',
    track: 'behavioral',
    targetValue: 16,
    unit: 'competencies',
    startDate: '2026-04-11',
    deadline: '2026-05-11',
    priority: 'high',
    targetPattern: null,
    targetCompany: 'Amazon',
    targetDifficulty: null,
    milestones: [
      { title: 'Half covered', description: '8 of 16 LPs with a strong story', targetValue: 8, dueDate: '2026-04-25' },
      { title: 'Full coverage', description: 'All 16 LPs covered', targetValue: 16, dueDate: '2026-05-11' },
    ],
  },
  {
    title: 'Build a STAR story bank',
    description: 'Write 10 reusable, quantified STAR stories mapped to competencies.',
    type: 'storyBankSize',
    track: 'behavioral',
    targetValue: 10,
    unit: 'stories',
    startDate: '2026-04-11',
    deadline: '2026-05-04',
    priority: 'medium',
    targetPattern: null,
    targetCompany: null,
    targetDifficulty: null,
    milestones: [
      { title: '5 stories', description: 'Core stories drafted', targetValue: 5, dueDate: '2026-04-21' },
      { title: '10 stories', description: 'Story bank complete', targetValue: 10, dueDate: '2026-05-04' },
    ],
  },
];

const KNOWN_TAGS = new Set(PROBLEM_TAGS.map((tag) => tag.name))
const KNOWN_PATTERNS = new Set(PATTERNS.map((pattern) => pattern.name))

function normalizeDifficulty(value: string) {
  return value.trim().toLowerCase()
}

function assertKnownTags(tags: string[], context: string) {
  const unknown = tags.filter((tag) => !KNOWN_TAGS.has(tag))
  if (unknown.length > 0) {
    throw new Error(`${context} has unknown tags: ${unknown.join(', ')}`)
  }
}

function assertKnownPatterns(patternNames: string[], context: string) {
  const unknown = patternNames.filter((name) => !KNOWN_PATTERNS.has(name))
  if (unknown.length > 0) {
    throw new Error(`${context} has unknown patternNames: ${unknown.join(', ')}`)
  }
}

async function seedPatterns() {
  for (const pattern of PATTERNS) {
    await prisma.pattern.upsert({
      where: {
        userId_name: {
          userId: SEED_USER_ID,
          name: pattern.name,
        },
      },
      update: {
        category: pattern.category,
        description: pattern.description ?? null,
      },
      create: {
        userId: SEED_USER_ID,
        name: pattern.name,
        category: pattern.category,
        description: pattern.description ?? null,
      },
    })
  }
}

async function seedCompanies() {
  for (const company of COMPANY_SEED) {
    await prisma.companyCard.upsert({
      where: {
        userId_name: {
          userId: SEED_USER_ID,
          name: company.name,
        },
      },
      update: {},
      create: {
        userId: SEED_USER_ID,
        name: company.name,
      },
    })
  }
}

async function seedProblems() {
  for (const problem of NEETCODE_150_PROBLEMS) {
    assertKnownTags(problem.tags, `Problem ${problem.problemId}`)
    assertKnownPatterns(problem.patternNames, `Problem ${problem.problemId}`)

    const normalizedDifficulty = normalizeDifficulty(problem.difficulty)

    const createdProblem = await prisma.problem.upsert({
      where: {
        userId_platform_problemId: {
          userId: SEED_USER_ID,
          platform: problem.platform,
          problemId: problem.problemId,
        },
      },
      update: {
        title: problem.title,
        difficulty: normalizedDifficulty,
        url: problem.url,
      },
      create: {
        userId: SEED_USER_ID,
        platform: problem.platform,
        problemId: problem.problemId,
        title: problem.title,
        difficulty: normalizedDifficulty,
        url: problem.url,
      },
    })

    // Keep relation tables deterministic across reruns.
    await prisma.problemCompany.deleteMany({ where: { problemId: createdProblem.id } })
    await prisma.problemTag.deleteMany({ where: { problemId: createdProblem.id } })
    await prisma.problemPattern.deleteMany({ where: { problemId: createdProblem.id } })

    if (problem.companies.length > 0) {
      const companyRows = await prisma.companyCard.findMany({
        where: { userId: SEED_USER_ID, name: { in: problem.companies } },
        select: { id: true, name: true },
      })

      const foundCompanies = new Set(companyRows.map((company) => company.name))
      const missingCompanies = problem.companies.filter((name) => !foundCompanies.has(name))
      if (missingCompanies.length > 0) {
        throw new Error(`Problem ${problem.problemId} missing company cards in DB: ${missingCompanies.join(', ')}`)
      }

      await prisma.problemCompany.createMany({
        data: companyRows.map((company) => ({
          userId: SEED_USER_ID,
          problemId: createdProblem.id,
          companyId: company.id,
        })),
      })
    }

    if (problem.tags.length > 0) {
      await prisma.problemTag.createMany({
        data: problem.tags.map((tag) => ({
          userId: SEED_USER_ID,
          problemId: createdProblem.id,
          tag,
        })),
      })
    }

    if (problem.patternNames.length > 0) {
      const patterns = await prisma.pattern.findMany({
        where: { userId: SEED_USER_ID, name: { in: problem.patternNames } },
        select: { id: true, name: true },
      })

      const found = new Set(patterns.map((pattern) => pattern.name))
      const missing = problem.patternNames.filter((name) => !found.has(name))
      if (missing.length > 0) {
        throw new Error(`Problem ${problem.problemId} missing patterns in DB: ${missing.join(', ')}`)
      }

      await prisma.problemPattern.createMany({
        data: patterns.map((pattern) => ({
          userId: SEED_USER_ID,
          problemId: createdProblem.id,
          patternId: pattern.id,
        })),
      })
    }
  }
}

async function seedGoals() {
  for (const goal of GOAL_MILESTONE_SEED) {
    const goalsWithSameTitle = await prisma.goal.findMany({
      where: { title: goal.title, userId: SEED_USER_ID },
      orderBy: { id: 'asc' },
      select: { id: true },
    })

    const goalData = {
      userId: SEED_USER_ID,
      title: goal.title,
      description: goal.description,
      type: goal.type,
      track: goal.track ?? 'coding',
      targetValue: goal.targetValue,
      unit: goal.unit,
      startDate: new Date(goal.startDate),
      deadline: new Date(goal.deadline),
      priority: goal.priority,
      targetPattern: goal.targetPattern,
      targetCompany: goal.targetCompany,
      targetDifficulty: goal.targetDifficulty
        ? normalizeDifficulty(goal.targetDifficulty)
        : null,
    }

    let goalId: number

    if (goalsWithSameTitle.length === 0) {
      const createdGoal = await prisma.goal.create({ data: goalData })
      goalId = createdGoal.id
    } else {
      goalId = goalsWithSameTitle[0].id
      await prisma.goal.update({
        where: { id: goalId },
        data: goalData,
      })

      const duplicateGoalIds = goalsWithSameTitle.slice(1).map((g) => g.id)
      if (duplicateGoalIds.length > 0) {
        await prisma.milestone.deleteMany({
          where: { goalId: { in: duplicateGoalIds } },
        })
        await prisma.goal.deleteMany({
          where: { id: { in: duplicateGoalIds } },
        })
      }
    }

    await prisma.milestone.deleteMany({ where: { goalId } })

    if (goal.milestones.length > 0) {
      await prisma.milestone.createMany({
        data: goal.milestones.map((milestone) => ({
          userId: SEED_USER_ID,
          goalId,
          title: milestone.title,
          description: milestone.description,
          targetValue: milestone.targetValue,
          dueDate: new Date(milestone.dueDate),
        })),
      })
    }
  }
}

// ---------------------------------------------------------------------------
// SYSTEM DESIGN SEED
// ---------------------------------------------------------------------------

async function seedSystemDesignTopics() {
  for (const topic of SD_TOPIC_SEED) {
    await prisma.systemDesignTopic.upsert({
      where: { userId_name: { userId: SEED_USER_ID, name: topic.name } },
      update: { category: topic.category, description: topic.description },
      create: { userId: SEED_USER_ID, name: topic.name, category: topic.category, description: topic.description },
    })
  }
}

async function seedSystemDesignQuestions() {
  const knownTopics = new Set(SD_TOPIC_SEED.map((t) => t.name))

  for (const question of SD_QUESTION_SEED) {
    const unknownTopics = question.topics.filter((name) => !knownTopics.has(name))
    if (unknownTopics.length > 0) {
      throw new Error(`SD question ${question.slug} has unknown topics: ${unknownTopics.join(', ')}`)
    }

    const created = await prisma.systemDesignQuestion.upsert({
      where: { userId_slug: { userId: SEED_USER_ID, slug: question.slug } },
      update: {
        title: question.title,
        difficulty: question.difficulty,
        category: question.category,
        prompt: question.prompt,
        functionalRequirements: question.functionalRequirements,
        nonFunctionalRequirements: question.nonFunctionalRequirements,
        estimationNotes: question.estimationNotes,
        referenceSolution: question.referenceSolution,
        commonPitfalls: question.commonPitfalls,
      },
      create: {
        userId: SEED_USER_ID,
        slug: question.slug,
        title: question.title,
        difficulty: question.difficulty,
        category: question.category,
        prompt: question.prompt,
        functionalRequirements: question.functionalRequirements,
        nonFunctionalRequirements: question.nonFunctionalRequirements,
        estimationNotes: question.estimationNotes,
        referenceSolution: question.referenceSolution,
        commonPitfalls: question.commonPitfalls,
      },
    })

    await prisma.sDQuestionTopic.deleteMany({ where: { questionId: created.id } })
    await prisma.sDQuestionCompany.deleteMany({ where: { questionId: created.id } })

    const topicRows = await prisma.systemDesignTopic.findMany({
      where: { userId: SEED_USER_ID, name: { in: question.topics } },
      select: { id: true },
    })
    await prisma.sDQuestionTopic.createMany({
      data: topicRows.map((topic) => ({ userId: SEED_USER_ID, questionId: created.id, topicId: topic.id })),
    })

    if (question.companies.length > 0) {
      const companyRows = await prisma.companyCard.findMany({
        where: { userId: SEED_USER_ID, name: { in: question.companies } },
        select: { id: true, name: true },
      })
      const found = new Set(companyRows.map((c) => c.name))
      const missing = question.companies.filter((name) => !found.has(name))
      if (missing.length > 0) {
        throw new Error(`SD question ${question.slug} missing company cards in DB: ${missing.join(', ')}`)
      }
      await prisma.sDQuestionCompany.createMany({
        data: companyRows.map((company) => ({ userId: SEED_USER_ID, questionId: created.id, companyId: company.id })),
      })
    }
  }
}

// ---------------------------------------------------------------------------
// BEHAVIORAL SEED
// ---------------------------------------------------------------------------

async function seedBehavioralCompetencies() {
  for (const competency of COMPETENCY_SEED) {
    await prisma.competency.upsert({
      where: { userId_name: { userId: SEED_USER_ID, name: competency.name } },
      update: { type: competency.type, company: competency.company, description: competency.description },
      create: {
        userId: SEED_USER_ID,
        name: competency.name,
        type: competency.type,
        company: competency.company,
        description: competency.description,
      },
    })
  }
}

async function seedBehavioralQuestions() {
  const knownCompetencies = new Set(COMPETENCY_SEED.map((c) => c.name))

  for (const question of BEHAVIORAL_QUESTION_SEED) {
    const unknown = question.competencies.filter((name) => !knownCompetencies.has(name))
    if (unknown.length > 0) {
      throw new Error(`Behavioral question ${question.slug} has unknown competencies: ${unknown.join(', ')}`)
    }

    const created = await prisma.behavioralQuestion.upsert({
      where: { userId_slug: { userId: SEED_USER_ID, slug: question.slug } },
      update: {
        prompt: question.prompt,
        category: question.category,
        difficulty: question.difficulty ?? null,
        whatTheyAssess: question.whatTheyAssess,
        exemplarAnswer: question.exemplarAnswer,
        followUps: question.followUps,
      },
      create: {
        userId: SEED_USER_ID,
        slug: question.slug,
        prompt: question.prompt,
        category: question.category,
        difficulty: question.difficulty ?? null,
        whatTheyAssess: question.whatTheyAssess,
        exemplarAnswer: question.exemplarAnswer,
        followUps: question.followUps,
      },
    })

    await prisma.behavioralQuestionCompetency.deleteMany({ where: { questionId: created.id } })
    await prisma.behavioralQuestionCompany.deleteMany({ where: { questionId: created.id } })

    const competencyRows = await prisma.competency.findMany({
      where: { userId: SEED_USER_ID, name: { in: question.competencies } },
      select: { id: true },
    })
    await prisma.behavioralQuestionCompetency.createMany({
      data: competencyRows.map((competency) => ({ userId: SEED_USER_ID, questionId: created.id, competencyId: competency.id })),
    })

    if (question.companies.length > 0) {
      const companyRows = await prisma.companyCard.findMany({
        where: { userId: SEED_USER_ID, name: { in: question.companies } },
        select: { id: true, name: true },
      })
      const found = new Set(companyRows.map((c) => c.name))
      const missing = question.companies.filter((name) => !found.has(name))
      if (missing.length > 0) {
        throw new Error(`Behavioral question ${question.slug} missing company cards in DB: ${missing.join(', ')}`)
      }
      await prisma.behavioralQuestionCompany.createMany({
        data: companyRows.map((company) => ({ userId: SEED_USER_ID, questionId: created.id, companyId: company.id })),
      })
    }
  }
}

async function main() {
  assertKnownTags(DEFAULT_TAGS, 'DEFAULT_TAGS')
  await seedCompanies()
  await seedPatterns()
  await seedProblems()
  // System design track
  await seedSystemDesignTopics()
  await seedSystemDesignQuestions()
  // Behavioral track
  await seedBehavioralCompetencies()
  await seedBehavioralQuestions()
  await seedGoals()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })