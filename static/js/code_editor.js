// Code Editor functionality for the Data Structures Learning Platform

// Global variables
let codeEditor;
let isExecuting = false;

// Initialize code editor when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCodeEditor();
    setupCodeEditorEventListeners();
});

/**
 * Initialize CodeMirror editor
 */
function initializeCodeEditor() {
    const editorTextarea = document.getElementById('code-editor');
    if (!editorTextarea) return;
    
    codeEditor = CodeMirror.fromTextArea(editorTextarea, {
        mode: 'python',
        theme: 'material-darker',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        indentWithTabs: false,
        extraKeys: {
            'Ctrl-Enter': runCode,
            'Cmd-Enter': runCode,
            'Tab': function(cm) {
                if (cm.somethingSelected()) {
                    cm.indentSelection('add');
                } else {
                    cm.replaceSelection('    ');
                }
            }
        },
        placeholder: 'Write your code here...'
    });
    
    // Set default code
    codeEditor.setValue(`# Welcome to the Data Structures Code Editor!
# Write your Python code here and click "Run Code" to execute it.

# Example: Creating and using a simple list
my_list = [1, 2, 3, 4, 5]
print("Original list:", my_list)

# Add an element
my_list.append(6)
print("After appending 6:", my_list)

# Remove an element
my_list.remove(3)
print("After removing 3:", my_list)

# Find an element
if 4 in my_list:
    print("Found 4 in the list at index:", my_list.index(4))
`);
    
    // Make editor globally accessible
    window.codeEditor = codeEditor;
    
    // Auto-resize editor
    codeEditor.setSize(null, 400);
}

/**
 * Set up event listeners for code editor
 */
function setupCodeEditorEventListeners() {
    // Run code button
    const runButton = document.getElementById('run-code');
    if (runButton) {
        runButton.addEventListener('click', runCode);
    }
    
    // Clear code button
    const clearButton = document.getElementById('clear-code');
    if (clearButton) {
        clearButton.addEventListener('click', clearCode);
    }
    
    // Language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            updateEditorMode(this.value);
            updateDefaultCode(this.value);
        });
    }
    
    // Load example buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('load-example')) {
            e.preventDefault();
            loadCodeExample(e.target);
        }
    });
}

/**
 * Execute the code in the editor
 */
function runCode() {
    if (isExecuting) {
        DSLearningPlatform.showToast('Code is already executing...', 'warning');
        return;
    }
    
    if (!codeEditor) {
        DSLearningPlatform.showToast('Code editor not initialized', 'danger');
        return;
    }
    
    const code = codeEditor.getValue();
    const language = document.getElementById('language-select')?.value || 'python';
    
    if (!code.trim()) {
        DSLearningPlatform.showToast('Please enter some code to execute', 'warning');
        return;
    }
    
    isExecuting = true;
    
    // Update UI to show execution state
    const runButton = document.getElementById('run-code');
    const originalText = runButton.innerHTML;
    runButton.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Running...';
    runButton.disabled = true;
    
    // Show loading in output
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = `
        <div class="text-info">
            <i class="fas fa-cog fa-spin me-2"></i>
            Executing code...
        </div>
    `;
    
    // Send code to backend for execution
    fetch('/execute-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: code,
            language: language
        })
    })
    .then(response => response.json())
    .then(data => {
        displayExecutionResult(data);
    })
    .catch(error => {
        console.error('Error executing code:', error);
        displayExecutionResult({
            success: false,
            error: 'Network error: Failed to execute code'
        });
    })
    .finally(() => {
        // Restore button state
        isExecuting = false;
        runButton.innerHTML = originalText;
        runButton.disabled = false;
    });
}

/**
 * Display code execution results
 */
function displayExecutionResult(result) {
    const outputContainer = document.getElementById('output-container');
    
    if (result.success) {
        const output = result.output || '(no output)';
        const executionTime = result.execution_time ? 
            `\n\n--- Execution completed in ${DSLearningPlatform.formatExecutionTime(result.execution_time)} ---` : '';
        
        outputContainer.innerHTML = `
            <div class="output-success">
                <i class="fas fa-check-circle me-2"></i>
                Execution successful:
            </div>
            <hr>
            <pre>${DSLearningPlatform.sanitizeHTML(output)}${executionTime}</pre>
        `;
        
        DSLearningPlatform.showToast('Code executed successfully!', 'success');
    } else {
        const error = result.error || 'Unknown error occurred';
        
        outputContainer.innerHTML = `
            <div class="output-error">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Execution failed:
            </div>
            <hr>
            <pre>${DSLearningPlatform.sanitizeHTML(error)}</pre>
        `;
        
        DSLearningPlatform.showToast('Code execution failed', 'danger');
    }
    
    // Add copy button to output
    addCopyButton(outputContainer);
}

/**
 * Add copy button to output container
 */
function addCopyButton(container) {
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-outline-secondary btn-sm position-absolute top-0 end-0 m-2';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy output';
    copyButton.onclick = function() {
        const text = container.querySelector('pre')?.textContent || container.textContent;
        DSLearningPlatform.copyToClipboard(text);
    };
    
    container.style.position = 'relative';
    container.appendChild(copyButton);
}

/**
 * Clear the code editor
 */
