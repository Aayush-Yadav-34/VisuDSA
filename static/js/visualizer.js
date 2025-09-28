// Visualizer functionality for the Data Structures Learning Platform

// Global variables for visualizations
let currentVisualization = null;
let animationQueue = [];
let isAnimating = false;
let visualizationData = {};

/**
 * Initialize the visualizer for a specific data structure
 */
function initializeVisualizer(dataStructure) {
    currentVisualization = dataStructure;
    setupControls(dataStructure);
    createVisualization(dataStructure);
    
    // Set up control event listeners
    setupVisualizationControls();
}

/**
 * Set up controls based on data structure type
 */
function setupControls(dataStructure) {
    const controlsContainer = document.getElementById('controls-container');
    
    const controlsHTML = {
        'array': `
            <div class="mb-3">
                <label class="form-label">Add Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="array-value" placeholder="Value">
                    <input type="number" class="form-control" id="array-index" placeholder="Index (optional)">
                    <button class="btn btn-primary" id="array-add">Add</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Remove Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="array-remove-index" placeholder="Index">
                    <button class="btn btn-danger" id="array-remove">Remove</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Search Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="array-search-value" placeholder="Value">
                    <button class="btn btn-info" id="array-search">Search</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-secondary" id="array-sort">Sort Array</button>
                <button class="btn btn-outline-secondary" id="array-shuffle">Shuffle</button>
                <button class="btn btn-outline-danger" id="array-clear">Clear All</button>
            </div>
        `,
        'linked_list': `
            <div class="mb-3">
                <label class="form-label">Add Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="ll-value" placeholder="Value">
                    <select class="form-select" id="ll-position">
                        <option value="end">At End</option>
                        <option value="start">At Start</option>
                        <option value="index">At Index</option>
                    </select>
                    <button class="btn btn-primary" id="ll-add">Add</button>
                </div>
                <input type="number" class="form-control mt-2" id="ll-index" placeholder="Index" style="display:none;">
            </div>
            <div class="mb-3">
                <label class="form-label">Remove Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="ll-remove-value" placeholder="Value">
                    <button class="btn btn-danger" id="ll-remove">Remove</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Search Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="ll-search-value" placeholder="Value">
                    <button class="btn btn-info" id="ll-search">Search</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="ll-clear">Clear All</button>
            </div>
        `,
        'stack': `
            <div class="mb-3">
                <label class="form-label">Push Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="stack-value" placeholder="Value">
                    <button class="btn btn-primary" id="stack-push">Push</button>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-warning w-100" id="stack-pop">Pop</button>
            </div>
            <div class="mb-3">
                <button class="btn btn-info w-100" id="stack-peek">Peek</button>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="stack-clear">Clear All</button>
            </div>
        `,
        'queue': `
            <div class="mb-3">
                <label class="form-label">Enqueue Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="queue-value" placeholder="Value">
                    <button class="btn btn-primary" id="queue-enqueue">Enqueue</button>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-warning w-100" id="queue-dequeue">Dequeue</button>
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="queue-front">Front</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="queue-rear">Rear</button>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="queue-clear">Clear All</button>
            </div>
        `,
        'doubly_linked_list': `
            <div class="mb-3">
                <label class="form-label">Add Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="dll-value" placeholder="Value">
                    <select class="form-select" id="dll-position">
                        <option value="end">At End</option>
                        <option value="start">At Start</option>
                    </select>
                    <button class="btn btn-primary" id="dll-add">Add</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Remove Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="dll-remove-value" placeholder="Value">
                    <button class="btn btn-danger" id="dll-remove">Remove</button>
                </div>
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="dll-traverse-forward">Forward</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="dll-traverse-backward">Backward</button>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="dll-clear">Clear All</button>
            </div>
        `,
        'priority_queue': `
            <div class="mb-3">
                <label class="form-label">Enqueue Element</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="pq-value" placeholder="Value">
                    <input type="number" class="form-control" id="pq-priority" placeholder="Priority">
                    <button class="btn btn-primary" id="pq-enqueue">Enqueue</button>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-warning w-100" id="pq-dequeue">Dequeue</button>
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="pq-front">Front</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-info w-100" id="pq-rear">Rear</button>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="pq-clear">Clear All</button>
            </div>
        `,
        'hash_table': `
            <div class="mb-3">
                <label class="form-label">Insert Key-Value</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="ht-key" placeholder="Key">
                    <input type="text" class="form-control" id="ht-value" placeholder="Value">
                    <button class="btn btn-primary" id="ht-insert">Insert</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Search/Delete</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="ht-search-key" placeholder="Key">
                    <button class="btn btn-info" id="ht-search">Search</button>
                    <button class="btn btn-danger" id="ht-delete">Delete</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="ht-clear">Clear All</button>
            </div>
        `,
        'dfs_bfs': `
            <div class="mb-3">
                <label class="form-label">Add Node</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="graph-node" placeholder="Node Name">
                    <button class="btn btn-primary" id="graph-add-node">Add Node</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Add Edge</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="graph-from" placeholder="From">
                    <input type="text" class="form-control" id="graph-to" placeholder="To">
                    <button class="btn btn-primary" id="graph-add-edge">Add Edge</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Traversal</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="graph-start" placeholder="Start Node">
                    <button class="btn btn-info" id="graph-dfs">DFS</button>
                    <button class="btn btn-info" id="graph-bfs">BFS</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="graph-clear">Clear All</button>
            </div>
        `,
        'binary_tree': `
            <div class="mb-3">
                <label class="form-label">Insert Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="tree-value" placeholder="Value">
                    <button class="btn btn-primary" id="tree-insert">Insert</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Remove Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="tree-remove-value" placeholder="Value">
                    <button class="btn btn-danger" id="tree-remove">Remove</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Search Node</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="tree-search-value" placeholder="Value">
                    <button class="btn btn-info" id="tree-search">Search</button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Traversal</label>
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary" id="tree-inorder">In-order</button>
                    <button class="btn btn-outline-primary" id="tree-preorder">Pre-order</button>
                    <button class="btn btn-outline-primary" id="tree-postorder">Post-order</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" id="tree-clear">Clear All</button>
            </div>
        `
    };
    
    controlsContainer.innerHTML = controlsHTML[dataStructure] || '<p>Controls not available for this data structure.</p>';
}

/**
 * Create visualization based on data structure type
 */
function createVisualization(dataStructure) {
    const container = document.getElementById('visualization-container');
    container.innerHTML = '';
    
    // Initialize data structure
    visualizationData = getInitialData(dataStructure);
    
    // Create SVG
    let svgHeight = 400;
    let svgWidth = 1000;
    let svgViewBox = '0 0 800 400';
    if (dataStructure === 'hash_table') {
        svgHeight = 220; // Height for horizontal layout
        svgWidth = 1000;
        svgViewBox = '0 0 1000 220';
    }
    const svg = d3.select('#visualization-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', svgHeight)
        .attr('viewBox', svgViewBox);
    
    // Render initial visualization
    renderVisualization(dataStructure, svg);
}

/**
 * Get initial data for different data structures
 */
function getInitialData(dataStructure) {
    switch (dataStructure) {
        case 'dfs_bfs':
            // Graph: nodes as array of {id, x, y}, edges as array of {from, to}
            return {
                nodes: [
                    { id: '0', x: 140, y: 120 },
                    { id: '1', x: 320, y: 80 },
                    { id: '2', x: 320, y: 160 },
                    { id: '3', x: 500, y: 60 },
                    { id: '4', x: 500, y: 180 }
                ],
                edges: [
                    { from: '0', to: '1' },
                    { from: '0', to: '2' },
                    { from: '1', to: '3' },
                    { from: '2', to: '4' },
                    { from: '1', to: '2' }
                ],
                traversal: [],
                highlighted: { node: null, edge: null }
            };
        case 'array':
            return { elements: [5, 2, 8, 1, 9], highlightedIndex: -1 };
        case 'linked_list':
            return { nodes: [{ value: 1, next: 1 }, { value: 2, next: 2 }, { value: 3, next: null }], highlightedIndex: -1 };
        case 'doubly_linked_list':
            // prev: index of previous node, next: index of next node
            return { nodes: [
                { value: 10, prev: null, next: 1 },
                { value: 20, prev: 0, next: 2 },
                { value: 30, prev: 1, next: null }
            ], highlightedIndex: -1 };
        case 'priority_queue':
            // Heap as array of {value, priority}
            return { heap: [
                { value: 40, priority: 40 },
                { value: 30, priority: 30 },
                { value: 20, priority: 20 },
                { value: 10, priority: 10 }
            ], highlightedIndex: -1 };
        case 'stack':
            return { elements: [1, 2, 3], highlightedIndex: -1 };
        case 'queue':
            return { elements: [1, 2, 3], front: 0, rear: 2, highlightedIndex: -1 };
        case 'binary_tree':
            return { 
                root: { 
                    value: 50, 
                    left: { value: 30, left: null, right: null }, 
                    right: { value: 70, left: null, right: null } 
                } 
            };
        case 'hash_table':
            // Simple hash table with 10 buckets
            {
                // Pre-populate with a few entries hashed into buckets
                const buckets = Array.from({ length: 10 }, () => []);
                const initialPairs = [
                    { key: '10', value: 'Aayush' },
                    { key: '5', value: 'Klein' },
                    { key: '15', value: 'Gherman' },
                    { key: '25', value: 'Jin' },
                    { key: '35', value: 'Deku' }
                ];
                initialPairs.forEach(({ key, value }) => {
                    const b = hashFunction(key);
                    buckets[b].push({ key, value });
                });
                return {
                    buckets,
                    highlighted: { bucket: -1, key: null }
                };
            }
        default:
            return {};
    }
}

