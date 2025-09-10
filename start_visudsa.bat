@echo off
echo VisuDSA - Interactive Data Structures Learning Platform
echo =========================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

REM Install packages if needed
echo Installing required packages...
pip install flask flask-sqlalchemy flask-login werkzeug gunicorn

REM Create instance directory
if not exist "instance" mkdir instance

REM Start the application
echo.
echo Starting VisuDSA...
echo Open your browser to: http://localhost:5000
echo Default admin login: admin / admin123
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py

pause