function clearCode() {
    if (!codeEditor) return;
    
    // Confirm before clearing if there's substantial code
    const currentCode = codeEditor.getValue();
    if (currentCode.trim().length > 50) {
        if (!confirm('Are you sure you want to clear all code?')) {
            return;
        }
    }
    
    const language = document.getElementById('language-select')?.value || 'python';
    updateDefaultCode(language);
    
    // Clear output
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = `
        <div class="text-muted">
            <i class="fas fa-info-circle me-2"></i>
            Write your code and click "Run Code" to see the output here.
        </div>
    `;
    
    DSLearningPlatform.showToast('Code editor cleared', 'info');
}

/**
 * Update editor mode based on selected language
 */
function updateEditorMode(language) {
    if (!codeEditor) return;
    
    const modeMap = {
        'python': 'python',
        'javascript': 'javascript'
    };
    
    const mode = modeMap[language] || 'text';
    codeEditor.setOption('mode', mode);
}

/**
 * Update default code based on language
 */
function updateDefaultCode(language) {
    if (!codeEditor) return;
    
    const defaultCodes = {
        'python': `# Welcome to the Data Structures Code Editor!
# Write your Python code here and click "Run Code" to execute it.

# Example: Creating and using a simple list
my_list = [1, 2, 3, 4, 5]
print("Original list:", my_list)

# Add an element
my_list.append(6)
print("After appending 6:", my_list)

# Remove an element
my_list.remove(3)
print("After removing 3:", my_list)

# Find an element
if 4 in my_list:
    print("Found 4 in the list at index:", my_list.index(4))
`,
        'javascript': `// Welcome to the Data Structures Code Editor!
// Write your JavaScript code here and click "Run Code" to execute it.

// Example: Creating and using a simple array
let myArray = [1, 2, 3, 4, 5];
console.log("Original array:", myArray);

// Add an element
myArray.push(6);
console.log("After pushing 6:", myArray);

// Remove an element
let index = myArray.indexOf(3);
if (index > -1) {
    myArray.splice(index, 1);
}
console.log("After removing 3:", myArray);

// Find an element
if (myArray.includes(4)) {
    console.log("Found 4 in the array at index:", myArray.indexOf(4));
}
`
    };
    
    const defaultCode = defaultCodes[language] || defaultCodes['python'];
    codeEditor.setValue(defaultCode);
}

/**
 * Load a code example
 */
function loadCodeExample(button) {
    const language = button.getAttribute('data-language');
    const code = button.getAttribute('data-code');
    
    if (!codeEditor) {
        DSLearningPlatform.showToast('Code editor not initialized', 'danger');
        return;
    }
    
    // Confirm before loading if there's existing code
    const currentCode = codeEditor.getValue();
    if (currentCode.trim().length > 0 && currentCode !== getDefaultCode(language)) {
        if (!confirm('This will replace your current code. Continue?')) {
            return;
        }
    }
    
    codeEditor.setValue(code);
    
    // Update language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect && language) {
        languageSelect.value = language;
        updateEditorMode(language);
    }
    
    // Clear output
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = `
        <div class="text-info">
            <i class="fas fa-code me-2"></i>
            Example code loaded. Click "Run Code" to execute it.
        </div>
    `;
    
    DSLearningPlatform.showToast('Code example loaded successfully!', 'success');
}

/**
 * Get default code for a language
 */
function getDefaultCode(language) {
    const defaultCodes = {
        'python': `# Welcome to the Data Structures Code Editor!
# Write your Python code here and click "Run Code" to execute it.

# Example: Creating and using a simple list
my_list = [1, 2, 3, 4, 5]
print("Original list:", my_list)

# Add an element
my_list.append(6)
print("After appending 6:", my_list)

# Remove an element
my_list.remove(3)
print("After removing 3:", my_list)

# Find an element
if 4 in my_list:
    print("Found 4 in the list at index:", my_list.index(4))
`,
        'javascript': `// Welcome to the Data Structures Code Editor!
// Write your JavaScript code here and click "Run Code" to execute it.

// Example: Creating and using a simple array
let myArray = [1, 2, 3, 4, 5];
console.log("Original array:", myArray);

// Add an element
myArray.push(6);
console.log("After pushing 6:", myArray);

// Remove an element
let index = myArray.indexOf(3);
if (index > -1) {
    myArray.splice(index, 1);
}
console.log("After removing 3:", myArray);

// Find an element
if (myArray.includes(4)) {
    console.log("Found 4 in the array at index:", myArray.indexOf(4));
}
`
    };
    
    return defaultCodes[language] || defaultCodes['python'];
}

// Auto-save code to localStorage
if (typeof(Storage) !== "undefined") {
    setInterval(function() {
        if (codeEditor) {
            const code = codeEditor.getValue();
            const language = document.getElementById('language-select')?.value || 'python';
            
            localStorage.setItem('ds_platform_code', code);
            localStorage.setItem('ds_platform_language', language);
        }
    }, 10000); // Auto-save every 10 seconds
    
    // Load saved code on page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            const savedCode = localStorage.getItem('ds_platform_code');
            const savedLanguage = localStorage.getItem('ds_platform_language');
            
            if (savedCode && codeEditor && savedCode.length > 100) {
                if (confirm('Restore your previously saved code?')) {
                    codeEditor.setValue(savedCode);
                    
                    if (savedLanguage) {
                        const languageSelect = document.getElementById('language-select');
                        if (languageSelect) {
                            languageSelect.value = savedLanguage;
                            updateEditorMode(savedLanguage);
                        }
                    }
                }
            }
        }, 1000);
    });
}