/**
 * Render visualization based on data structure
 */
function renderVisualization(dataStructure, svg) {
    svg.selectAll('*').remove();
    switch (dataStructure) {
        case 'array':
            renderArrayVisualization(svg);
            break;
        case 'linked_list':
            renderLinkedListVisualization(svg);
            break;
        case 'doubly_linked_list':
            renderDoublyLinkedListVisualization(svg);
            break;
        case 'priority_queue':
            renderPriorityQueueVisualization(svg);
            break;
        case 'stack':
            renderStackVisualization(svg);
            break;
        case 'queue':
            renderQueueVisualization(svg);
            break;
        case 'binary_tree':
            renderBinaryTreeVisualization(svg);
            break;
        case 'hash_table':
            renderHashTableVisualization(svg);
            break;
        case 'dfs_bfs':
            renderGraphVisualization(svg);
            break;
    }
}

/**
 * Render graph visualization for BFS/DFS
 */
function renderGraphVisualization(svg) {
    let nodes = visualizationData.nodes;
    let edges = visualizationData.edges;
    const traversal = visualizationData.traversal;
    const highlighted = visualizationData.highlighted;
    const traversedEdges = visualizationData.traversedEdges || [];
    const nodeRadius = 28;

    // --- Tree layout if possible ---
    // --- Forest/Tree layout for each component ---
    function getComponents(nodes, edges) {
        // Returns array of arrays of node ids (components)
        const adj = {};
        nodes.forEach(n => adj[n.id] = []);
        edges.forEach(e => { adj[e.from].push(e.to); adj[e.to].push(e.from); });
        const visited = {};
        const components = [];
        for (const n of nodes) {
            if (visited[n.id]) continue;
            const comp = [];
            const stack = [n.id];
            visited[n.id] = true;
            while (stack.length) {
                const u = stack.pop();
                comp.push(u);
                for (const v of adj[u]) {
                    if (!visited[v]) { visited[v] = true; stack.push(v); }
                }
            }
            components.push(comp);
        }
        return components;
    }

    function isTreeComponent(comp, edges) {
        // For a component (array of node ids), check if it's a tree
        const compEdges = edges.filter(e => comp.includes(e.from) && comp.includes(e.to));
        // Tree: |E| = |V|-1, connected, no cycles, one root
        if (comp.length === 0) return false;
        if (compEdges.length !== comp.length - 1) return false;
        // Check for single parent
        const parent = {};
        for (const e of compEdges) {
            if (parent[e.to]) return false;
            parent[e.to] = e.from;
        }
        // Find root (no incoming edge)
        const inDegree = {};
        comp.forEach(id => inDegree[id] = 0);
        compEdges.forEach(e => inDegree[e.to]++);
        const roots = comp.filter(id => inDegree[id] === 0);
        if (roots.length !== 1) return false;
        return true;
    }

    // Layout all components
    const components = getComponents(nodes, edges);
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = 40;
    const compWidth = (svgWidth - 2 * margin) / Math.max(components.length, 1);
    components.forEach((comp, ci) => {
        const compNodes = nodes.filter(n => comp.includes(n.id));
        const compEdges = edges.filter(e => comp.includes(e.from) && comp.includes(e.to));
        if (isTreeComponent(comp, edges)) {
            // Tree layout for this component
            // Find root
            const inDegree = {};
            comp.forEach(id => inDegree[id] = 0);
            compEdges.forEach(e => inDegree[e.to]++);
            const root = compNodes.find(n => inDegree[n.id] === 0);
            // BFS to assign level
            const levels = {};
            const levelNodes = {};
            let maxLevel = 0;
            const queue = [{ id: root.id, level: 0 }];
            while (queue.length) {
                const { id, level } = queue.shift();
                levels[id] = level;
                if (!levelNodes[level]) levelNodes[level] = [];
                levelNodes[level].push(id);
                maxLevel = Math.max(maxLevel, level);
                compEdges.filter(e => e.from === id).forEach(e => {
                    queue.push({ id: e.to, level: level + 1 });
                });
            }
            // Assign x/y within compWidth
            for (let l = 0; l <= maxLevel; l++) {
                const ids = levelNodes[l];
                ids.forEach((id, i) => {
                    const node = nodes.find(n => n.id === id);
                    node.x = margin + ci * compWidth + compWidth / (ids.length + 1) * (i + 1);
                    node.y = 80 + l * (svgHeight - 120) / (maxLevel + 1);
                });
            }
        } else {
            // Arrange in a circle within compWidth
            const centerX = margin + ci * compWidth + compWidth / 2;
            const centerY = svgHeight / 2;
            const radius = Math.min(compWidth, svgHeight) / 2.5;
            compNodes.forEach((node, i) => {
                const angle = (2 * Math.PI * i) / compNodes.length;
                node.x = centerX + radius * Math.cos(angle);
                node.y = centerY + radius * Math.sin(angle);
            });
        }
    });

    // Draw edges
    edges.forEach((edge, i) => {
        const from = nodes.find(n => n.id === edge.from);
        const to = nodes.find(n => n.id === edge.to);
        if (!from || !to) return;
        let color = '#6c757d';
        if (traversedEdges.includes(i)) color = '#ffc107';
        else if (highlighted.edge === i) color = '#ffc107';
        svg.append('line')
            .attr('x1', from.x)
            .attr('y1', from.y)
            .attr('x2', to.x)
            .attr('y2', to.y)
            .attr('stroke', color)
            .attr('stroke-width', 4);
    });

    // Draw nodes
    nodes.forEach((node, i) => {
        svg.append('circle')
            .attr('cx', node.x)
            .attr('cy', node.y)
            .attr('r', nodeRadius)
            .attr('fill', traversal.includes(node.id) ? '#20c997' : (highlighted.node === node.id ? '#ffc107' : '#0d6efd'))
            .attr('stroke', '#6c757d')
            .attr('stroke-width', 2);
        svg.append('text')
            .attr('x', node.x)
            .attr('y', node.y)
            .text(node.id)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', 18);
    });
}

/**
 * Step-by-step explanation helpers
 */
function setStepExplanation(steps) {
    const container = document.getElementById('step-explanation');
    if (!container) return;
    container.innerHTML = '';
    steps.forEach((text, idx) => {
        const row = document.createElement('div');
        row.className = 'mb-1';
        row.innerHTML = `<strong>Step ${idx + 1}:</strong> ${text}`;
        container.appendChild(row);
    });
}

function clearStepExplanation() {
    const container = document.getElementById('step-explanation');
    if (!container) return;
    container.innerHTML = '<div class="text-muted">Perform an operation to see step-by-step explanation</div>';
}

/**
 * Render hash table visualization
 */
function renderHashTableVisualization(svg) {
    const buckets = visualizationData.buckets;
    const highlighted = visualizationData.highlighted;
    const bucketWidth = 80;
    const bucketHeight = 50;
    const startX = 60;
    const startY = 40;
    const bucketSpacing = 30;

    // Draw buckets horizontally
    for (let i = 0; i < buckets.length; i++) {
        // Bucket rectangle
        svg.append('rect')
            .attr('x', startX + i * (bucketWidth + bucketSpacing))
            .attr('y', startY)
            .attr('width', bucketWidth)
            .attr('height', bucketHeight)
            .attr('fill', highlighted.bucket === i ? '#ffc107' : '#0d6efd')
            .attr('stroke', '#6c757d')
            .attr('stroke-width', 2);

        // Bucket index (above bucket)
        svg.append('text')
            .attr('x', startX + i * (bucketWidth + bucketSpacing) + bucketWidth / 2)
            .attr('y', startY - 10)
            .text(i)
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 18);

        // Key-value pairs in bucket (drawn below the bucket, horizontally)
        buckets[i].forEach((pair, j) => {
            svg.append('rect')
                .attr('x', startX + i * (bucketWidth + bucketSpacing) + 5)
                .attr('y', startY + bucketHeight + 15 + j * 38)
                .attr('width', bucketWidth - 10)
                .attr('height', 30)
                .attr('fill', highlighted.key === pair.key && highlighted.bucket === i ? '#dc3545' : '#20c997')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5);
            svg.append('text')
                .attr('x', startX + i * (bucketWidth + bucketSpacing) + bucketWidth / 2)
                .attr('y', startY + bucketHeight + 15 + j * 38 + 18)
                .text(`${pair.key}:${pair.value}`)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .attr('font-size', 13);
        });
    }
}

/**
 * Render priority queue (heap) visualization
 */
function renderPriorityQueueVisualization(svg) {
    const heap = visualizationData.heap;
    if (!heap || heap.length === 0) return;
    const nodeRadius = 28;
    const levelHeight = 90;
    const rootX = 400;
    const rootY = 60;

    // Calculate positions for each node in the heap
    function getNodePosition(index) {
        if (index === 0) return { x: rootX, y: rootY };
        const level = Math.floor(Math.log2(index + 1));
        const nodesInLevel = Math.pow(2, level);
        const posInLevel = index - (nodesInLevel - 1);
        const width = 800 / (nodesInLevel + 1);
        return {
            x: width * (posInLevel + 1),
            y: rootY + level * levelHeight
        };
    }

    // Draw edges
    heap.forEach((node, i) => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const pos = getNodePosition(i);
        if (left < heap.length) {
            const leftPos = getNodePosition(left);
            svg.append('line')
                .attr('x1', pos.x)
                .attr('y1', pos.y + nodeRadius)
                .attr('x2', leftPos.x)
                .attr('y2', leftPos.y - nodeRadius)
                .attr('stroke', '#6c757d')
                .attr('stroke-width', 2);
        }
        if (right < heap.length) {
            const rightPos = getNodePosition(right);
            svg.append('line')
                .attr('x1', pos.x)
                .attr('y1', pos.y + nodeRadius)
                .attr('x2', rightPos.x)
                .attr('y2', rightPos.y - nodeRadius)
                .attr('stroke', '#6c757d')
                .attr('stroke-width', 2);
        }
    });

    // Draw nodes
    heap.forEach((node, i) => {
        const pos = getNodePosition(i);
        svg.append('circle')
            .attr('cx', pos.x)
            .attr('cy', pos.y)
            .attr('r', nodeRadius)
            .attr('fill', '#0dcaf0')
            .attr('stroke', '#6c757d')
            .attr('stroke-width', 2);
        svg.append('text')
            .attr('x', pos.x)
            .attr('y', pos.y - 6)
            .text(node.value)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('font-size', 18)
            .attr('font-weight', 'bold');
        svg.append('text')
            .attr('x', pos.x)
            .attr('y', pos.y + 18)
            .text('P:' + node.priority)
            .attr('fill', '#ffc107')
            .attr('text-anchor', 'middle')
            .attr('font-size', 12);
    });
}
/**
 * Render doubly linked list visualization
 */
function renderDoublyLinkedListVisualization(svg) {
    const data = visualizationData.nodes;
    const nodeWidth = 80;
    const nodeHeight = 50;
    const nodeSpacing = 120;
    const startX = 50;
    const startY = 200;

    if (data.length === 0) {
        svg.append('text')
            .attr('x', 400)
            .attr('y', startY)
            .text('Empty Doubly Linked List')
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16);
        return;
    }

    // Add arrowhead markers for next and prev
    const defs = svg.append('defs');
    
    // Next arrow marker (blue, pointing right)
    defs.append('marker')
        .attr('id', 'dll-arrowhead-next')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#0d6efd');

    // Prev arrow marker (green, pointing left)
    defs.append('marker')
        .attr('id', 'dll-arrowhead-prev')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#20c997');

    // Draw forward arrows (next pointers) first - top arrows
    for (let i = 0; i < data.length - 1; i++) {
        const currentX = startX + i * nodeSpacing + nodeWidth;
        const nextX = startX + (i + 1) * nodeSpacing;
        const arrowY = startY + nodeHeight / 2 - 15; // Above center
        
        svg.append('line')
            .attr('class', 'dll-link-next')
            .attr('x1', currentX)
            .attr('y1', arrowY)
            .attr('x2', nextX)
            .attr('y2', arrowY)
            .attr('stroke', '#0d6efd')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#dll-arrowhead-next)');
        
        // Add "next" label
        svg.append('text')
            .attr('x', (currentX + nextX) / 2)
            .attr('y', arrowY - 8)
            .text('next')
            .attr('fill', '#0d6efd')
            .attr('text-anchor', 'middle')
            .attr('font-size', 10);
    }

    // Draw backward arrows (prev pointers) - bottom arrows
    for (let i = 1; i < data.length; i++) {
        const currentX = startX + i * nodeSpacing;
        const prevX = startX + (i - 1) * nodeSpacing + nodeWidth;
        const arrowY = startY + nodeHeight / 2 + 15; // Below center
        
        svg.append('line')
            .attr('class', 'dll-link-prev')
            .attr('x1', currentX)
            .attr('y1', arrowY)
            .attr('x2', prevX)
            .attr('y2', arrowY)
            .attr('stroke', '#20c997')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#dll-arrowhead-prev)');
        
        // Add "prev" label
        svg.append('text')
            .attr('x', (currentX + prevX) / 2)
            .attr('y', arrowY + 18)
            .text('prev')
            .attr('fill', '#20c997')
            .attr('text-anchor', 'middle')
            .attr('font-size', 10);
    }

    // Create nodes on top of arrows
    const nodes = svg.selectAll('.dll-node')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'dll-node-group');

    // Node rectangles
    nodes.append('rect')
        .attr('class', 'node')
        .attr('x', (d, i) => startX + i * nodeSpacing)
        .attr('y', startY)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .attr('fill', (d, i) => visualizationData.highlightedIndex === i ? '#ffc107' : '#fd7e14')
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 2)
        .attr('rx', 5);

    // Node values
    nodes.append('text')
        .attr('class', 'node-text')
        .attr('x', (d, i) => startX + i * nodeSpacing + nodeWidth / 2)
        .attr('y', startY + nodeHeight / 2)
        .text(d => d.value)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', 16)
        .attr('font-weight', 'bold');

    // Add NULL indicators for head's prev and tail's next
    if (data.length > 0) {
        // NULL for head's prev
        svg.append('text')
            .attr('x', startX - 30)
            .attr('y', startY + nodeHeight / 2 + 15)
            .text('NULL')
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 12);

        // NULL for tail's next
        svg.append('text')
            .attr('x', startX + (data.length - 1) * nodeSpacing + nodeWidth + 30)
            .attr('y', startY + nodeHeight / 2 - 15)
            .text('NULL')
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 12);

        // Head and Tail labels
        svg.append('text')
            .attr('x', startX + nodeWidth / 2)
            .attr('y', startY - 10)
            .text('HEAD')
            .attr('fill', '#fd7e14')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold');

        svg.append('text')
            .attr('x', startX + (data.length - 1) * nodeSpacing + nodeWidth / 2)
            .attr('y', startY - 10)
            .text('TAIL')
            .attr('fill', '#fd7e14')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold');
    }
}

/**
 * Render array visualization
 */
