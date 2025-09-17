from flask import render_template, request, jsonify, session, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from app import app, db
from models import User, UserProgress, QuizAttempt, CodeSubmission
from code_executor import execute_code
from data.theory_content import THEORY_CONTENT
from data.quiz_data import QUIZ_DATA
import uuid
import logging
from datetime import datetime

@app.before_request
def before_request():
    """Initialize session if needed"""
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())

# Authentication routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    """User login"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            if user.is_blocked:
                flash('Your account has been blocked. Please contact an administrator.', 'danger')
                return render_template('login.html')
            
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            flash(f'Welcome back, {user.username}!', 'success')
            next_page = request.args.get('next')
            if user.is_admin:
                return redirect(next_page) if next_page else redirect(url_for('admin_dashboard'))
            else:
                return redirect(next_page) if next_page else redirect(url_for('index'))
        else:
            flash('Invalid username or password', 'danger')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """User registration"""
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists', 'warning')
            return render_template('register.html')
        
        if User.query.filter_by(email=email).first():
            flash('Email already exists', 'warning')
            return render_template('register.html')
        
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        login_user(user)
        flash('Registration successful. Welcome!', 'success')
        return redirect(url_for('index'))
    
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    """User logout"""
    logout_user()
    flash('You have been logged out', 'info')
    return redirect(url_for('index'))

@app.route('/admin')
@login_required
def admin_dashboard():
    """Admin dashboard"""
    if not current_user.is_admin:
        flash('Access denied: Admin privileges required', 'danger')
        return redirect(url_for('index'))
    
    # Get statistics
    total_users = User.query.count()
    total_submissions = CodeSubmission.query.count()
    total_quiz_attempts = QuizAttempt.query.count()
    
    # Recent activity
    recent_users = User.query.order_by(User.created_at.desc()).limit(10).all()
    recent_submissions = CodeSubmission.query.order_by(CodeSubmission.timestamp.desc()).limit(10).all()
    
    return render_template('admin_dashboard.html',
                         total_users=total_users,
                         total_submissions=total_submissions,
                         total_quiz_attempts=total_quiz_attempts,
                         recent_users=recent_users,
                         recent_submissions=recent_submissions)

