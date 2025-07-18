// Quiz functionality for the Data Structures Learning Platform

// Global variables
let currentQuiz = null;
let quizResults = null;
let userAnswers = {};

/**
 * Initialize quiz functionality
 */
function initializeQuiz(quizId) {
    currentQuiz = quizId;
    setupQuizEventListeners();
    
    // Load any saved progress for this quiz
    loadSavedAnswers();
}

/**
 * Set up quiz event listeners
 */
function setupQuizEventListeners() {
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', handleQuizSubmission);
        
        // Auto-save answers as user types/selects
        quizForm.addEventListener('change', saveAnswerProgress);
        quizForm.addEventListener('input', debounce(saveAnswerProgress, 1000));
    }
    
    // Set up question navigation if quiz is long
    setupQuestionNavigation();
}

/**
 * Handle quiz form submission
 */
function handleQuizSubmission(event) {
    event.preventDefault();
    
    if (!currentQuiz) {
        DSLearningPlatform.showToast('Quiz not initialized', 'danger');
        return;
    }
    
    // Collect all answers
    userAnswers = collectAnswers();
    
    // Validate that all questions are answered
    if (!validateQuizCompletion()) {
        DSLearningPlatform.showToast('Please answer all questions before submitting', 'warning');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    submitButton.disabled = true;
    
    // Submit quiz
    submitQuiz(userAnswers)
        .then(results => {
            quizResults = results;
            displayQuizResults(results);
            clearSavedAnswers(); // Clear saved progress on successful submission
        })
        .catch(error => {
            console.error('Quiz submission error:', error);
            DSLearningPlatform.showToast('Failed to submit quiz. Please try again.', 'danger');
        })
        .finally(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
}

/**
 * Collect answers from form
 */
function collectAnswers() {
    const answers = {};
    const form = document.getElementById('quiz-form');
    
    // Get all form inputs
    const inputs = form.querySelectorAll('input[type="radio"]:checked, textarea, input[type="text"]');
    
    inputs.forEach(input => {
        const questionId = input.name.replace('question_', '');
        answers[questionId] = input.value.trim();
    });
    
    return answers;
}

/**
 * Validate quiz completion
 */
function validateQuizCompletion() {
    const form = document.getElementById('quiz-form');
    const questionContainers = form.querySelectorAll('.question-container');
    
    for (let container of questionContainers) {
        const questionId = getQuestionIdFromContainer(container);
        
        // Check if question is answered
        const radios = container.querySelectorAll('input[type="radio"]');
        const textareas = container.querySelectorAll('textarea');
        const textInputs = container.querySelectorAll('input[type="text"]');
        
        let isAnswered = false;
        
        if (radios.length > 0) {
            isAnswered = Array.from(radios).some(radio => radio.checked);
        } else if (textareas.length > 0) {
            isAnswered = Array.from(textareas).some(textarea => textarea.value.trim().length > 0);
        } else if (textInputs.length > 0) {
            isAnswered = Array.from(textInputs).some(input => input.value.trim().length > 0);
        }
        
        if (!isAnswered) {
            // Highlight unanswered question
            container.style.border = '2px solid #dc3545';
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        } else {
            container.style.border = '';
        }
    }
    
    return true;
}

/**
 * Get question ID from container
 */
function getQuestionIdFromContainer(container) {
    const input = container.querySelector('input, textarea');
    if (input && input.name) {
        return input.name.replace('question_', '');
    }
    return null;
}

/**
 * Submit quiz to server
 */
function submitQuiz(answers) {
    return fetch('/submit-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quiz_id: currentQuiz,
            answers: answers
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            throw new Error(data.error || 'Quiz submission failed');
        }
        return data;
    });
}

/**
 * Display quiz results
 */
