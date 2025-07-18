#!/bin/bash

echo "VisuDSA - Interactive Data Structures Learning Platform"
echo "========================================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from your package manager"
    exit 1
fi

# Show Python version
echo "Python version: $(python3 --version)"

# Install packages
echo "Installing required packages..."
pip3 install flask flask-sqlalchemy flask-login werkzeug gunicorn

# Create instance directory
mkdir -p instance

# Start the application
echo ""
echo "Starting VisuDSA..."
echo "Open your browser to: http://localhost:5000"
echo "Default admin login: admin / admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 main.py