function renderArrayVisualization(svg) {
    const data = visualizationData.elements;
    const cellWidth = 70;
    const cellHeight = 60;
    const startX = 80;
    const startY = 180;
    const maxVisibleElements = 12; // Limit for viewport
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    if (data.length === 0) {
        svg.append('text')
            .attr('x', 400)
            .attr('y', startY)
            .text('Empty Array - Add elements to visualize')
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16);
        return;
    }

    // Add gradient definitions for better visual appeal
    const defs = svg.append('defs');
    
    // Normal cell gradient
    const normalGradient = defs.append('linearGradient')
        .attr('id', 'normalCell')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%');
    normalGradient.append('stop')
        .attr('offset', '0%').attr('stop-color', '#4dabf7');
    normalGradient.append('stop')
        .attr('offset', '100%').attr('stop-color', '#0d6efd');

    // Highlighted cell gradient
    const highlightGradient = defs.append('linearGradient')
        .attr('id', 'highlightCell')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%');
    highlightGradient.append('stop')
        .attr('offset', '0%').attr('stop-color', '#fff3cd');
    highlightGradient.append('stop')
        .attr('offset', '100%').attr('stop-color', '#ffc107');

    // Draw array bracket (left)
    svg.append('path')
        .attr('d', `M ${startX - 15} ${startY - 10} 
                    L ${startX - 5} ${startY - 10} 
                    L ${startX - 5} ${startY + cellHeight + 10} 
                    L ${startX - 15} ${startY + cellHeight + 10}`)
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    // Draw array bracket (right)
    const endX = startX + Math.min(data.length, maxVisibleElements) * cellWidth;
    svg.append('path')
        .attr('d', `M ${endX + 5} ${startY - 10} 
                    L ${endX + 15} ${startY - 10} 
                    L ${endX + 15} ${startY + cellHeight + 10} 
                    L ${endX + 5} ${startY + cellHeight + 10}`)
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    // Show scrolling indicator if array is too long
    const displayData = data.length > maxVisibleElements ? 
                       data.slice(0, maxVisibleElements) : data;
    
    if (data.length > maxVisibleElements) {
        svg.append('text')
            .attr('x', endX + 30)
            .attr('y', startY + cellHeight/2)
            .text(`... +${data.length - maxVisibleElements} more`)
            .attr('fill', '#6c757d')
            .attr('font-style', 'italic')
            .attr('font-size', 12);
    }

    // Create cells group
    const cells = svg.selectAll('.array-cell')
        .data(displayData)
        .enter()
        .append('g')
        .attr('class', 'array-cell-group');
    
    // Cell rectangles with enhanced styling
    cells.append('rect')
        .attr('class', (d, i) => `array-cell cell-${i}`)
        .attr('x', (d, i) => startX + i * cellWidth)
        .attr('y', startY)
        .attr('width', cellWidth - 2)
        .attr('height', cellHeight)
        .attr('fill', (d, i) => {
            return visualizationData.highlightedIndex === i ? 
                   'url(#highlightCell)' : 'url(#normalCell)';
        })
        .attr('stroke', '#495057')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8);

    // Add subtle shadow effect
    cells.append('rect')
        .attr('class', 'array-cell-shadow')
        .attr('x', (d, i) => startX + i * cellWidth + 2)
        .attr('y', startY + 2)
        .attr('width', cellWidth - 2)
        .attr('height', cellHeight)
        .attr('fill', 'rgba(0,0,0,0.1)')
        .attr('rx', 8)
        .attr('ry', 8)
        .style('z-index', -1);

    // Cell values with better typography
    cells.append('text')
        .attr('class', 'array-value')
        .attr('x', (d, i) => startX + i * cellWidth + cellWidth / 2)
        .attr('y', startY + cellHeight / 2 + 2)
        .text(d => d)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', 18)
        .attr('font-weight', 'bold')
        .attr('text-shadow', '1px 1px 2px rgba(0,0,0,0.3)');
    
    // Index labels with better positioning
    cells.append('text')
        .attr('class', 'array-index')
        .attr('x', (d, i) => startX + i * cellWidth + cellWidth / 2)
        .attr('y', startY - 15)
        .text((d, i) => i) // Use the actual array index
        .attr('fill', '#495057')
        .attr('text-anchor', 'middle')
        .attr('font-size', 14)
        .attr('font-weight', 'bold');

    // Add size indicator
    svg.append('text')
        .attr('x', startX)
        .attr('y', startY + cellHeight + 25)
        .text(`Array Size: ${data.length}`)
        .attr('fill', '#495057')
        .attr('font-size', 14)
        .attr('font-weight', 'bold');

    // Highlight animation for recently accessed element
    if (visualizationData.highlightedIndex >= 0 && 
        visualizationData.highlightedIndex < data.length) {
        
        const highlightIndex = visualizationData.highlightedIndex;
        
        // Only animate if the highlighted element is in the visible range
        if (highlightIndex < maxVisibleElements) {
            // Select the specific cell using the unique class
            const highlightedCell = svg.select(`.cell-${highlightIndex}`);
            
            // Create a pulsing glow effect
            if (highlightedCell.node()) {
                // Add glowing effect
                highlightedCell
                    .attr('stroke', '#ffc107')
                    .attr('stroke-width', 4)
                    .attr('filter', 'drop-shadow(0 0 10px #ffc107)')
                    .transition()
                    .duration(600)
                    .attr('stroke-width', 6)
                    .attr('filter', 'drop-shadow(0 0 15px #ffc107)')
                    .transition()
                    .duration(600)
                    .attr('stroke-width', 4)
                    .attr('filter', 'drop-shadow(0 0 10px #ffc107)')
                    .transition()
                    .duration(600)
                    .attr('stroke-width', 6)
                    .attr('filter', 'drop-shadow(0 0 15px #ffc107)')
                    .transition()
                    .duration(600)
                    .attr('stroke-width', 2)
                    .attr('stroke', '#495057')
                    .attr('filter', 'none');
            }
        }
    }

    // Add array label
    svg.append('text')
        .attr('x', startX - 20)
        .attr('y', startY - 30)
        .text('Array')
        .attr('fill', '#495057')
        .attr('font-size', 18)
        .attr('font-weight', 'bold');
}

/**
 * Render linked list visualization
 */
function renderLinkedListVisualization(svg) {
    const data = visualizationData.nodes;
    const nodeWidth = 80;
    const nodeHeight = 50;
    const nodeSpacing = 120;
    const startX = 50;
    const startY = 200;

    if (data.length === 0) {
        svg.append('text')
            .attr('x', 400)
            .attr('y', startY)
            .text('Empty Linked List')
            .attr('fill', '#6c757d')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16);
        return;
    }
    
    // Create nodes
    const nodes = svg.selectAll('.ll-node')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'll-node-group');
    
    // Node rectangles
    nodes.append('rect')
        .attr('class', 'node')
        .attr('x', (d, i) => startX + i * nodeSpacing)
        .attr('y', startY)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .attr('fill', (d, i) => visualizationData.highlightedIndex === i ? '#ffc107' : '#fd7e14')
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 2)
        .attr('rx', 5);
    
    // Node values
    nodes.append('text')
        .attr('class', 'node-text')
        .attr('x', (d, i) => startX + i * nodeSpacing + nodeWidth / 2)
        .attr('y', startY + nodeHeight / 2)
        .text(d => d.value)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central');
    
    // Add arrowhead markers for next pointers
    const defs = svg.append('defs');
    
    // Next arrow marker (blue, pointing right)
    defs.append('marker')
        .attr('id', 'll-arrowhead-next')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#0d6efd');

    // Draw forward arrows (next pointers) - center arrows
    for (let i = 0; i < data.length - 1; i++) {
        const currentX = startX + i * nodeSpacing + nodeWidth;
        const nextX = startX + (i + 1) * nodeSpacing;
        const arrowY = startY + nodeHeight / 2; // Center
        
        svg.append('line')
            .attr('class', 'll-link-next')
            .attr('x1', currentX)
            .attr('y1', arrowY)
            .attr('x2', nextX)
            .attr('y2', arrowY)
            .attr('stroke', '#0d6efd')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#ll-arrowhead-next)');
        
        // Add "next" label
        svg.append('text')
            .attr('x', (currentX + nextX) / 2)
            .attr('y', arrowY - 8)
            .text('next')
            .attr('fill', '#0d6efd')
            .attr('text-anchor', 'middle')
            .attr('font-size', 10);
    }

    // Add HEAD/TAIL labels
    if (data.length > 0) {
        // Head and Tail labels
        svg.append('text')
            .attr('x', startX + nodeWidth / 2)
            .attr('y', startY - 10)
            .text('HEAD')
            .attr('fill', '#fd7e14')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold');

        svg.append('text')
            .attr('x', startX + (data.length - 1) * nodeSpacing + nodeWidth / 2)
            .attr('y', startY - 10)
            .text('TAIL')
            .attr('fill', '#fd7e14')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold');
    }
}

/**
 * Render stack visualization
 */
function renderStackVisualization(svg) {
    const data = visualizationData.elements;
    const cellWidth = 80;
    const cellHeight = 40;
    const startX = 350;
    const startY = 50;
    
    // Create stack items
    const items = svg.selectAll('.stack-item')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'stack-item-group');
    
    // Stack item rectangles (bottom to top)
    items.append('rect')
        .attr('class', (d, i) => `stack-item ${i === data.length - 1 ? 'top' : ''}`)
        .attr('x', startX)
        .attr('y', (d, i) => startY + (data.length - 1 - i) * cellHeight)
        .attr('width', cellWidth)
        .attr('height', cellHeight - 2)
        .attr('fill', (d, i) => i === data.length - 1 ? '#ffc107' : '#17a2b8')
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 2);
    
    // Stack item values
    items.append('text')
        .attr('class', 'node-text')
        .attr('x', startX + cellWidth / 2)
        .attr('y', (d, i) => startY + (data.length - 1 - i) * cellHeight + cellHeight / 2)
        .text(d => d)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central');
    
    // Top indicator
    svg.append('text')
        .attr('x', startX + cellWidth + 20)
        .attr('y', startY + cellHeight / 2)
        .text('← TOP')
        .attr('fill', '#ffc107')
        .attr('font-weight', 'bold');
}

/**
 * Render queue visualization
 */
