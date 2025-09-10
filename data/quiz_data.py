"""
Quiz data for different data structures in the learning platform.
Contains questions, answers, and explanations for each data structure topic.
"""

QUIZ_DATA = {
    'array': {
        'title': 'Arrays Quiz',
        'description': 'Test your knowledge of arrays, their operations, and use cases.',
        'questions': [
            {
                'id': 'arr_q1',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of accessing an element in an array by its index?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n²)'}
                ],
                'correct_answer': 'A',
                'explanation': 'Array elements are stored in contiguous memory locations, allowing direct access using the index in constant time O(1).'
            },
            {
                'id': 'arr_q2',
                'type': 'multiple_choice',
                'question': 'Which operation has the worst-case time complexity of O(n) in an array?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Accessing an element'},
                    {'key': 'B', 'text': 'Updating an element'},
                    {'key': 'C', 'text': 'Inserting at the beginning'},
                    {'key': 'D', 'text': 'Finding the maximum element'}
                ],
                'correct_answer': 'C',
                'explanation': 'Inserting at the beginning requires shifting all existing elements one position to the right, resulting in O(n) time complexity.'
            },
            {
                'id': 'arr_q3',
                'type': 'true_false',
                'question': 'Arrays in most programming languages have a fixed size that cannot be changed after creation.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'In languages like C, C++, and Java, traditional arrays have a fixed size. However, some languages like Python provide dynamic arrays (lists) that can resize.'
            },
            {
                'id': 'arr_q4',
                'type': 'multiple_choice',
                'question': 'What is the space complexity of an array storing n elements?',
                'points': 4,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n²)'}
                ],
                'correct_answer': 'C',
                'explanation': 'An array storing n elements requires space proportional to n, hence O(n) space complexity.'
            },
            {
                'id': 'arr_q5',
                'type': 'code',
                'question': 'Write a Python function to find the second largest element in an array. Assume the array has at least 2 elements.',
                'points': 15,
                'correct_answer': '''def find_second_largest(arr):
    first = second = float('-inf')
    for num in arr:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
    return second''',
                'explanation': 'This solution iterates through the array once, keeping track of the largest and second largest elements. Time complexity is O(n).'
            }
        ]
    },
    
    'linked_list': {
        'title': 'Linked Lists Quiz',
        'description': 'Evaluate your understanding of linked lists, their structure, and operations.',
        'questions': [
            {
                'id': 'll_q1',
                'type': 'multiple_choice',
                'question': 'What is the main advantage of linked lists over arrays?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Faster random access'},
                    {'key': 'B', 'text': 'Dynamic size allocation'},
                    {'key': 'C', 'text': 'Better cache performance'},
                    {'key': 'D', 'text': 'Lower memory usage'}
                ],
                'correct_answer': 'B',
                'explanation': 'Linked lists can grow or shrink during runtime without declaring a fixed size, unlike arrays which typically have a fixed size.'
            },
            {
                'id': 'll_q2',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of inserting a node at the beginning of a linked list?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n²)'}
                ],
                'correct_answer': 'A',
                'explanation': 'Inserting at the beginning only requires creating a new node and updating the head pointer, which takes constant time O(1).'
            },
            {
                'id': 'll_q3',
                'type': 'true_false',
                'question': 'In a singly linked list, you can traverse backwards from any node.',
                'points': 3,
                'correct_answer': 'false',
                'explanation': 'In a singly linked list, each node only has a pointer to the next node, not the previous one. You cannot traverse backwards without additional pointers.'
            },
            {
                'id': 'll_q4',
                'type': 'multiple_choice',
                'question': 'What happens when you try to access the 5th element in a linked list?',
                'points': 4,
                'options': [
                    {'key': 'A', 'text': 'Direct access in O(1) time'},
                    {'key': 'B', 'text': 'Must traverse from head node'},
                    {'key': 'C', 'text': 'Use index calculation'},
                    {'key': 'D', 'text': 'Binary search is performed'}
                ],
                'correct_answer': 'B',
                'explanation': 'Linked lists do not support random access. To reach the 5th element, you must start from the head and traverse through the first 4 nodes.'
            },
            {
                'id': 'll_q5',
                'type': 'code',
                'question': 'Write a Python function to reverse a singly linked list. Return the new head node.',
                'points': 15,
                'correct_answer': '''def reverse_linked_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev''',
                'explanation': 'This solution iteratively reverses the links by maintaining three pointers: previous, current, and next. Time complexity is O(n) and space complexity is O(1).'
            }
        ]
    },
    
    'stack': {
        'title': 'Stacks Quiz',
        'description': 'Test your knowledge of stacks, LIFO principle, and their applications.',
        'questions': [
            {
                'id': 'stack_q1',
                'type': 'multiple_choice',
                'question': 'Which principle does a stack follow?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'FIFO (First In First Out)'},
                    {'key': 'B', 'text': 'LIFO (Last In First Out)'},
                    {'key': 'C', 'text': 'LILO (Last In Last Out)'},
                    {'key': 'D', 'text': 'Random Access'}
                ],
                'correct_answer': 'B',
                'explanation': 'A stack follows the LIFO (Last In First Out) principle, where the last element added is the first element removed.'
            },
            {
                'id': 'stack_q2',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of push and pop operations in a stack?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1) for both'},
                    {'key': 'B', 'text': 'O(n) for both'},
                    {'key': 'C', 'text': 'O(1) for push, O(n) for pop'},
                    {'key': 'D', 'text': 'O(n) for push, O(1) for pop'}
                ],
                'correct_answer': 'A',
                'explanation': 'Both push and pop operations only involve adding or removing from the top of the stack, which takes constant time O(1).'
            },
            {
                'id': 'stack_q3',
                'type': 'true_false',
                'question': 'Stacks are commonly used to implement function call management in programming languages.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, stacks are used for function call management. When a function is called, its local variables and return address are pushed onto the call stack.'
            },
            {
                'id': 'stack_q4',
                'type': 'multiple_choice',
                'question': 'Which of the following applications commonly uses a stack data structure?',
                'points': 4,
                'options': [
                    {'key': 'A', 'text': 'Breadth-first search'},
                    {'key': 'B', 'text': 'Checking balanced parentheses'},
                    {'key': 'C', 'text': 'Process scheduling'},
                    {'key': 'D', 'text': 'Database indexing'}
                ],
                'correct_answer': 'B',
                'explanation': 'Checking balanced parentheses uses a stack to keep track of opening brackets and match them with closing brackets in LIFO order.'
            },
            {
                'id': 'stack_q5',
                'type': 'code',
                'question': 'Write a Python function that uses a stack to evaluate a postfix expression. For example, "3 4 + 2 *" should return 14.',
                'points': 15,
                'correct_answer': '''def evaluate_postfix(expression):
    stack = []
    tokens = expression.split()
    
    for token in tokens:
        if token in ['+', '-', '*', '/']:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                result = a + b
            elif token == '-':
                result = a - b
            elif token == '*':
                result = a * b
            elif token == '/':
                result = a / b
            stack.append(result)
        else:
            stack.append(float(token))
    
    return stack[0]''',
                'explanation': 'This function evaluates postfix expressions using a stack. Numbers are pushed onto the stack, and when an operator is encountered, two operands are popped, the operation is performed, and the result is pushed back.'
            }
        ]
    },
    
    'queue': {
        'title': 'Queues Quiz',
        'description': 'Assess your understanding of queues, FIFO principle, and their implementations.',
        'questions': [
            {
                'id': 'queue_q1',
                'type': 'multiple_choice',
                'question': 'Which principle does a queue follow?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'LIFO (Last In First Out)'},
                    {'key': 'B', 'text': 'FIFO (First In First Out)'},
                    {'key': 'C', 'text': 'Random Access'},
                    {'key': 'D', 'text': 'LILO (Last In Last Out)'}
                ],
                'correct_answer': 'B',
                'explanation': 'A queue follows the FIFO (First In First Out) principle, where the first element added is the first element removed.'
            },
            {
                'id': 'queue_q2',
                'type': 'multiple_choice',
                'question': 'In a circular queue, what happens when the rear pointer reaches the end of the array?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'The queue becomes full'},
                    {'key': 'B', 'text': 'An overflow error occurs'},
                    {'key': 'C', 'text': 'It wraps around to the beginning'},
                    {'key': 'D', 'text': 'The queue is automatically resized'}
                ],
                'correct_answer': 'C',
                'explanation': 'In a circular queue, the rear pointer wraps around to the beginning of the array when it reaches the end, allowing efficient use of space.'
            },
            {
                'id': 'queue_q3',
                'type': 'true_false',
                'question': 'Queues are commonly used in breadth-first search algorithms.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, breadth-first search uses a queue to explore nodes level by level, processing nodes in the order they were discovered.'
            },
            {
                'id': 'queue_q4',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of enqueue and dequeue operations in a standard queue?',
                'points': 4,
                'options': [
                    {'key': 'A', 'text': 'O(1) for both'},
                    {'key': 'B', 'text': 'O(n) for both'},
                    {'key': 'C', 'text': 'O(1) for enqueue, O(n) for dequeue'},
                    {'key': 'D', 'text': 'O(n) for enqueue, O(1) for dequeue'}
                ],
                'correct_answer': 'A',
                'explanation': 'Both enqueue (adding to rear) and dequeue (removing from front) operations can be performed in constant time O(1) with proper implementation.'
            },
            {
                'id': 'queue_q5',
                'type': 'code',
                'question': 'Implement a queue using two stacks. Write the enqueue and dequeue methods.',
                'points': 15,
                'correct_answer': '''class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # for enqueue
        self.stack2 = []  # for dequeue
    
    def enqueue(self, item):
        self.stack1.append(item)
    
    def dequeue(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        
        if not self.stack2:
            raise IndexError("Queue is empty")
        
        return self.stack2.pop()''',
                'explanation': 'This implementation uses two stacks: stack1 for enqueue operations and stack2 for dequeue operations. When dequeue is called and stack2 is empty, all elements from stack1 are moved to stack2, reversing their order to maintain FIFO behavior.'
            }
        ]
    },
    
    'doubly_linked_list': {
        'title': 'Doubly Linked Lists Quiz',
        'description': 'Test your understanding of doubly linked lists and their bidirectional operations.',
        'questions': [
            {
                'id': 'dll_q1',
                'type': 'multiple_choice',
                'question': 'What is the main advantage of doubly linked lists over singly linked lists?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Uses less memory'},
                    {'key': 'B', 'text': 'Faster insertion at beginning'},
                    {'key': 'C', 'text': 'Bidirectional traversal'},
                    {'key': 'D', 'text': 'Better cache performance'}
                ],
                'correct_answer': 'C',
                'explanation': 'Doubly linked lists allow traversal in both directions due to the prev pointer, unlike singly linked lists.'
            },
            {
                'id': 'dll_q2',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of deleting a node when you have a reference to it in a doubly linked list?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n²)'}
                ],
                'correct_answer': 'A',
                'explanation': 'With a direct reference to the node and prev/next pointers, deletion can be done in constant time.'
            },
            {
                'id': 'dll_q3',
                'type': 'true_false',
                'question': 'Doubly linked lists require more memory than singly linked lists.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, each node in a doubly linked list needs an additional pointer (prev), increasing memory usage.'
            }
        ]
    },
    
    'priority_queue': {
        'title': 'Priority Queues Quiz',
        'description': 'Evaluate your knowledge of priority queues and heap-based implementations.',
        'questions': [
            {
                'id': 'pq_q1',
                'type': 'multiple_choice',
                'question': 'In a priority queue, which element is typically removed first?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'The first element inserted'},
                    {'key': 'B', 'text': 'The last element inserted'},
                    {'key': 'C', 'text': 'The element with highest priority'},
                    {'key': 'D', 'text': 'A random element'}
                ],
                'correct_answer': 'C',
                'explanation': 'Priority queues serve elements based on their priority, not insertion order.'
            },
            {
                'id': 'pq_q2',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of inserting an element into a binary heap-based priority queue?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n log n)'}
                ],
                'correct_answer': 'B',
                'explanation': 'Insertion requires bubbling up the element to maintain heap property, taking O(log n) time.'
            },
            {
                'id': 'pq_q3',
                'type': 'true_false',
                'question': 'Priority queues are commonly used in Dijkstra\'s shortest path algorithm.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, Dijkstra\'s algorithm uses a priority queue to always process the node with smallest distance first.'
            }
        ]
    },
    
    'hash_table': {
        'title': 'Hash Tables Quiz',
        'description': 'Test your understanding of hash tables, collision handling, and performance characteristics.',
        'questions': [
            {
                'id': 'ht_q1',
                'type': 'multiple_choice',
                'question': 'What is the average time complexity for search operations in a hash table?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n²)'}
                ],
                'correct_answer': 'A',
                'explanation': 'Hash tables provide O(1) average case lookup time through direct indexing via hash function.'
            },
            {
                'id': 'ht_q2',
                'type': 'multiple_choice',
                'question': 'Which collision resolution technique uses linked lists at each hash table index?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Linear probing'},
                    {'key': 'B', 'text': 'Quadratic probing'},
                    {'key': 'C', 'text': 'Separate chaining'},
                    {'key': 'D', 'text': 'Double hashing'}
                ],
                'correct_answer': 'C',
                'explanation': 'Separate chaining handles collisions by maintaining a linked list at each hash table index.'
            },
            {
                'id': 'ht_q3',
                'type': 'true_false',
                'question': 'A good hash function should distribute keys uniformly across the hash table.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, uniform distribution minimizes collisions and maintains O(1) average performance.'
            }
        ]
    },
    
    'dfs_bfs': {
        'title': 'DFS and BFS Quiz',
        'description': 'Assess your knowledge of graph traversal algorithms and their applications.',
        'questions': [
            {
                'id': 'graph_q1',
                'type': 'multiple_choice',
                'question': 'Which data structure is typically used to implement BFS?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Stack'},
                    {'key': 'B', 'text': 'Queue'},
                    {'key': 'C', 'text': 'Priority Queue'},
                    {'key': 'D', 'text': 'Hash Table'}
                ],
                'correct_answer': 'B',
                'explanation': 'BFS uses a queue to explore nodes level by level in FIFO order.'
            },
            {
                'id': 'graph_q2',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of DFS and BFS for a graph with V vertices and E edges?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'O(V)'},
                    {'key': 'B', 'text': 'O(E)'},
                    {'key': 'C', 'text': 'O(V + E)'},
                    {'key': 'D', 'text': 'O(V * E)'}
                ],
                'correct_answer': 'C',
                'explanation': 'Both DFS and BFS visit each vertex once and examine each edge once, resulting in O(V + E) complexity.'
            },
            {
                'id': 'graph_q3',
                'type': 'true_false',
                'question': 'DFS can be implemented recursively using the call stack.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, DFS naturally uses recursion, leveraging the call stack for backtracking.'
            }
        ]
    },
    
    'huffman_coding': {
        'title': 'Huffman Coding Quiz',
        'description': 'Test your understanding of Huffman coding algorithm and data compression principles.',
        'questions': [
            {
                'id': 'huff_q1',
                'type': 'multiple_choice',
                'question': 'What principle does Huffman coding use to achieve compression?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Fixed-length encoding'},
                    {'key': 'B', 'text': 'Variable-length encoding based on frequency'},
                    {'key': 'C', 'text': 'Dictionary-based compression'},
                    {'key': 'D', 'text': 'Run-length encoding'}
                ],
                'correct_answer': 'B',
                'explanation': 'Huffman coding assigns shorter codes to more frequent characters and longer codes to less frequent ones.'
            },
            {
                'id': 'huff_q2',
                'type': 'multiple_choice',
                'question': 'What data structure is used to build the Huffman tree?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Stack'},
                    {'key': 'B', 'text': 'Queue'},
                    {'key': 'C', 'text': 'Priority Queue (Min Heap)'},
                    {'key': 'D', 'text': 'Hash Table'}
                ],
                'correct_answer': 'C',
                'explanation': 'A min heap (priority queue) is used to always select the two nodes with smallest frequencies for merging.'
            },
            {
                'id': 'huff_q3',
                'type': 'true_false',
                'question': 'Huffman codes satisfy the prefix property.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, no Huffman code is a prefix of another, ensuring unambiguous decoding.'
            }
        ]
    },
    
    'a_star': {
        'title': 'A* Algorithm Quiz',
        'description': 'Evaluate your knowledge of the A* pathfinding algorithm and heuristic search.',
        'questions': [
            {
                'id': 'astar_q1',
                'type': 'multiple_choice',
                'question': 'What does the f(n) score represent in A* algorithm?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Actual cost from start to n'},
                    {'key': 'B', 'text': 'Heuristic estimate from n to goal'},
                    {'key': 'C', 'text': 'Sum of actual cost and heuristic estimate'},
                    {'key': 'D', 'text': 'Priority of node n'}
                ],
                'correct_answer': 'C',
                'explanation': 'f(n) = g(n) + h(n), where g(n) is actual cost from start and h(n) is heuristic estimate to goal.'
            },
            {
                'id': 'astar_q2',
                'type': 'multiple_choice',
                'question': 'For A* to guarantee optimal solution, the heuristic function must be:',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Consistent'},
                    {'key': 'B', 'text': 'Admissible'},
                    {'key': 'C', 'text': 'Both consistent and admissible'},
                    {'key': 'D', 'text': 'Neither consistent nor admissible'}
                ],
                'correct_answer': 'B',
                'explanation': 'An admissible heuristic (never overestimates actual cost) guarantees A* finds the optimal path.'
            },
            {
                'id': 'astar_q3',
                'type': 'true_false',
                'question': 'A* algorithm is commonly used in video game pathfinding.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, A* is widely used in games for efficient pathfinding with good performance and optimal results.'
            }
        ]
    },
    
    'binary_tree': {
        'title': 'Binary Trees Quiz',
        'description': 'Test your understanding of binary trees, their properties, and traversal methods.',
        'questions': [
            {
                'id': 'tree_q1',
                'type': 'multiple_choice',
                'question': 'What is the maximum number of nodes at level k in a binary tree?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': '2^k'},
                    {'key': 'B', 'text': '2^(k-1)'},
                    {'key': 'C', 'text': 'k^2'},
                    {'key': 'D', 'text': '2k'}
                ],
                'correct_answer': 'A',
                'explanation': 'At level k, a binary tree can have at most 2^k nodes. Level 0 has 1 node (2^0), level 1 has 2 nodes (2^1), level 2 has 4 nodes (2^2), and so on.'
            },
            {
                'id': 'tree_q2',
                'type': 'multiple_choice',
                'question': 'In which traversal method do you visit the root node first?',
                'points': 5,
                'options': [
                    {'key': 'A', 'text': 'Inorder'},
                    {'key': 'B', 'text': 'Preorder'},
                    {'key': 'C', 'text': 'Postorder'},
                    {'key': 'D', 'text': 'Level order'}
                ],
                'correct_answer': 'B',
                'explanation': 'In preorder traversal, the root node is visited first, followed by the left subtree, then the right subtree (Root-Left-Right).'
            },
            {
                'id': 'tree_q3',
                'type': 'true_false',
                'question': 'In a binary search tree, an inorder traversal gives nodes in sorted order.',
                'points': 3,
                'correct_answer': 'true',
                'explanation': 'Yes, in a binary search tree, inorder traversal (left-root-right) visits nodes in ascending sorted order due to the BST property.'
            },
            {
                'id': 'tree_q4',
                'type': 'multiple_choice',
                'question': 'What is the time complexity of searching for an element in a balanced binary search tree?',
                'points': 4,
                'options': [
                    {'key': 'A', 'text': 'O(1)'},
                    {'key': 'B', 'text': 'O(log n)'},
                    {'key': 'C', 'text': 'O(n)'},
                    {'key': 'D', 'text': 'O(n log n)'}
                ],
                'correct_answer': 'B',
                'explanation': 'In a balanced binary search tree, the height is O(log n), and searching involves traversing from root to a leaf in the worst case, resulting in O(log n) time complexity.'
            },
            {
                'id': 'tree_q5',
                'type': 'code',
                'question': 'Write a Python function to find the height (maximum depth) of a binary tree.',
                'points': 15,
                'correct_answer': '''def tree_height(root):
    if root is None:
        return 0
    
    left_height = tree_height(root.left)
    right_height = tree_height(root.right)
    
    return 1 + max(left_height, right_height)''',
                'explanation': 'This recursive function calculates the height by finding the maximum depth of left and right subtrees and adding 1 for the current node. The height of an empty tree is 0.'
            }
        ]
    }
}
