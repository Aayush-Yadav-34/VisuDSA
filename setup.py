#!/usr/bin/env python3
"""
VisuDSA Setup Script
Automated setup for the Interactive Data Structures Learning Platform
"""

import os
import subprocess
import sys

def install_requirements():
    """Install required Python packages"""
    # Install from requirements.txt if available, otherwise use fallback packages
    if os.path.exists('requirements.txt'):
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
            print("✓ Installed packages from requirements.txt")
            return True
        except subprocess.CalledProcessError:
            print("! Failed to install from requirements.txt, using fallback packages")
    
    # Fallback packages
    packages = [
        'flask>=3.1.1',
        'flask-sqlalchemy>=3.1.1', 
        'flask-login>=0.6.3',
        'werkzeug>=3.1.3',
        'email-validator>=2.2.0'
    ]
    
    print("Installing Python packages...")
    for package in packages:
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
            print(f"✓ Installed {package}")
        except subprocess.CalledProcessError:
            print(f"✗ Failed to install {package}")
            return False
    return True

def create_directories():
    """Create necessary directories"""
    directories = ['instance', 'logs']
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"✓ Created directory: {directory}")

def set_environment():
    """Set up environment variables"""
    env_file = '.env'
    if not os.path.exists(env_file):
        with open(env_file, 'w') as f:
            f.write('SESSION_SECRET=change-this-in-production\n')
            f.write('DATABASE_URL=sqlite:///instance/visudsa.db\n')
            f.write('FLASK_ENV=development\n')
        print(f"✓ Created {env_file} file")

def main():
    """Main setup function"""
    print("=" * 50)
    print("VisuDSA Setup")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("✗ Python 3.8+ required")
        sys.exit(1)
    print(f"✓ Python {sys.version}")
    
    # Install packages
    if not install_requirements():
        print("✗ Failed to install required packages")
        sys.exit(1)
    
    # Create directories
    create_directories()
    
    # Set up environment
    set_environment()
    
    print("\n" + "=" * 50)
    print("Setup complete!")
    print("=" * 50)
    print("\nTo start the application:")
    print("  python main.py")
    print("\nThen open: http://localhost:5000")
    print("\nDefault admin login:")
    print("  Username: admin")
    print("  Password: admin123")

if __name__ == '__main__':
    main()