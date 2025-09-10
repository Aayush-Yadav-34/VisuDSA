import subprocess
import tempfile
import os
import time
import logging
import shutil
PYTHON_CMD = shutil.which("python3") or shutil.which("python") or "python"

def execute_code(code, language='python'):
    """
    Execute code in a subprocess with security restrictions
    Returns dict with success, output, error, and execution_time
    """
    try:
        if language == 'python':
            return execute_python_code(code)
        elif language == 'javascript':
            return execute_javascript_code(code)
        else:
            return {
                'success': False,
                'error': f'Unsupported language: {language}'
            }
    except Exception as e:
        logging.error(f"Code execution error: {str(e)}")
        return {
            'success': False,
            'error': f'Execution error: {str(e)}'
        }

def execute_python_code(code):
    """Execute Python code safely"""
    # Security check for dangerous imports/operations
    dangerous_keywords = [
        'import os', 'import sys', 'import subprocess', 'import socket',
        'import urllib', 'import requests', 'import shutil', 'import tempfile',
        'open(', 'file(', 'exec(', 'eval(', '__import__'
    ]
    
    for keyword in dangerous_keywords:
        if keyword in code.lower():
            return {
                'success': False,
                'error': f'Security restriction: {keyword} is not allowed'
            }
    
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(code)
            temp_file = f.name
        
        start_time = time.time()
        
        # Execute with timeout and restricted environment
        result = subprocess.run(
            ['python3', temp_file],
            capture_output=True,
            text=True,
            timeout=5,  # 5 second timeout
            cwd=tempfile.gettempdir()
        )
        
        execution_time = time.time() - start_time
        
        # Clean up
        os.unlink(temp_file)
        
        if result.returncode == 0:
            return {
                'success': True,
                'output': result.stdout,
                'execution_time': execution_time
            }
        else:
            return {
                'success': False,
                'error': result.stderr,
                'execution_time': execution_time
            }
            
    except subprocess.TimeoutExpired:
        return {
            'success': False,
            'error': 'Code execution timed out (5 seconds limit)'
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def execute_javascript_code(code):
    """Execute JavaScript code using Node.js"""
    # Security check
    dangerous_keywords = [
        'require(', 'import ', 'fs.', 'process.', 'child_process',
        'eval(', 'Function(', 'setTimeout(', 'setInterval('
    ]
    
    for keyword in dangerous_keywords:
        if keyword in code:
            return {
                'success': False,
                'error': f'Security restriction: {keyword} is not allowed'
            }
    
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            f.write(code)
            temp_file = f.name
        
        start_time = time.time()
        
        # Execute with timeout
        result = subprocess.run(
            ['node', temp_file],
            capture_output=True,
            text=True,
            timeout=5,
            cwd=tempfile.gettempdir()
        )
        
        execution_time = time.time() - start_time
        
        # Clean up
        os.unlink(temp_file)
        
        if result.returncode == 0:
            return {
                'success': True,
                'output': result.stdout,
                'execution_time': execution_time
            }
        else:
            return {
                'success': False,
                'error': result.stderr,
                'execution_time': execution_time
            }
            
    except subprocess.TimeoutExpired:
        return {
            'success': False,
            'error': 'Code execution timed out (5 seconds limit)'
        }
    except FileNotFoundError:
        return {
            'success': False,
            'error': 'Node.js not available. Please use Python instead.'
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }
