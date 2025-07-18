"""
Theory content for different data structures in the learning platform.
This module contains comprehensive educational content for each data structure.
"""

THEORY_CONTENT = {
    'array': {
        'title': 'Arrays',
        'overview': 'An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index, making arrays one of the most efficient data structures for random access operations.',
        'key_concepts': [
            {
                'name': 'Index-based Access',
                'description': 'Elements are accessed using zero-based indexing, allowing O(1) random access time complexity.'
            },
            {
                'name': 'Contiguous Memory',
                'description': 'Elements are stored in consecutive memory locations, enabling cache-friendly access patterns.'
            },
            {
                'name': 'Fixed Size',
                'description': 'In many languages, arrays have a fixed size that must be specified at creation time.'
            },
            {
                'name': 'Homogeneous Elements',
                'description': 'All elements in an array must be of the same data type.'
            }
        ],
        'operations': [
            {
                'name': 'Access',
                'description': 'Get element at specific index',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Insert',
                'description': 'Add element at specific position',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Delete',
                'description': 'Remove element at specific position',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Search',
                'description': 'Find element in unsorted array',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Update',
                'description': 'Modify element at specific index',
                'time_complexity': 'O(1)'
            }
        ],
        'use_cases': [
            {
                'title': 'Database Records',
                'description': 'Storing and accessing records where quick random access is needed.'
            },
            {
                'title': 'Mathematical Computations',
                'description': 'Matrix operations, statistical calculations, and numerical algorithms.'
            },
            {
                'title': 'Buffer Management',
                'description': 'Temporary storage for data processing and I/O operations.'
            },
            {
                'title': 'Game Development',
                'description': 'Storing game states, player statistics, and level data.'
            }
        ],
        'code_examples': [
            {
                'title': 'Array Declaration and Initialization',
                'language': 'python',
                'code': '''# Creating arrays in Python using lists
numbers = [1, 2, 3, 4, 5]
print("Array:", numbers)

# Creating array with specific size
size = 10
zeros = [0] * size
print("Zero array:", zeros)

# 2D array (matrix)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print("2D Array:", matrix)'''
            },
            {
                'title': 'Array Operations',
                'language': 'python',
                'code': '''# Array operations
arr = [10, 20, 30, 40, 50]

# Access element
print("Element at index 2:", arr[2])

# Insert element at specific position
arr.insert(2, 25)
print("After insertion:", arr)

# Remove element
arr.remove(25)
print("After removal:", arr)

# Search for element
if 30 in arr:
    index = arr.index(30)
    print(f"Found 30 at index {index}")

# Update element
arr[1] = 99
print("After update:", arr)'''
            }
        ]
    },
    
    'linked_list': {
        'title': 'Linked Lists',
        'overview': 'A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations.',
        'key_concepts': [
            {
                'name': 'Node Structure',
                'description': 'Each element is stored in a node containing data and a pointer to the next node.'
            },
            {
                'name': 'Dynamic Size',
                'description': 'The size can grow or shrink during runtime without declaring a fixed size.'
            },
            {
                'name': 'Sequential Access',
                'description': 'Elements must be accessed sequentially from the head node.'
            },
            {
                'name': 'Memory Efficiency',
                'description': 'Memory is allocated as needed, reducing waste from unused allocated space.'
            }
        ],
        'operations': [
            {
                'name': 'Insert at Head',
                'description': 'Add new node at the beginning',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Insert at Tail',
                'description': 'Add new node at the end',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Insert at Position',
                'description': 'Add new node at specific position',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Delete',
                'description': 'Remove node with specific value',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Search',
                'description': 'Find node with specific value',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Traverse',
                'description': 'Visit all nodes in sequence',
                'time_complexity': 'O(n)'
            }
        ],
        'use_cases': [
            {
                'title': 'Dynamic Memory Management',
                'description': 'When the size of data is unknown or changes frequently.'
            },
            {
                'title': 'Undo Functionality',
                'description': 'Implementing undo/redo operations in applications.'
            },
            {
                'title': 'Music Playlists',
                'description': 'Managing sequential data where insertion/deletion is frequent.'
            },
            {
                'title': 'Browser History',
                'description': 'Maintaining navigation history with dynamic additions and removals.'
            }
        ],
        'code_examples': [
            {
                'title': 'Node Class Definition',
                'language': 'python',
                'code': '''class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __str__(self):
        return str(self.data)'''
            },
            {
                'title': 'Linked List Implementation',
                'language': 'python',
                'code': '''class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def prepend(self, data):
        """Insert at the beginning"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def append(self, data):
        """Insert at the end"""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def display(self):
        """Print all elements"""
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements'''
            }
        ]
    },
    
    'stack': {
        'title': 'Stacks',
        'overview': 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack. Think of it like a stack of plates where you can only add or remove the top plate.',
        'key_concepts': [
            {
                'name': 'LIFO Principle',
                'description': 'Last element added is the first element removed (Last-In-First-Out).'
            },
            {
                'name': 'Top Pointer',
                'description': 'A pointer that keeps track of the topmost element in the stack.'
            },
            {
                'name': 'Push Operation',
                'description': 'Adding an element to the top of the stack.'
            },
            {
                'name': 'Pop Operation',
                'description': 'Removing the top element from the stack.'
            }
        ],
        'operations': [
            {
                'name': 'Push',
                'description': 'Add element to top of stack',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Pop',
                'description': 'Remove and return top element',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Peek/Top',
                'description': 'Return top element without removing',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'IsEmpty',
                'description': 'Check if stack is empty',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Size',
                'description': 'Get number of elements in stack',
                'time_complexity': 'O(1)'
            }
        ],
        'use_cases': [
            {
                'title': 'Function Call Management',
                'description': 'Managing function calls and local variables in programming languages.'
            },
            {
                'title': 'Expression Evaluation',
                'description': 'Evaluating mathematical expressions and checking parentheses balance.'
            },
            {
                'title': 'Undo Operations',
                'description': 'Implementing undo functionality in text editors and applications.'
            },
            {
                'title': 'Browser Back Button',
                'description': 'Managing page history for navigation.'
            }
        ],
        'code_examples': [
            {
                'title': 'Stack Implementation using List',
                'language': 'python',
                'code': '''class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to top of stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top item"""
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self.items.pop()
    
    def peek(self):
        """Return top item without removing"""
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items in stack"""
        return len(self.items)'''
            },
            {
                'title': 'Balanced Parentheses Checker',
                'language': 'python',
                'code': '''def is_balanced_parentheses(expression):
    """Check if parentheses are balanced"""
    stack = Stack()
    opening = "([{"
    closing = ")]}"
    pairs = {"(": ")", "[": "]", "{": "}"}
    
    for char in expression:
        if char in opening:
            stack.push(char)
        elif char in closing:
            if stack.is_empty():
                return False
            if pairs[stack.pop()] != char:
                return False
    
    return stack.is_empty()

# Test the function
test_cases = ["()", "()[]{}", "([{}])", "(()", ")("]
for test in test_cases:
    result = is_balanced_parentheses(test)
    print(f"{test}: {result}")'''
            }
        ]
    },
    
    'queue': {
        'title': 'Queues',
        'overview': 'A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at one end (rear) and removed from the other end (front). Think of it like a line of people waiting - the first person in line is the first to be served.',
        'key_concepts': [
            {
                'name': 'FIFO Principle',
                'description': 'First element added is the first element removed (First-In-First-Out).'
            },
            {
                'name': 'Front Pointer',
                'description': 'Points to the first element that will be removed next.'
            },
            {
                'name': 'Rear Pointer',
                'description': 'Points to the last element that was added to the queue.'
            },
            {
                'name': 'Enqueue Operation',
                'description': 'Adding an element to the rear of the queue.'
            }
        ],
        'operations': [
            {
                'name': 'Enqueue',
                'description': 'Add element to rear of queue',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Dequeue',
                'description': 'Remove and return front element',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Front',
                'description': 'Return front element without removing',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Rear',
                'description': 'Return rear element without removing',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'IsEmpty',
                'description': 'Check if queue is empty',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Size',
                'description': 'Get number of elements in queue',
                'time_complexity': 'O(1)'
            }
        ],
        'use_cases': [
            {
                'title': 'Process Scheduling',
                'description': 'Operating systems use queues to manage process execution order.'
            },
            {
                'title': 'Breadth-First Search',
                'description': 'Graph traversal algorithm that explores nodes level by level.'
            },
            {
                'title': 'Print Job Management',
                'description': 'Managing print jobs in the order they were submitted.'
            },
            {
                'title': 'Customer Service Systems',
                'description': 'Managing customer requests in a first-come, first-served basis.'
            }
        ],
        'code_examples': [
            {
                'title': 'Queue Implementation using Collections.deque',
                'language': 'python',
                'code': '''from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        """Add item to rear of queue"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return front item"""
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self.items.popleft()
    
    def front(self):
        """Return front item without removing"""
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self.items[0]
    
    def rear(self):
        """Return rear item without removing"""
        if self.is_empty():
            raise IndexError("rear from empty queue")
        return self.items[-1]
    
    def is_empty(self):
        """Check if queue is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items in queue"""
        return len(self.items)'''
            },
            {
                'title': 'Circular Queue Implementation',
                'language': 'python',
                'code': '''class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0
    
    def enqueue(self, item):
        """Add item to rear of queue"""
        if self.is_full():
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        """Remove and return front item"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self.queue[self.front]
        self.queue[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity'''
            }
        ]
    },
    
    'doubly_linked_list': {
        'title': 'Doubly Linked Lists',
        'overview': 'A doubly linked list is a linear data structure where each node contains data and two pointers: one pointing to the next node and another pointing to the previous node. This bidirectional linking allows traversal in both directions.',
        'key_concepts': [
            {
                'name': 'Bidirectional Traversal',
                'description': 'Can traverse forward and backward through the list using next and previous pointers.'
            },
            {
                'name': 'Two Pointers per Node',
                'description': 'Each node maintains references to both the next and previous nodes.'
            },
            {
                'name': 'Head and Tail Pointers',
                'description': 'Typically maintains pointers to both the first and last nodes for efficient operations.'
            },
            {
                'name': 'Memory Overhead',
                'description': 'Uses more memory than singly linked lists due to the extra pointer per node.'
            }
        ],
        'operations': [
            {
                'name': 'Insert at Head',
                'description': 'Add new node at the beginning',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Insert at Tail',
                'description': 'Add new node at the end',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Delete Node',
                'description': 'Remove node when given reference',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Search',
                'description': 'Find node with specific value',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Reverse',
                'description': 'Reverse the order of nodes',
                'time_complexity': 'O(n)'
            }
        ],
        'use_cases': [
            {
                'title': 'Browser History',
                'description': 'Navigate forward and backward through visited pages.'
            },
            {
                'title': 'Media Players',
                'description': 'Previous/next functionality in playlists.'
            },
            {
                'title': 'Undo/Redo Systems',
                'description': 'Efficient bidirectional navigation through operations.'
            },
            {
                'title': 'LRU Cache Implementation',
                'description': 'Quick insertion and deletion at both ends.'
            }
        ],
        'code_examples': [
            {
                'title': 'Doubly Linked List Node',
                'language': 'python',
                'code': '''class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def append(self, data):
        new_node = DoublyNode(data)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1
    
    def prepend(self, data):
        new_node = DoublyNode(data)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1'''
            }
        ]
    },
    
    'priority_queue': {
        'title': 'Priority Queues',
        'overview': 'A priority queue is an abstract data type where each element has an associated priority. Elements are served based on their priority rather than their insertion order. Higher priority elements are dequeued before lower priority elements.',
        'key_concepts': [
            {
                'name': 'Priority-based Ordering',
                'description': 'Elements are processed based on priority, not insertion order.'
            },
            {
                'name': 'Heap Implementation',
                'description': 'Often implemented using binary heaps for efficient operations.'
            },
            {
                'name': 'Dynamic Priority',
                'description': 'Can support changing priority of existing elements.'
            },
            {
                'name': 'Max and Min Heaps',
                'description': 'Can be implemented as max-heap (highest priority first) or min-heap (lowest priority first).'
            }
        ],
        'operations': [
            {
                'name': 'Insert',
                'description': 'Add element with priority',
                'time_complexity': 'O(log n)'
            },
            {
                'name': 'Extract Max/Min',
                'description': 'Remove highest/lowest priority element',
                'time_complexity': 'O(log n)'
            },
            {
                'name': 'Peek',
                'description': 'View highest/lowest priority element',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Change Priority',
                'description': 'Update element priority',
                'time_complexity': 'O(log n)'
            }
        ],
        'use_cases': [
            {
                'title': 'Task Scheduling',
                'description': 'Operating system process scheduling based on priority.'
            },
            {
                'title': 'Dijkstra\'s Algorithm',
                'description': 'Finding shortest paths in weighted graphs.'
            },
            {
                'title': 'A* Search Algorithm',
                'description': 'Pathfinding with heuristic-based priorities.'
            },
            {
                'title': 'Event Simulation',
                'description': 'Processing events in chronological order.'
            }
        ],
        'code_examples': [
            {
                'title': 'Priority Queue using heapq',
                'language': 'python',
                'code': '''import heapq

class PriorityQueue:
    def __init__(self):
        self.heap = []
        self.index = 0
    
    def push(self, priority, item):
        # Use negative priority for max heap behavior
        heapq.heappush(self.heap, (priority, self.index, item))
        self.index += 1
    
    def pop(self):
        if self.heap:
            priority, _, item = heapq.heappop(self.heap)
            return priority, item
        raise IndexError("Priority queue is empty")
    
    def peek(self):
        if self.heap:
            priority, _, item = self.heap[0]
            return priority, item
        raise IndexError("Priority queue is empty")
    
    def is_empty(self):
        return len(self.heap) == 0'''
            }
        ]
    },
    
    'hash_table': {
        'title': 'Hash Tables',
        'overview': 'A hash table (hash map) is a data structure that implements an associative array abstract data type, mapping keys to values. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found.',
        'key_concepts': [
            {
                'name': 'Hash Function',
                'description': 'Maps keys to array indices, determining where values are stored.'
            },
            {
                'name': 'Collision Handling',
                'description': 'Strategies to handle when multiple keys hash to the same index.'
            },
            {
                'name': 'Load Factor',
                'description': 'Ratio of stored elements to total capacity, affects performance.'
            },
            {
                'name': 'Dynamic Resizing',
                'description': 'Automatically resizes when load factor becomes too high.'
            }
        ],
        'operations': [
            {
                'name': 'Insert',
                'description': 'Add key-value pair',
                'time_complexity': 'O(1) average'
            },
            {
                'name': 'Search',
                'description': 'Find value by key',
                'time_complexity': 'O(1) average'
            },
            {
                'name': 'Delete',
                'description': 'Remove key-value pair',
                'time_complexity': 'O(1) average'
            },
            {
                'name': 'Update',
                'description': 'Modify value for existing key',
                'time_complexity': 'O(1) average'
            }
        ],
        'use_cases': [
            {
                'title': 'Database Indexing',
                'description': 'Fast lookups in database systems.'
            },
            {
                'title': 'Caching Systems',
                'description': 'Quick storage and retrieval of frequently accessed data.'
            },
            {
                'title': 'Symbol Tables',
                'description': 'Compiler implementation for variable and function names.'
            },
            {
                'title': 'Set Operations',
                'description': 'Implementing mathematical sets with fast membership testing.'
            }
        ],
        'code_examples': [
            {
                'title': 'Hash Table with Chaining',
                'language': 'python',
                'code': '''class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        bucket = self.table[index]
        
        # Update existing key
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.table[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(key)
    
    def delete(self, key):
        index = self._hash(key)
        bucket = self.table[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return
        
        raise KeyError(key)'''
            }
        ]
    },
    
    'dfs_bfs': {
        'title': 'DFS and BFS',
        'overview': 'Depth-First Search (DFS) and Breadth-First Search (BFS) are fundamental graph traversal algorithms. DFS explores as far as possible along each branch before backtracking, while BFS explores all neighbors at the present depth before moving to nodes at the next depth level.',
        'key_concepts': [
            {
                'name': 'Graph Traversal',
                'description': 'Systematic way to visit all vertices and edges in a graph.'
            },
            {
                'name': 'Search Strategy',
                'description': 'DFS uses stack (recursive), BFS uses queue for exploration order.'
            },
            {
                'name': 'Visited Tracking',
                'description': 'Maintains record of visited nodes to avoid cycles.'
            },
            {
                'name': 'Path Finding',
                'description': 'Can be used to find paths between nodes in graphs.'
            }
        ],
        'operations': [
            {
                'name': 'DFS Traversal',
                'description': 'Visit all reachable nodes depth-first',
                'time_complexity': 'O(V + E)'
            },
            {
                'name': 'BFS Traversal',
                'description': 'Visit all reachable nodes breadth-first',
                'time_complexity': 'O(V + E)'
            },
            {
                'name': 'Path Finding',
                'description': 'Find path between two nodes',
                'time_complexity': 'O(V + E)'
            },
            {
                'name': 'Cycle Detection',
                'description': 'Detect cycles in graphs',
                'time_complexity': 'O(V + E)'
            }
        ],
        'use_cases': [
            {
                'title': 'Social Networks',
                'description': 'Finding connections and communities in social graphs.'
            },
            {
                'title': 'Web Crawling',
                'description': 'Systematic exploration of web pages and links.'
            },
            {
                'title': 'Maze Solving',
                'description': 'Finding paths through mazes and puzzles.'
            },
            {
                'title': 'Topological Sorting',
                'description': 'Ordering tasks with dependencies.'
            }
        ],
        'code_examples': [
            {
                'title': 'DFS and BFS Implementation',
                'language': 'python',
                'code': '''from collections import deque

def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node, end=' ')
            
            # Add neighbors to stack
            for neighbor in graph[node]:
                if neighbor not in visited:
                    stack.append(neighbor)

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        print(node, end=' ')
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)'''
            }
        ]
    },
    
    'huffman_coding': {
        'title': 'Huffman Coding',
        'overview': 'Huffman coding is a lossless data compression algorithm that assigns variable-length codes to characters based on their frequency. More frequent characters get shorter codes, while less frequent characters get longer codes, optimizing overall compression.',
        'key_concepts': [
            {
                'name': 'Variable-Length Encoding',
                'description': 'Different characters use different number of bits based on frequency.'
            },
            {
                'name': 'Binary Tree Structure',
                'description': 'Uses a binary tree where leaves represent characters.'
            },
            {
                'name': 'Frequency Analysis',
                'description': 'Analyzes character frequencies to build optimal tree.'
            },
            {
                'name': 'Prefix Property',
                'description': 'No code is a prefix of another, ensuring unique decoding.'
            }
        ],
        'operations': [
            {
                'name': 'Build Tree',
                'description': 'Construct Huffman tree from frequencies',
                'time_complexity': 'O(n log n)'
            },
            {
                'name': 'Generate Codes',
                'description': 'Extract codes from tree',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Encode',
                'description': 'Convert text to binary using codes',
                'time_complexity': 'O(m)'
            },
            {
                'name': 'Decode',
                'description': 'Convert binary back to text',
                'time_complexity': 'O(m)'
            }
        ],
        'use_cases': [
            {
                'title': 'File Compression',
                'description': 'ZIP, GZIP, and other compression algorithms.'
            },
            {
                'title': 'Image Compression',
                'description': 'JPEG compression uses Huffman coding for entropy encoding.'
            },
            {
                'title': 'Network Communication',
                'description': 'Reducing bandwidth usage in data transmission.'
            },
            {
                'title': 'Database Storage',
                'description': 'Compressing stored data to save space.'
            }
        ],
        'code_examples': [
            {
                'title': 'Huffman Coding Implementation',
                'language': 'python',
                'code': '''import heapq
from collections import defaultdict, Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    # Count character frequencies
    freq = Counter(text)
    
    # Create priority queue with leaf nodes
    heap = [HuffmanNode(char, freq) for char, freq in freq.items()]
    heapq.heapify(heap)
    
    # Build tree bottom-up
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = HuffmanNode(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        
        heapq.heappush(heap, merged)
    
    return heap[0] if heap else None

def generate_codes(root):
    if not root:
        return {}
    
    codes = {}
    
    def dfs(node, code):
        if node.char:  # Leaf node
            codes[node.char] = code or '0'
        else:
            if node.left:
                dfs(node.left, code + '0')
            if node.right:
                dfs(node.right, code + '1')
    
    dfs(root, '')
    return codes'''
            }
        ]
    },
    
    'a_star': {
        'title': 'A* Algorithm',
        'overview': 'A* (A-star) is a graph traversal and path search algorithm that finds the optimal path from a start node to a goal node. It uses a heuristic function to guide the search, making it more efficient than uninformed search algorithms like Dijkstra.',
        'key_concepts': [
            {
                'name': 'Heuristic Function',
                'description': 'Estimates the cost from current node to goal, guides search direction.'
            },
            {
                'name': 'F-Score',
                'description': 'f(n) = g(n) + h(n), where g is actual cost and h is heuristic estimate.'
            },
            {
                'name': 'Open and Closed Lists',
                'description': 'Tracks nodes to be evaluated and already evaluated nodes.'
            },
            {
                'name': 'Admissible Heuristic',
                'description': 'Heuristic that never overestimates the actual cost to goal.'
            }
        ],
        'operations': [
            {
                'name': 'Initialize',
                'description': 'Set up open list with start node',
                'time_complexity': 'O(1)'
            },
            {
                'name': 'Select Node',
                'description': 'Choose node with lowest f-score',
                'time_complexity': 'O(log n)'
            },
            {
                'name': 'Expand Node',
                'description': 'Generate and evaluate neighbors',
                'time_complexity': 'O(b)'
            },
            {
                'name': 'Path Reconstruction',
                'description': 'Trace back optimal path',
                'time_complexity': 'O(n)'
            }
        ],
        'use_cases': [
            {
                'title': 'Video Game Pathfinding',
                'description': 'AI characters finding optimal paths in game worlds.'
            },
            {
                'title': 'GPS Navigation',
                'description': 'Finding shortest routes considering traffic and distance.'
            },
            {
                'title': 'Robotics',
                'description': 'Robot navigation and motion planning.'
            },
            {
                'title': 'Puzzle Solving',
                'description': 'Solving sliding puzzles and similar problems.'
            }
        ],
        'code_examples': [
            {
                'title': 'A* Algorithm Implementation',
                'language': 'python',
                'code': '''import heapq
from collections import defaultdict

def a_star(graph, start, goal, heuristic):
    # Priority queue: (f_score, node)
    open_set = [(0, start)]
    came_from = {}
    
    # Cost from start to node
    g_score = defaultdict(lambda: float('inf'))
    g_score[start] = 0
    
    # f_score = g_score + heuristic
    f_score = defaultdict(lambda: float('inf'))
    f_score[start] = heuristic(start, goal)
    
    while open_set:
        current_f, current = heapq.heappop(open_set)
        
        if current == goal:
            # Reconstruct path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
        
        for neighbor, weight in graph[current]:
            tentative_g = g_score[current] + weight
            
            if tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + heuristic(neighbor, goal)
                
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
    
    return None  # No path found

def manhattan_distance(node1, node2):
    """Example heuristic for grid-based pathfinding"""
    x1, y1 = node1
    x2, y2 = node2
    return abs(x1 - x2) + abs(y1 - y2)'''
            }
        ]
    },
    
    'binary_tree': {
        'title': 'Binary Trees',
        'overview': 'A binary tree is a hierarchical data structure where each node has at most two children, referred to as left and right child. It is a fundamental structure used in many algorithms and applications, providing efficient searching, insertion, and deletion operations.',
        'key_concepts': [
            {
                'name': 'Node Structure',
                'description': 'Each node contains data and references to left and right child nodes.'
            },
            {
                'name': 'Root Node',
                'description': 'The topmost node in the tree with no parent.'
            },
            {
                'name': 'Leaf Nodes',
                'description': 'Nodes with no children (both left and right are null).'
            },
            {
                'name': 'Height and Depth',
                'description': 'Height is the longest path from root to leaf; depth is distance from root to a node.'
            }
        ],
        'operations': [
            {
                'name': 'Insert',
                'description': 'Add new node to the tree',
                'time_complexity': 'O(log n) avg, O(n) worst'
            },
            {
                'name': 'Search',
                'description': 'Find node with specific value',
                'time_complexity': 'O(log n) avg, O(n) worst'
            },
            {
                'name': 'Delete',
                'description': 'Remove node from the tree',
                'time_complexity': 'O(log n) avg, O(n) worst'
            },
            {
                'name': 'Inorder Traversal',
                'description': 'Visit nodes in left-root-right order',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Preorder Traversal',
                'description': 'Visit nodes in root-left-right order',
                'time_complexity': 'O(n)'
            },
            {
                'name': 'Postorder Traversal',
                'description': 'Visit nodes in left-right-root order',
                'time_complexity': 'O(n)'
            }
        ],
        'use_cases': [
            {
                'title': 'Database Indexing',
                'description': 'B-trees and variants are used for efficient database indexing.'
            },
            {
                'title': 'File Systems',
                'description': 'Directory structures in operating systems.'
            },
            {
                'title': 'Expression Trees',
                'description': 'Representing mathematical expressions for evaluation.'
            },
            {
                'title': 'Decision Trees',
                'description': 'Machine learning algorithms for classification and regression.'
            }
        ],
        'code_examples': [
            {
                'title': 'Binary Tree Node Definition',
                'language': 'python',
                'code': '''class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
    
    def __str__(self):
        return str(self.data)'''
            },
            {
                'title': 'Binary Search Tree Implementation',
                'language': 'python',
                'code': '''class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        """Insert data into the BST"""
        if self.root is None:
            self.root = TreeNode(data)
        else:
            self._insert_recursive(self.root, data)
    
    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = TreeNode(data)
            else:
                self._insert_recursive(node.left, data)
        elif data > node.data:
            if node.right is None:
                node.right = TreeNode(data)
            else:
                self._insert_recursive(node.right, data)
    
    def search(self, data):
        """Search for data in the BST"""
        return self._search_recursive(self.root, data)
    
    def _search_recursive(self, node, data):
        if node is None or node.data == data:
            return node
        
        if data < node.data:
            return self._search_recursive(node.left, data)
        else:
            return self._search_recursive(node.right, data)
    
    def inorder_traversal(self):
        """Return inorder traversal of the tree"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.data)
            self._inorder_recursive(node.right, result)'''
            }
        ]
    }
}
