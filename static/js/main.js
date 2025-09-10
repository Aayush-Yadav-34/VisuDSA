// Main JavaScript file for the Interactive Data Structures Learning Platform

// Global variables
let progressData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserProgress();
    setupGlobalEventListeners();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Data Structures Learning Platform...');
    
    // Set up navigation highlighting
    highlightCurrentNavItem();
    
    // Initialize tooltips and popovers
    initializeBootstrapComponents();
    
    // Set up global keyboard shortcuts
    setupKeyboardShortcuts();
}

/**
 * Highlight the current navigation item
 */
function highlightCurrentNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.startsWith(href) && href !== '/') {
            link.classList.add('active');
        } else if (href === '/' && currentPath === '/') {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize Bootstrap components
 */
function initializeBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Set up global keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run code (if code editor is present)
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const runButton = document.getElementById('run-code');
            if (runButton) {
                e.preventDefault();
                runButton.click();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            });
        }
    });
}

/**
 * Set up global event listeners
 */
function setupGlobalEventListeners() {
    // Handle example code loading
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('load-example')) {
            e.preventDefault();
            loadCodeExample(e.target);
        }
    });
    
    // Handle responsive navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }
}

/**
 * Load user progress and update UI
 */
function loadUserProgress() {
    fetch('/progress')
        .then(response => response.json())
        .then(data => {
            progressData = data;
            updateProgressIndicator();
        })
        .catch(error => {
            console.error('Error loading progress:', error);
        });
}

/**
 * Update the progress indicator in the navbar
 */
function updateProgressIndicator() {
    const progressElement = document.getElementById('progress-percentage');
    if (!progressElement) return;
    
    let totalSections = 0;
    let completedSections = 0;
    
    Object.values(progressData).forEach(module => {
        Object.values(module).forEach(section => {
            totalSections++;
            if (section.completed) {
                completedSections++;
            }
        });
    });
    
    const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
    progressElement.textContent = `${percentage}%`;
    
    // Update color based on progress
    const progressIndicator = document.getElementById('progress-indicator');
    if (progressIndicator) {
        progressIndicator.className = 'navbar-text';
        if (percentage >= 75) {
            progressIndicator.classList.add('text-success');
        } else if (percentage >= 50) {
            progressIndicator.classList.add('text-warning');
        } else {
            progressIndicator.classList.add('text-info');
        }
    }
}

/**
 * Load a code example into the editor
 */
function loadCodeExample(button) {
    const language = button.getAttribute('data-language');
    const code = button.getAttribute('data-code');
    
    // Check if CodeMirror editor exists
    if (window.codeEditor) {
        window.codeEditor.setValue(code);
        
        // Update language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = language;
            updateEditorMode(language);
        }
        
        // Show success feedback
        showToast('Code example loaded successfully!', 'success');
    } else {
        console.warn('Code editor not found');
    }
}

/**
 * Update CodeMirror editor mode based on language
 */
function updateEditorMode(language) {
    if (!window.codeEditor) return;
    
    const modeMap = {
        'python': 'python',
        'javascript': 'javascript'
    };
    
    const mode = modeMap[language] || 'text';
    window.codeEditor.setOption('mode', mode);
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast, { delay: duration });
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

/**
 * Show loading state
 */
function showLoading(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    if (!element) return;
    
    element.innerHTML = `
        <div class="text-center py-3">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading...</p>
        </div>
    `;
}

/**
 * Hide loading state
 */
function hideLoading(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    if (!element) return;
    
    // This function should be called with replacement content
    // It's a placeholder for more specific implementations
}

/**
 * Format execution time for display
 */
function formatExecutionTime(seconds) {
    if (seconds < 0.001) {
        return '< 1ms';
    } else if (seconds < 1) {
        return `${Math.round(seconds * 1000)}ms`;
    } else {
        return `${seconds.toFixed(2)}s`;
    }
}

/**
 * Validate form data
 */
function validateForm(formElement) {
    if (!formElement) return false;
    
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

/**
 * Sanitize HTML content
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy to clipboard', 'danger');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy to clipboard', 'danger');
        } finally {
            textArea.remove();
        }
    }
}

// Export functions for use in other modules
window.DSLearningPlatform = {
    showToast,
    showLoading,
    hideLoading,
    formatExecutionTime,
    validateForm,
    sanitizeHTML,
    debounce,
    throttle,
    copyToClipboard,
    loadUserProgress,
    updateProgressIndicator
};
