from app import db
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_blocked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    blocked_at = db.Column(db.DateTime)
    blocked_reason = db.Column(db.Text)
    
    # Relationships
    progress_records = db.relationship('UserProgress', backref='user', lazy=True)
    quiz_attempts = db.relationship('QuizAttempt', backref='user', lazy=True)
    code_submissions = db.relationship('CodeSubmission', backref='user', lazy=True)
    
    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password"""
        return check_password_hash(self.password_hash, password)
    
    def block_user(self, reason=None):
        """Block the user"""
        self.is_blocked = True
        self.blocked_at = datetime.utcnow()
        self.blocked_reason = reason
    
    def unblock_user(self):
        """Unblock the user"""
        self.is_blocked = False
        self.blocked_at = None
        self.blocked_reason = None
    
    def is_active(self):
        """Check if user is active (not blocked)"""
        return not self.is_blocked
    
    def __repr__(self):
        return f'<User {self.username}>'

class UserProgress(db.Model):
    """Track user progress through different modules"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    session_id = db.Column(db.String(128), nullable=True)  # For anonymous users
    module_name = db.Column(db.String(64), nullable=False)
    section_name = db.Column(db.String(64), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer, default=0)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class QuizAttempt(db.Model):
    """Store quiz attempts and scores"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    session_id = db.Column(db.String(128), nullable=True)  # For anonymous users
    quiz_id = db.Column(db.String(64), nullable=False)
    question_id = db.Column(db.String(64), nullable=False)
    user_answer = db.Column(db.Text)
    correct = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class CodeSubmission(db.Model):
    """Store code submissions and execution results"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    session_id = db.Column(db.String(128), nullable=True)  # For anonymous users
    language = db.Column(db.String(32), nullable=False)
    code = db.Column(db.Text, nullable=False)
    output = db.Column(db.Text)
    error = db.Column(db.Text)
    execution_time = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