@app.route('/admin/users')
@login_required
def admin_users():
    """Admin user management page"""
    if not current_user.is_admin:
        flash('Access denied: Admin privileges required', 'danger')
        return redirect(url_for('index'))
    
    page = request.args.get('page', 1, type=int)
    per_page = 20
    
    users = User.query.order_by(User.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return render_template('admin_users.html', users=users)

@app.route('/admin/block-user/<int:user_id>', methods=['POST'])
@login_required
def block_user(user_id):
    """Block a user"""
    if not current_user.is_admin:
        return jsonify({'success': False, 'error': 'Access denied'})
    
    user = User.query.get_or_404(user_id)
    if user.is_admin:
        return jsonify({'success': False, 'error': 'Cannot block admin users'})
    
    reason = request.json.get('reason', 'No reason provided')
    user.block_user(reason)
    db.session.commit()
    
    return jsonify({'success': True, 'message': f'User {user.username} has been blocked'})

@app.route('/admin/unblock-user/<int:user_id>', methods=['POST'])
@login_required
def unblock_user(user_id):
    """Unblock a user"""
    if not current_user.is_admin:
        return jsonify({'success': False, 'error': 'Access denied'})
    
    user = User.query.get_or_404(user_id)
    user.unblock_user()
    db.session.commit()
    
    return jsonify({'success': True, 'message': f'User {user.username} has been unblocked'})

@app.route('/admin/delete-user/<int:user_id>', methods=['POST'])
@login_required
def delete_user(user_id):
    """Delete a user"""
    if not current_user.is_admin:
        return jsonify({'success': False, 'error': 'Access denied'})
    
    user = User.query.get_or_404(user_id)
    if user.is_admin:
        return jsonify({'success': False, 'error': 'Cannot delete admin users'})
    
    username = user.username
    
    # Delete related records
    UserProgress.query.filter_by(user_id=user_id).delete()
    QuizAttempt.query.filter_by(user_id=user_id).delete()
    CodeSubmission.query.filter_by(user_id=user_id).delete()
    
    # Delete the user
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': f'User {username} has been deleted'})

@app.route('/profile')
@login_required
def user_profile():
    """User profile page"""
    # Get user statistics
    progress_count = UserProgress.query.filter_by(user_id=current_user.id).count()
    quiz_attempts = QuizAttempt.query.filter_by(user_id=current_user.id).count()
    code_submissions = CodeSubmission.query.filter_by(user_id=current_user.id).count()
    
    # Get recent activity
    recent_progress = UserProgress.query.filter_by(user_id=current_user.id).order_by(UserProgress.timestamp.desc()).limit(5).all()
    recent_submissions = CodeSubmission.query.filter_by(user_id=current_user.id).order_by(CodeSubmission.timestamp.desc()).limit(5).all()
    
    return render_template('user_profile.html',
                         progress_count=progress_count,
                         quiz_attempts=quiz_attempts,
                         code_submissions=code_submissions,
                         recent_progress=recent_progress,
                         recent_submissions=recent_submissions)

@app.route('/delete-account', methods=['POST'])
@login_required
def delete_account():
    """Delete current user's account"""
    user_id = current_user.id
    username = current_user.username
    
    # Delete related records
    UserProgress.query.filter_by(user_id=user_id).delete()
    QuizAttempt.query.filter_by(user_id=user_id).delete()
    CodeSubmission.query.filter_by(user_id=user_id).delete()
    
    # Logout user first
    logout_user()
    
    # Delete the user
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    
    flash('Your account has been successfully deleted.', 'success')
    return redirect(url_for('index'))

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html')

@app.route('/theory')
@app.route('/theory/<data_structure>')
def theory(data_structure=None):
    """Theory section with data structure explanations"""
    if data_structure and data_structure in THEORY_CONTENT:
        content = THEORY_CONTENT[data_structure]
        
        # Mark as viewed
        if current_user.is_authenticated:
            progress = UserProgress.query.filter_by(
                user_id=current_user.id,
                module_name='theory',
                section_name=data_structure
            ).first()
            
            if not progress:
                progress = UserProgress(
                    user_id=current_user.id,
                    module_name='theory',
                    section_name=data_structure,
                    completed=True
                )
                db.session.add(progress)
                db.session.commit()
        else:
            # For anonymous users
            progress = UserProgress.query.filter_by(
                session_id=session['session_id'],
                module_name='theory',
                section_name=data_structure
            ).first()
            
            if not progress:
                progress = UserProgress(
                    session_id=session['session_id'],
                    module_name='theory',
                    section_name=data_structure,
                    completed=True
                )
                db.session.add(progress)
                db.session.commit()
        
        return render_template('theory.html', 
                             content=content, 
                             data_structure=data_structure,
                             theory_sections=list(THEORY_CONTENT.keys()))
    
    return render_template('theory.html', 
                         theory_sections=list(THEORY_CONTENT.keys()))

@app.route('/code-editor')
def code_editor():
    """Live code editor with execution capability"""
    return render_template('code_editor.html')

@app.route('/execute-code', methods=['POST'])
def execute_code_route():
    """Execute submitted code and return results"""
    try:
        data = request.json
        language = data.get('language', 'python')
        code = data.get('code', '')
        
        if not code.strip():
            return jsonify({
                'success': False,
                'error': 'No code provided'
            })
        
        result = execute_code(code, language)
        
        # Store submission
        if current_user.is_authenticated:
            submission = CodeSubmission(
                user_id=current_user.id,
                language=language,
                code=code,
                output=result.get('output', ''),
                error=result.get('error', ''),
                execution_time=result.get('execution_time', 0)
            )
        else:
            submission = CodeSubmission(
                session_id=session['session_id'],
                language=language,
                code=code,
                output=result.get('output', ''),
                error=result.get('error', ''),
                execution_time=result.get('execution_time', 0)
            )
        db.session.add(submission)
        db.session.commit()
        
        return jsonify({
            'success': result['success'],
            'output': result.get('output', ''),
            'error': result.get('error', ''),
            'execution_time': result.get('execution_time', 0)
        })
        
    except Exception as e:
        logging.error(f"Code execution error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        })

@app.route('/visualizer')
@app.route('/visualizer/<data_structure>')
def visualizer(data_structure=None):
    """Visual simulators for data structures"""
    supported_structures = ['array', 'linked_list', 'doubly_linked_list', 'stack', 'queue', 'priority_queue', 'binary_tree', 'hash_table', 'dfs_bfs']
    
    if data_structure and data_structure not in supported_structures:
        data_structure = None
    
    return render_template('visualizer.html', 
                         data_structure=data_structure,
                         supported_structures=supported_structures)

@app.route('/quiz')
@app.route('/quiz/<quiz_id>')
def quiz(quiz_id=None):
    """Interactive quiz system"""
    if quiz_id and quiz_id in QUIZ_DATA:
        quiz_content = QUIZ_DATA[quiz_id]
        return render_template('quiz.html', 
                             quiz=quiz_content, 
                             quiz_id=quiz_id,
                             available_quizzes=list(QUIZ_DATA.keys()))
    
    return render_template('quiz.html', 
                         available_quizzes=list(QUIZ_DATA.keys()))

@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    """Submit quiz answers and calculate score"""
    try:
        data = request.json
        quiz_id = data.get('quiz_id')
        answers = data.get('answers', {})
        
        if quiz_id not in QUIZ_DATA:
            return jsonify({'success': False, 'error': 'Invalid quiz'})
        
        quiz = QUIZ_DATA[quiz_id]
        total_questions = len(quiz['questions'])
        correct_answers = 0
        results = {}
        
        for question_id, user_answer in answers.items():
            question = next((q for q in quiz['questions'] if q['id'] == question_id), None)
            if not question:
                continue
            
            is_correct = user_answer == question['correct_answer']
            if is_correct:
                correct_answers += 1
            
            results[question_id] = {
                'correct': is_correct,
                'user_answer': user_answer,
                'correct_answer': question['correct_answer'],
                'explanation': question.get('explanation', '')
            }
            
            # Store attempt
            if current_user.is_authenticated:
                attempt = QuizAttempt(
                    user_id=current_user.id,
                    quiz_id=quiz_id,
                    question_id=question_id,
                    user_answer=user_answer,
                    correct=is_correct
                )
            else:
                attempt = QuizAttempt(
                    session_id=session['session_id'],
                    quiz_id=quiz_id,
                    question_id=question_id,
                    user_answer=user_answer,
                    correct=is_correct
                )
            db.session.add(attempt)
        
        score = int((correct_answers / total_questions) * 100)
        
        # Update progress
        if current_user.is_authenticated:
            progress = UserProgress.query.filter_by(
                user_id=current_user.id,
                module_name='quiz',
                section_name=quiz_id
            ).first()
            
            if not progress:
                progress = UserProgress(
                    user_id=current_user.id,
                    module_name='quiz',
                    section_name=quiz_id,
                    completed=True,
                    score=score
                )
                db.session.add(progress)
            else:
                progress.score = max(progress.score, score)
                progress.completed = True
        else:
            # For anonymous users
            progress = UserProgress.query.filter_by(
                session_id=session['session_id'],
                module_name='quiz',
                section_name=quiz_id
            ).first()
            
            if not progress:
                progress = UserProgress(
                    session_id=session['session_id'],
                    module_name='quiz',
                    section_name=quiz_id,
                    completed=True,
                    score=score
                )
                db.session.add(progress)
            else:
                progress.score = max(progress.score, score)
                progress.completed = True
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'score': score,
            'correct_answers': correct_answers,
            'total_questions': total_questions,
            'results': results
        })
        
    except Exception as e:
        logging.error(f"Quiz submission error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/progress')
def get_progress():
    """Get user progress data"""
    if current_user.is_authenticated:
        progress = UserProgress.query.filter_by(user_id=current_user.id).all()
    else:
        progress = UserProgress.query.filter_by(session_id=session['session_id']).all()
    
    progress_data = {}
    
    for p in progress:
        if p.module_name not in progress_data:
            progress_data[p.module_name] = {}
        progress_data[p.module_name][p.section_name] = {
            'completed': p.completed,
            'score': p.score
        }
    
    return jsonify(progress_data)