function renderQueueVisualization(svg) {
    const data = visualizationData.elements;
    const cellWidth = 60;
    const cellHeight = 50;
    const startX = 50;
    const startY = 150;
    
    // Create queue items
    const items = svg.selectAll('.queue-item')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'queue-item-group');
    
    // Queue item rectangles
    items.append('rect')
        .attr('class', (d, i) => {
            let classes = 'queue-item';
            if (i === visualizationData.front) classes += ' front';
            if (i === visualizationData.rear) classes += ' rear';
            return classes;
        })
        .attr('x', (d, i) => startX + i * cellWidth)
        .attr('y', startY)
        .attr('width', cellWidth - 2)
        .attr('height', cellHeight)
        .attr('fill', (d, i) => {
            if (i === visualizationData.front) return '#ffc107';
            if (i === visualizationData.rear) return '#17a2b8';
            return '#28a745';
        })
        .attr('stroke', '#6c757d')
        .attr('stroke-width', 2);
    
    // Queue item values
    items.append('text')
        .attr('class', 'node-text')
        .attr('x', (d, i) => startX + i * cellWidth + cellWidth / 2)
        .attr('y', startY + cellHeight / 2)
        .text(d => d)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central');
    
    // Front and rear indicators
    svg.append('text')
        .attr('x', startX + visualizationData.front * cellWidth + cellWidth / 2)
        .attr('y', startY - 10)
        .text('FRONT')
        .attr('fill', '#ffc107')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold');
    
    svg.append('text')
        .attr('x', startX + visualizationData.rear * cellWidth + cellWidth / 2)
        .attr('y', startY + cellHeight + 20)
        .text('REAR')
        .attr('fill', '#17a2b8')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold');
}

/**
 * Render binary tree visualization
 */
function renderBinaryTreeVisualization(svg) {
    const treeData = visualizationData.root;
    if (!treeData) return;
    
    const nodeRadius = 25;
    const levelHeight = 80;
    const rootX = 400;
    const rootY = 50;
    
    function renderNode(node, x, y, level) {
        if (!node) return;
        
        // Draw connections to children first (so they appear behind nodes)
        if (node.left) {
            const leftX = x - Math.pow(2, 3 - level) * 30;
            const leftY = y + levelHeight;
            
            svg.append('line')
                .attr('class', 'link')
                .attr('x1', x)
                .attr('y1', y + nodeRadius)
                .attr('x2', leftX)
                .attr('y2', leftY - nodeRadius)
                .attr('stroke', '#6c757d')
                .attr('stroke-width', 2);
            
            renderNode(node.left, leftX, leftY, level + 1);
        }
        
        if (node.right) {
            const rightX = x + Math.pow(2, 3 - level) * 30;
            const rightY = y + levelHeight;
            
            svg.append('line')
                .attr('class', 'link')
                .attr('x1', x)
                .attr('y1', y + nodeRadius)
                .attr('x2', rightX)
                .attr('y2', rightY - nodeRadius)
                .attr('stroke', '#6c757d')
                .attr('stroke-width', 2);
            
            renderNode(node.right, rightX, rightY, level + 1);
        }
        
        // Draw node
        svg.append('circle')
            .attr('class', 'node')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', nodeRadius)
            .attr('fill', '#6f42c1')
            .attr('stroke', '#6c757d')
            .attr('stroke-width', 2);
        
        // Draw node value
        svg.append('text')
            .attr('class', 'node-text')
            .attr('x', x)
            .attr('y', y)
            .text(node.value)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-weight', 'bold');
    }
    
    renderNode(treeData, rootX, rootY, 0);
}

/**
 * Set up visualization control event listeners
 */
function setupVisualizationControls() {
    // Play/pause/reset controls
    document.getElementById('play-animation')?.addEventListener('click', playAnimation);
    document.getElementById('pause-animation')?.addEventListener('click', pauseAnimation);
    document.getElementById('reset-visualization')?.addEventListener('click', resetVisualization);
    
    // Data structure specific controls
    setupDataStructureControls();
}

/**
 * Set up data structure specific controls
 */
function setupDataStructureControls() {
    if (!currentVisualization) return;
    
    switch (currentVisualization) {
        case 'array':
            setupArrayControls();
            break;
        case 'linked_list':
            setupLinkedListControls();
            break;
        case 'doubly_linked_list':
            setupDoublyLinkedListControls();
            break;
        case 'priority_queue':
            setupPriorityQueueControls();
            break;
        case 'stack':
            setupStackControls();
            break;
        case 'queue':
            setupQueueControls();
            break;
        case 'binary_tree':
            setupBinaryTreeControls();
            break;
        case 'hash_table':
            setupHashTableControls();
            break;
        case 'dfs_bfs':
            setupGraphControls();
            break;
    }
}

/**
 * Set up graph controls for BFS/DFS
 */