function displayQuizResults(results) {
    const resultsSection = document.getElementById('quiz-results');
    const resultsContent = document.getElementById('results-content');
    
    if (!resultsSection || !resultsContent) {
        console.error('Results containers not found');
        return;
    }
    
    // Calculate performance level
    const performance = getPerformanceLevel(results.score);
    
    // Build results HTML
    let html = `
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card text-center">
                    <div class="card-body">
                        <h2 class="display-4 ${performance.colorClass}">${results.score}%</h2>
                        <h5 class="card-title">Your Score</h5>
                        <p class="text-muted">${results.correct_answers} out of ${results.total_questions} correct</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas ${performance.icon} fa-3x ${performance.colorClass} mb-3"></i>
                        <h5 class="card-title">${performance.title}</h5>
                        <p class="card-text">${performance.message}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">
                    <i class="fas fa-list-check me-2"></i>
                    Detailed Results
                </h5>
            </div>
            <div class="card-body">
    `;
    
    // Add detailed results for each question
    Object.entries(results.results).forEach(([questionId, result]) => {
        const isCorrect = result.correct;
        const iconClass = isCorrect ? 'fa-check-circle text-success' : 'fa-times-circle text-danger';
        const containerClass = isCorrect ? 'result-correct' : 'result-incorrect';
        
        html += `
            <div class="${containerClass} rounded mb-3">
                <div class="d-flex align-items-start">
                    <div class="me-3 mt-1">
                        <i class="fas ${iconClass} fa-lg"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-2">Question ${questionId}</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <strong>Your Answer:</strong> ${result.user_answer || 'No answer provided'}
                            </div>
                            <div class="col-md-6">
                                <strong>Correct Answer:</strong> ${result.correct_answer}
                            </div>
                        </div>
                        ${result.explanation ? `
                            <div class="mt-2">
                                <strong>Explanation:</strong> ${result.explanation}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-primary me-2" onclick="retakeQuiz()">
                <i class="fas fa-redo me-1"></i>
                Retake Quiz
            </button>
            <a href="/quiz" class="btn btn-secondary">
                <i class="fas fa-list me-1"></i>
                Other Quizzes
            </a>
        </div>
    `;
    
    resultsContent.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Update progress
    DSLearningPlatform.loadUserProgress();
    
    // Show celebration for good scores
    if (results.score >= 80) {
        setTimeout(() => {
            showCelebration();
        }, 1000);
    }
}

/**
 * Get performance level based on score
 */
function getPerformanceLevel(score) {
    if (score >= 90) {
        return {
            title: 'Excellent!',
            message: 'Outstanding performance! You have a strong understanding of the material.',
            icon: 'fa-trophy',
            colorClass: 'text-warning'
        };
    } else if (score >= 80) {
        return {
            title: 'Very Good!',
            message: 'Great job! You demonstrate good knowledge of the concepts.',
            icon: 'fa-medal',
            colorClass: 'text-success'
        };
    } else if (score >= 70) {
        return {
            title: 'Good',
            message: 'Nice work! Consider reviewing the areas you missed.',
            icon: 'fa-thumbs-up',
            colorClass: 'text-primary'
        };
    } else if (score >= 60) {
        return {
            title: 'Fair',
            message: 'You\'re on the right track. Review the material and try again.',
            icon: 'fa-hand-paper',
            colorClass: 'text-warning'
        };
    } else {
        return {
            title: 'Needs Improvement',
            message: 'Don\'t give up! Review the theory section and practice more.',
            icon: 'fa-book',
            colorClass: 'text-danger'
        };
    }
}

/**
 * Show celebration animation for high scores
 */
function showCelebration() {
    // Create confetti effect
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }
}

/**
 * Create a confetti piece
 */
function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '-10px';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.opacity = '0.8';
    
    document.body.appendChild(confetti);
    
    // Animate the confetti
    const animation = confetti.animate([
        { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: 0.8
        },
        { 
            transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

/**
 * Retake quiz function
 */
function retakeQuiz() {
    if (confirm('Are you sure you want to retake this quiz? Your current answers will be cleared.')) {
        // Clear form
        const form = document.getElementById('quiz-form');
        if (form) {
            form.reset();
        }
        
        // Hide results
        const resultsSection = document.getElementById('quiz-results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Clear saved answers
        clearSavedAnswers();
        
        // Reset variables
        userAnswers = {};
        quizResults = null;
        
        // Scroll to top of quiz
        form.scrollIntoView({ behavior: 'smooth' });
        
        DSLearningPlatform.showToast('Quiz reset. You can start over now.', 'info');
    }
}

/**
 * Save answer progress to localStorage
 */
function saveAnswerProgress() {
    if (!currentQuiz) return;
    
    const answers = collectAnswers();
    const key = `quiz_progress_${currentQuiz}`;
    
    try {
        localStorage.setItem(key, JSON.stringify({
            answers: answers,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Could not save quiz progress:', e);
    }
}

/**
 * Load saved answers from localStorage
 */
function loadSavedAnswers() {
    if (!currentQuiz) return;
    
    const key = `quiz_progress_${currentQuiz}`;
    
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            const data = JSON.parse(saved);
            
            // Check if saved data is not too old (1 hour)
            if (Date.now() - data.timestamp < 3600000) {
                populateAnswers(data.answers);
                DSLearningPlatform.showToast('Previous answers restored', 'info');
            }
        }
    } catch (e) {
        console.warn('Could not load saved quiz progress:', e);
    }
}

/**
 * Populate form with saved answers
 */
function populateAnswers(answers) {
    Object.entries(answers).forEach(([questionId, answer]) => {
        const questionName = `question_${questionId}`;
        
        // Try radio buttons first
        const radio = document.querySelector(`input[name="${questionName}"][value="${answer}"]`);
        if (radio) {
            radio.checked = true;
            return;
        }
        
        // Try textarea
        const textarea = document.querySelector(`textarea[name="${questionName}"]`);
        if (textarea) {
            textarea.value = answer;
            return;
        }
        
        // Try text input
        const textInput = document.querySelector(`input[type="text"][name="${questionName}"]`);
        if (textInput) {
            textInput.value = answer;
        }
    });
}

/**
 * Clear saved answers from localStorage
 */
function clearSavedAnswers() {
    if (!currentQuiz) return;
    
    const key = `quiz_progress_${currentQuiz}`;
    
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn('Could not clear saved quiz progress:', e);
    }
}

/**
 * Set up question navigation for long quizzes
 */
function setupQuestionNavigation() {
    const questionContainers = document.querySelectorAll('.question-container');
    
    if (questionContainers.length <= 5) {
        return; // No need for navigation with few questions
    }
    
    // Create navigation
    const nav = document.createElement('div');
    nav.className = 'quiz-navigation sticky-top bg-body p-3 border-bottom mb-4';
    nav.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Question Navigation</h6>
            <div class="btn-group" role="group">
                ${Array.from(questionContainers).map((_, index) => 
                    `<button type="button" class="btn btn-outline-primary btn-sm" data-question="${index + 1}">
                        ${index + 1}
                    </button>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Insert navigation before the form
    const form = document.getElementById('quiz-form');
    form.parentNode.insertBefore(nav, form);
    
    // Add click handlers
    nav.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-question')) {
            const questionNumber = parseInt(e.target.getAttribute('data-question'));
            const targetQuestion = questionContainers[questionNumber - 1];
            
            if (targetQuestion) {
                targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update navigation state
                nav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        }
    });
    
    // Update navigation based on scroll position
    let ticking = false;
    
    function updateNavigation() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        questionContainers.forEach((container, index) => {
            const rect = container.getBoundingClientRect();
            const isVisible = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;
            
            if (isVisible) {
                nav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                const navButton = nav.querySelector(`button[data-question="${index + 1}"]`);
                if (navButton) {
                    navButton.classList.add('active');
                }
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * Debounce function for performance
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

// Export functions for global use
window.QuizPlatform = {
    retakeQuiz,
    showCelebration
};