function setupGraphControls() {
    // Add Node
    document.getElementById('graph-add-node')?.addEventListener('click', () => {
        const nodeName = document.getElementById('graph-node').value.trim();
        if (!nodeName) {
            DSLearningPlatform.showToast('Please enter a node name', 'warning');
            return;
        }
        if (visualizationData.nodes.some(n => n.id === nodeName)) {
            DSLearningPlatform.showToast('Node already exists', 'warning');
            return;
        }
        // Place all nodes in a circle layout (recalculate all positions)
        const centerX = 400, centerY = 180, radius = 120;
        const nodes = [...visualizationData.nodes, { id: nodeName }];
        const total = nodes.length;
        nodes.forEach((node, i) => {
            const angle = (2 * Math.PI * i) / total;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        });
        visualizationData.nodes = nodes;
        logOperation(`Added node: ${nodeName}`);
        updateVisualization();
        document.getElementById('graph-node').value = '';
    });

    // Add Edge
    document.getElementById('graph-add-edge')?.addEventListener('click', () => {
        const from = document.getElementById('graph-from').value.trim();
        const to = document.getElementById('graph-to').value.trim();
        if (!from || !to) {
            DSLearningPlatform.showToast('Enter both node names', 'warning');
            return;
        }
        if (!visualizationData.nodes.some(n => n.id === from) || !visualizationData.nodes.some(n => n.id === to)) {
            DSLearningPlatform.showToast('Both nodes must exist', 'warning');
            return;
        }
        if (visualizationData.edges.some(e => e.from === from && e.to === to)) {
            DSLearningPlatform.showToast('Edge already exists', 'warning');
            return;
        }
        visualizationData.edges.push({ from, to });
        logOperation(`Added edge: ${from} → ${to}`);
        updateVisualization();
        document.getElementById('graph-from').value = '';
        document.getElementById('graph-to').value = '';
    });

    // DFS with animation and edge highlight
    document.getElementById('graph-dfs')?.addEventListener('click', async () => {
        const start = document.getElementById('graph-start').value.trim();
        if (!start) {
            DSLearningPlatform.showToast('Enter start node', 'warning');
            return;
        }
        if (!visualizationData.nodes.some(n => n.id === start)) {
            DSLearningPlatform.showToast('Start node does not exist', 'warning');
            return;
        }
        const visited = [];
        const steps = [`Start DFS from ${start}`];
        const traversedEdges = [];
        async function dfs(nodeId) {
            if (visited.includes(nodeId)) return;
            visited.push(nodeId);
            steps.push(`Visit ${nodeId}`);
            visualizationData.traversal = [...visited];
            visualizationData.traversedEdges = [...traversedEdges];
            updateVisualization();
            await new Promise(res => setTimeout(res, 600));
            for (const [ei, e] of visualizationData.edges.map((e, i) => [i, e])) {
                if (e.from === nodeId && !visited.includes(e.to)) {
                    traversedEdges.push(ei);
                    steps.push(`Traverse edge ${e.from} → ${e.to}`);
                    visualizationData.traversedEdges = [...traversedEdges];
                    updateVisualization();
                    await new Promise(res => setTimeout(res, 600));
                    await dfs(e.to);
                }
            }
        }
        await dfs(start);
        logOperation(`DFS: ${visited.join(' → ')}`);
        DSLearningPlatform.showToast(`DFS: ${visited.join(' → ')}`, 'info');
        visualizationData.traversedEdges = [];
        updateVisualization();
        setStepExplanation(steps);
    });

    // BFS with animation and edge highlight
    document.getElementById('graph-bfs')?.addEventListener('click', async () => {
        const start = document.getElementById('graph-start').value.trim();
        if (!start) {
            DSLearningPlatform.showToast('Enter start node', 'warning');
            return;
        }
        if (!visualizationData.nodes.some(n => n.id === start)) {
            DSLearningPlatform.showToast('Start node does not exist', 'warning');
            return;
        }
        const visited = [];
        const steps = [`Start BFS from ${start}`];
        const traversedEdges = [];
        const queue = [start];
        steps.push(`Enqueue ${start}`);
        while (queue.length) {
            const nodeId = queue.shift();
            if (!visited.includes(nodeId)) {
                visited.push(nodeId);
                steps.push(`Dequeue ${nodeId} and visit`);
                visualizationData.traversal = [...visited];
                visualizationData.traversedEdges = [...traversedEdges];
                updateVisualization();
                await new Promise(res => setTimeout(res, 600));
                for (const [ei, e] of visualizationData.edges.map((e, i) => [i, e])) {
                    if (e.from === nodeId && !visited.includes(e.to) && !queue.includes(e.to)) {
                        traversedEdges.push(ei);
                        steps.push(`Discover ${e.to} via ${e.from} → ${e.to}; enqueue ${e.to}`);
                        visualizationData.traversedEdges = [...traversedEdges];
                        updateVisualization();
                        await new Promise(res => setTimeout(res, 600));
                        queue.push(e.to);
                    }
                }
            }
        }
        logOperation(`BFS: ${visited.join(' → ')}`);
        DSLearningPlatform.showToast(`BFS: ${visited.join(' → ')}`, 'info');
        visualizationData.traversedEdges = [];
        updateVisualization();
        setStepExplanation(steps);
    });

    // Clear
    document.getElementById('graph-clear')?.addEventListener('click', () => {
        visualizationData.nodes = [];
        visualizationData.edges = [];
        visualizationData.traversal = [];
        visualizationData.highlighted = { node: null, edge: null };
        logOperation('Graph cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up hash table controls
 */
function setupHashTableControls() {
    // Insert
    document.getElementById('ht-insert')?.addEventListener('click', () => {
        const key = document.getElementById('ht-key').value;
        const value = document.getElementById('ht-value').value;
        if (!key) {
            DSLearningPlatform.showToast('Please enter a key', 'warning');
            return;
        }
        const bucket = hashFunction(key);
        // Check if key exists, update if so
        let found = false;
        for (let pair of visualizationData.buckets[bucket]) {
            if (pair.key === key) {
                pair.value = value;
                found = true;
                break;
            }
        }
        if (!found) {
            visualizationData.buckets[bucket].push({ key, value });
            logOperation(`Inserted key: ${key}, value: ${value} in bucket ${bucket}`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Append key-value to that bucket list']);
        } else {
            logOperation(`Updated key: ${key} with value: ${value} in bucket ${bucket}`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Key exists; update its value']);
        }
        visualizationData.highlighted = { bucket, key };
        updateVisualization();
        document.getElementById('ht-key').value = '';
        document.getElementById('ht-value').value = '';
    });

    // Search
    document.getElementById('ht-search')?.addEventListener('click', () => {
        const key = document.getElementById('ht-search-key').value;
        if (!key) {
            DSLearningPlatform.showToast('Please enter a key', 'warning');
            return;
        }
        const bucket = hashFunction(key);
        const found = visualizationData.buckets[bucket].find(pair => pair.key === key);
        visualizationData.highlighted = { bucket, key };
        if (found) {
            DSLearningPlatform.showToast(`Found key: ${key}, value: ${found.value} in bucket ${bucket}`, 'success');
            logOperation(`Searched key: ${key}, found value: ${found.value} in bucket ${bucket}`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Scan bucket list to find the key']);
        } else {
            DSLearningPlatform.showToast(`Key: ${key} not found`, 'info');
            logOperation(`Searched key: ${key}, not found`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Key not present in that bucket list']);
        }
        updateVisualization();
        document.getElementById('ht-search-key').value = '';
    });

    // Delete
    document.getElementById('ht-delete')?.addEventListener('click', () => {
        const key = document.getElementById('ht-search-key').value;
        if (!key) {
            DSLearningPlatform.showToast('Please enter a key', 'warning');
            return;
        }
        const bucket = hashFunction(key);
        const idx = visualizationData.buckets[bucket].findIndex(pair => pair.key === key);
        if (idx !== -1) {
            visualizationData.buckets[bucket].splice(idx, 1);
            DSLearningPlatform.showToast(`Deleted key: ${key} from bucket ${bucket}`, 'success');
            logOperation(`Deleted key: ${key} from bucket ${bucket}`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Find and remove the key from the list']);
        } else {
            DSLearningPlatform.showToast(`Key: ${key} not found`, 'info');
            logOperation(`Tried to delete key: ${key}, not found`);
            setStepExplanation([`Hash '${key}' to bucket ${bucket}`, 'Key not present; nothing to delete']);
        }
        visualizationData.highlighted = { bucket, key };
        updateVisualization();
        document.getElementById('ht-search-key').value = '';
    });

    // Clear
    document.getElementById('ht-clear')?.addEventListener('click', () => {
        visualizationData.buckets = Array.from({ length: 10 }, () => []);
        visualizationData.highlighted = { bucket: -1, key: null };
        logOperation('Hash table cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

// Simple hash function for demo (sum char codes mod 10)
function hashFunction(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash % 10;
}
/**
 * Set up priority queue (heap) controls
 */
function setupPriorityQueueControls() {
    // Enqueue
    document.getElementById('pq-enqueue')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('pq-value').value);
        const priority = parseInt(document.getElementById('pq-priority').value);
        if (isNaN(value) || isNaN(priority)) {
            DSLearningPlatform.showToast('Enter valid value and priority', 'warning');
            return;
        }
        visualizationData.heap.push({ value, priority });
        heapifyUp(visualizationData.heap);
        logOperation(`Enqueued ${value} with priority ${priority}`);
        updateVisualization();
        document.getElementById('pq-value').value = '';
        document.getElementById('pq-priority').value = '';
        setStepExplanation([
            `Insert (${value}, priority ${priority}) into heap`,
            'Place at the end',
            'Heapify up: swap with parent while greater than parent',
            'Stop when heap property holds'
        ]);
    });

    // Dequeue (Extract Max)
    document.getElementById('pq-dequeue')?.addEventListener('click', () => {
        if (!visualizationData.heap.length) {
            DSLearningPlatform.showToast('Priority Queue is empty', 'warning');
            return;
        }
        const max = visualizationData.heap[0];
        const last = visualizationData.heap.pop();
        if (visualizationData.heap.length > 0) {
            visualizationData.heap[0] = last;
            heapifyDown(visualizationData.heap);
        }
        logOperation(`Dequeued max: ${max.value} (priority ${max.priority})`);
        updateVisualization();
        setStepExplanation([
            'Remove root (max element)',
            'Move last element to root',
            'Heapify down: swap with larger child until heap property holds'
        ]);
    });

    // Front (Max)
    document.getElementById('pq-front')?.addEventListener('click', () => {
        if (!visualizationData.heap.length) {
            DSLearningPlatform.showToast('Priority Queue is empty', 'warning');
            return;
        }
        const max = visualizationData.heap[0];
        DSLearningPlatform.showToast(`Front (Max): ${max.value} (priority ${max.priority})`, 'info');
        logOperation(`Front (Max): ${max.value} (priority ${max.priority})`);
        setStepExplanation(['The root of a max-heap is always the maximum element']);
    });

    // Rear (Min)
    document.getElementById('pq-rear')?.addEventListener('click', () => {
        if (!visualizationData.heap.length) {
            DSLearningPlatform.showToast('Priority Queue is empty', 'warning');
            return;
        }
        // Find min priority element (last in heap for max-heap)
        let minIdx = 0;
        for (let i = 1; i < visualizationData.heap.length; i++) {
            if (visualizationData.heap[i].priority < visualizationData.heap[minIdx].priority) minIdx = i;
        }
        const min = visualizationData.heap[minIdx];
        DSLearningPlatform.showToast(`Rear (Min): ${min.value} (priority ${min.priority})`, 'info');
        logOperation(`Rear (Min): ${min.value} (priority ${min.priority})`);
        setStepExplanation(['In an unsorted array view of heap nodes, find min by scanning all nodes']);
    });

    // Clear
    document.getElementById('pq-clear')?.addEventListener('click', () => {
        visualizationData.heap = [];
        logOperation('Priority Queue cleared');
        updateVisualization();
        clearStepExplanation();
    });
// End of setupPriorityQueueControls

// Heapify helpers (max-heap)
function heapifyUp(heap) {
    let idx = heap.length - 1;
    while (idx > 0) {
        let parent = Math.floor((idx - 1) / 2);
        if (heap[parent].priority < heap[idx].priority) {
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
            idx = parent;
        } else {
            break;
        }
    }
}
function heapifyDown(heap) {
    let idx = 0;
    const n = heap.length;
    while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let largest = idx;
        if (left < n && heap[left].priority > heap[largest].priority) largest = left;
        if (right < n && heap[right].priority > heap[largest].priority) largest = right;
        if (largest !== idx) {
            [heap[largest], heap[idx]] = [heap[idx], heap[largest]];
            idx = largest;
        } else {
            break;
        }
    }
}}

/**
 * Set up doubly linked list controls
 */
function setupDoublyLinkedListControls() {
    // Add Node
    document.getElementById('dll-add')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('dll-value').value);
        const position = document.getElementById('dll-position').value;
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        let nodes = visualizationData.nodes;
        if (position === 'start') {
            // Insert at start
            const newNode = { value, prev: null, next: nodes.length > 0 ? 0 : null };
            if (nodes.length > 0) nodes[0].prev = 0;
            nodes.unshift(newNode);
            // Fix next/prev indices
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].next !== null && nodes[i].next !== i + 1) nodes[i].next = i + 1 < nodes.length ? i + 1 : null;
                if (nodes[i].prev !== null && nodes[i].prev !== i - 1) nodes[i].prev = i - 1 >= 0 ? i - 1 : null;
            }
            logOperation(`Added ${value} at start of list`);
            setStepExplanation([
                `Create node ${value}`,
                'Set its next to previous head',
                'Update head and fix prev/next indices'
            ]);
        } else if (position === 'end') {
            // Insert at end
            const newNode = { value, prev: nodes.length - 1 >= 0 ? nodes.length - 1 : null, next: null };
            if (nodes.length > 0) nodes[nodes.length - 1].next = nodes.length;
            nodes.push(newNode);
            logOperation(`Added ${value} at end of list`);
            setStepExplanation([
                `Create node ${value}`,
                'Link current tail to new node',
                'Update tail and indices'
            ]);
        }
        updateVisualization();
        document.getElementById('dll-value').value = '';
    });

    // Remove Node
    document.getElementById('dll-remove')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('dll-remove-value').value);
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        let nodes = visualizationData.nodes;
        const index = nodes.findIndex(node => node.value === value);
        if (index === -1) {
            DSLearningPlatform.showToast(`${value} not found in list`, 'warning');
            return;
        }
        // Fix prev/next of neighbors
        if (nodes[index].prev !== null) nodes[nodes[index].prev].next = nodes[index].next;
        if (nodes[index].next !== null) nodes[nodes[index].next].prev = nodes[index].prev;
        nodes.splice(index, 1);
        // Fix indices after removal
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].next = i + 1 < nodes.length ? i + 1 : null;
            nodes[i].prev = i - 1 >= 0 ? i - 1 : null;
        }
        logOperation(`Removed ${value} from list`);
        updateVisualization();
        document.getElementById('dll-remove-value').value = '';
        setStepExplanation([
            `Locate node ${value}`,
            'Relink its prev and next neighbors together',
            'Fix indices of remaining nodes'
        ]);
    });

    // Traverse Forward
    document.getElementById('dll-traverse-forward')?.addEventListener('click', () => {
        let nodes = visualizationData.nodes;
        if (nodes.length === 0) {
            DSLearningPlatform.showToast('List is empty', 'warning');
            return;
        }
        let values = [];
        let i = 0;
        while (i !== null) {
            values.push(nodes[i].value);
            i = nodes[i].next;
        }
        DSLearningPlatform.showToast('Forward: ' + values.join(' → '), 'info');
        logOperation('Traversed forward: ' + values.join(' → '));
        setStepExplanation([
            'Start from head',
            'Follow next pointers until tail',
            `Visit order: ${values.join(' → ')}`
        ]);
    });

    // Traverse Backward
    document.getElementById('dll-traverse-backward')?.addEventListener('click', () => {
        let nodes = visualizationData.nodes;
        if (nodes.length === 0) {
            DSLearningPlatform.showToast('List is empty', 'warning');
            return;
        }
        let values = [];
        let i = nodes.length - 1;
        while (i !== null && i >= 0) {
            values.push(nodes[i].value);
            i = nodes[i].prev;
        }
        DSLearningPlatform.showToast('Backward: ' + values.join(' ← '), 'info');
        logOperation('Traversed backward: ' + values.join(' ← '));
        setStepExplanation([
            'Start from tail',
            'Follow prev pointers until head',
            `Visit order: ${values.join(' ← ')}`
        ]);
    });

    // Clear All
    document.getElementById('dll-clear')?.addEventListener('click', () => {
        visualizationData.nodes = [];
        logOperation('Doubly linked list cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up array controls
 */
function setupArrayControls() {
    document.getElementById('array-add')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('array-value').value);
        const index = document.getElementById('array-index').value;
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        if (index === '' || index === null) {
            visualizationData.elements.push(value);
            logOperation(`Added ${value} to end of array`);
            setStepExplanation([
                `Append ${value} to the end`,
                'No shifting needed',
                `Array size becomes ${visualizationData.elements.length}`
            ]);
        } else {
            const idx = parseInt(index);
            if (idx >= 0 && idx <= visualizationData.elements.length) {
                visualizationData.elements.splice(idx, 0, value);
                logOperation(`Inserted ${value} at index ${idx}`);
                setStepExplanation([
                    `Insert ${value} at index ${idx}`,
                    'Shift elements right from that index by one',
                    'Place new value at target index'
                ]);
            } else {
                DSLearningPlatform.showToast('Invalid index', 'warning');
                return;
            }
        }
        
        updateVisualization();
        document.getElementById('array-value').value = '';
        document.getElementById('array-index').value = '';
    });
    
    document.getElementById('array-remove')?.addEventListener('click', () => {
        const index = parseInt(document.getElementById('array-remove-index').value);
        
        if (isNaN(index) || index < 0 || index >= visualizationData.elements.length) {
            DSLearningPlatform.showToast('Invalid index', 'warning');
            return;
        }
        
        const removed = visualizationData.elements.splice(index, 1)[0];
        logOperation(`Removed ${removed} from index ${index}`);
        updateVisualization();
        document.getElementById('array-remove-index').value = '';
        setStepExplanation([
            `Remove element at index ${index}`,
            'Shift following elements left by one to fill the gap'
        ]);
    });
    
    document.getElementById('array-search')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('array-search-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        const index = visualizationData.elements.indexOf(value);
        if (index !== -1) {
            visualizationData.highlightedIndex = index;
            logOperation(`Found ${value} at index ${index}`);
            DSLearningPlatform.showToast(`Found ${value} at index ${index}`, 'success');
            setStepExplanation([
                `Linear search for ${value}`,
                `Compare sequentially until index ${index} is found`
            ]);
        } else {
            visualizationData.highlightedIndex = -1;
            logOperation(`${value} not found in array`);
            DSLearningPlatform.showToast(`${value} not found in array`, 'info');
            setStepExplanation([
                `Linear search for ${value}`,
                'Compared all elements, no match found'
            ]);
        }
        
        updateVisualization();
        document.getElementById('array-search-value').value = '';
    });
    
    document.getElementById('array-sort')?.addEventListener('click', () => {
        visualizationData.elements.sort((a, b) => a - b);
        logOperation('Array sorted in ascending order');
        updateVisualization();
        setStepExplanation([
            'Sort array in ascending order',
            'Using built-in sort with numeric comparator'
        ]);
    });
    
    document.getElementById('array-shuffle')?.addEventListener('click', () => {
        for (let i = visualizationData.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [visualizationData.elements[i], visualizationData.elements[j]] = 
            [visualizationData.elements[j], visualizationData.elements[i]];
        }
        logOperation('Array shuffled');
        updateVisualization();
        setStepExplanation([
            'Shuffle using Fisher–Yates algorithm',
            'Swap each element with a random earlier index'
        ]);
    });
    
    document.getElementById('array-clear')?.addEventListener('click', () => {
        visualizationData.elements = [];
        visualizationData.highlightedIndex = -1;
        logOperation('Array cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up stack controls
 */
function setupStackControls() {
    document.getElementById('stack-push')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('stack-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        visualizationData.elements.push(value);
        logOperation(`Pushed ${value} onto stack`);
        updateVisualization();
        document.getElementById('stack-value').value = '';
        setStepExplanation([
            `Push ${value} onto stack`,
            'Place element at the top (end of array)'
        ]);
    });
    
    document.getElementById('stack-pop')?.addEventListener('click', () => {
        if (visualizationData.elements.length === 0) {
            DSLearningPlatform.showToast('Stack is empty', 'warning');
            logOperation('Cannot pop: stack is empty');
            return;
        }
        
        const popped = visualizationData.elements.pop();
        logOperation(`Popped ${popped} from stack`);
        updateVisualization();
        setStepExplanation([
            'Pop removes the top element',
            `Removed ${popped} from the end`
        ]);
    });
    
    document.getElementById('stack-peek')?.addEventListener('click', () => {
        if (visualizationData.elements.length === 0) {
            DSLearningPlatform.showToast('Stack is empty', 'warning');
            logOperation('Cannot peek: stack is empty');
            return;
        }
        
        const top = visualizationData.elements[visualizationData.elements.length - 1];
        DSLearningPlatform.showToast(`Top element: ${top}`, 'info');
        logOperation(`Peeked at top element: ${top}`);
        setStepExplanation(['Peek returns the top element without removing it']);
    });
    
    document.getElementById('stack-clear')?.addEventListener('click', () => {
        visualizationData.elements = [];
        logOperation('Stack cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up queue controls
 */
function setupQueueControls() {
    document.getElementById('queue-enqueue')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('queue-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        visualizationData.elements.push(value);
        visualizationData.rear = visualizationData.elements.length - 1;
        logOperation(`Enqueued ${value} to queue`);
        updateVisualization();
        document.getElementById('queue-value').value = '';
        setStepExplanation([
            `Enqueue ${value}`,
            'Insert at the rear and move rear pointer forward'
        ]);
    });
    
    document.getElementById('queue-dequeue')?.addEventListener('click', () => {
        if (visualizationData.elements.length === 0) {
            DSLearningPlatform.showToast('Queue is empty', 'warning');
            logOperation('Cannot dequeue: queue is empty');
            return;
        }
        
        const dequeued = visualizationData.elements.shift();
        visualizationData.rear = Math.max(0, visualizationData.elements.length - 1);
        logOperation(`Dequeued ${dequeued} from queue`);
        updateVisualization();
        setStepExplanation([
            'Dequeue removes from the front',
            `Removed ${dequeued} and shifted remaining items left`
        ]);
    });
    
    document.getElementById('queue-front')?.addEventListener('click', () => {
        if (visualizationData.elements.length === 0) {
            DSLearningPlatform.showToast('Queue is empty', 'warning');
            logOperation('Cannot get front: queue is empty');
            return;
        }
        
        const front = visualizationData.elements[0];
        DSLearningPlatform.showToast(`Front element: ${front}`, 'info');
        logOperation(`Front element: ${front}`);
        setStepExplanation(['Front returns the element at the head without removing it']);
    });
    
    document.getElementById('queue-rear')?.addEventListener('click', () => {
        if (visualizationData.elements.length === 0) {
            DSLearningPlatform.showToast('Queue is empty', 'warning');
            logOperation('Cannot get rear: queue is empty');
            return;
        }
        
        const rear = visualizationData.elements[visualizationData.elements.length - 1];
        DSLearningPlatform.showToast(`Rear element: ${rear}`, 'info');
        logOperation(`Rear element: ${rear}`);
        setStepExplanation(['Rear returns the element at the tail without removing it']);
    });
    
    document.getElementById('queue-clear')?.addEventListener('click', () => {
        visualizationData.elements = [];
        visualizationData.front = 0;
        visualizationData.rear = 0;
        logOperation('Queue cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up linked list controls
 */
function setupLinkedListControls() {
    document.getElementById('ll-position')?.addEventListener('change', function() {
        const indexInput = document.getElementById('ll-index');
        if (this.value === 'index') {
            indexInput.style.display = 'block';
        } else {
            indexInput.style.display = 'none';
        }
    });
    
    document.getElementById('ll-add')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('ll-value').value);
        const position = document.getElementById('ll-position').value;
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        const newNode = { value: value, next: null };
        
        if (position === 'start') {
            newNode.next = visualizationData.nodes.length > 0 ? 0 : null;
            visualizationData.nodes.unshift(newNode);
            // Update next references
            for (let i = 1; i < visualizationData.nodes.length; i++) {
                if (visualizationData.nodes[i].next !== null) {
                    visualizationData.nodes[i].next++;
                }
            }
            logOperation(`Added ${value} at start of list`);
            setStepExplanation([
                `Create node ${value}`,
                'Point new node to current head',
                'Update head to new node'
            ]);
        } else if (position === 'end') {
            if (visualizationData.nodes.length > 0) {
                visualizationData.nodes[visualizationData.nodes.length - 1].next = visualizationData.nodes.length;
            }
            visualizationData.nodes.push(newNode);
            logOperation(`Added ${value} at end of list`);
            setStepExplanation([
                `Create node ${value}`,
                'Link current tail to new node',
                'New node becomes tail'
            ]);
        } else if (position === 'index') {
            const index = parseInt(document.getElementById('ll-index').value);
            if (isNaN(index) || index < 0 || index > visualizationData.nodes.length) {
                DSLearningPlatform.showToast('Invalid index', 'warning');
                return;
            }
            visualizationData.nodes.splice(index, 0, newNode);
            // Update next references
            for (let i = 0; i < visualizationData.nodes.length - 1; i++) {
                visualizationData.nodes[i].next = i + 1;
            }
            logOperation(`Added ${value} at index ${index}`);
            setStepExplanation([
                `Insert ${value} at position ${index}`,
                'Relink next pointers to include the new node'
            ]);
        }
        
        updateVisualization();
        document.getElementById('ll-value').value = '';
        document.getElementById('ll-index').value = '';
    });
    
    document.getElementById('ll-remove')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('ll-remove-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        const index = visualizationData.nodes.findIndex(node => node.value === value);
        if (index === -1) {
            DSLearningPlatform.showToast(`${value} not found in list`, 'warning');
            return;
        }
        
        visualizationData.nodes.splice(index, 1);
        // Update next references
        for (let i = 0; i < visualizationData.nodes.length - 1; i++) {
            visualizationData.nodes[i].next = i + 1;
        }
        if (visualizationData.nodes.length > 0) {
            visualizationData.nodes[visualizationData.nodes.length - 1].next = null;
        }
        
        logOperation(`Removed ${value} from list`);
        updateVisualization();
        document.getElementById('ll-remove-value').value = '';
        setStepExplanation([
            `Find node with value ${value}`,
            'Bypass it by linking previous to next',
            'Update tail if last node was removed'
        ]);
    });
    
    document.getElementById('ll-search')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('ll-search-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        const index = visualizationData.nodes.findIndex(node => node.value === value);
        if (index !== -1) {
            DSLearningPlatform.showToast(`Found ${value} at position ${index}`, 'success');
            logOperation(`Found ${value} at position ${index}`);
            setStepExplanation([
                `Traverse from head comparing each node`,
                `Match found at position ${index}`
            ]);
        } else {
            DSLearningPlatform.showToast(`${value} not found in list`, 'info');
            logOperation(`${value} not found in list`);
            setStepExplanation([
                `Traverse from head comparing each node`,
                'No node contains the target value'
            ]);
        }
        
        document.getElementById('ll-search-value').value = '';
    });
    
    document.getElementById('ll-clear')?.addEventListener('click', () => {
        visualizationData.nodes = [];
        logOperation('Linked list cleared');
        updateVisualization();
        clearStepExplanation();
    });
}

/**
 * Set up binary tree controls (simplified)
 */
function setupBinaryTreeControls() {
    document.getElementById('tree-insert')?.addEventListener('click', () => {
        const value = parseInt(document.getElementById('tree-value').value);
        
        if (isNaN(value)) {
            DSLearningPlatform.showToast('Please enter a valid number', 'warning');
            return;
        }
        
        insertIntoBST(value);
        logOperation(`Inserted ${value} into tree`);
        updateVisualization();
        document.getElementById('tree-value').value = '';
    });
    
    document.getElementById('tree-clear')?.addEventListener('click', () => {
        visualizationData.root = null;
        logOperation('Tree cleared');
        updateVisualization();
    });
}

/**
 * Insert value into BST
 */
function insertIntoBST(value) {
    function insert(node, value) {
        if (!node) {
            return { value: value, left: null, right: null };
        }
        
        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        }
        
        return node;
    }
    
    visualizationData.root = insert(visualizationData.root, value);
}

/**
 * Update visualization
 */
function updateVisualization() {
    const svg = d3.select('#visualization-container svg');
    renderVisualization(currentVisualization, svg);
}

/**
 * Log operation
 */
function logOperation(message) {
    const logContainer = document.getElementById('operations-log');
    const timestamp = new Date().toLocaleTimeString();
    
    const entry = document.createElement('div');
    entry.className = 'operation-entry';
    entry.innerHTML = `<small class="text-muted">${timestamp}</small><br>${message}`;
    
    logContainer.insertBefore(entry, logContainer.firstChild);
    
    // Keep only last 10 operations
    while (logContainer.children.length > 10) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

/**
 * Animation control functions
 */
function playAnimation() {
    isAnimating = true;
    DSLearningPlatform.showToast('Animation playing', 'info');
}

function pauseAnimation() {
    isAnimating = false;
    DSLearningPlatform.showToast('Animation paused', 'info');
}

function resetVisualization() {
    visualizationData = getInitialData(currentVisualization);
    updateVisualization();
    
    // Clear operations log
    const logContainer = document.getElementById('operations-log');
    logContainer.innerHTML = '<div class="text-muted small">No operations yet</div>';
    
    DSLearningPlatform.showToast('Visualization reset', 'info');
}
