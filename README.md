# VisuDSA - Interactive Data Structures Learning Platform

A comprehensive Flask-based web application for learning data structures through theory, hands-on coding, visual demonstrations, and interactive quizzes.

## Features

- **User Authentication**: Registration, login, and admin dashboard
- **Theory Learning**: Comprehensive educational content for data structures
- **Code Editor**: Live code execution with Python and JavaScript support
- **Interactive Visualizers**: SVG-based animations for data structures
- **Quiz System**: Interactive quizzes with progress tracking
- **Progress Tracking**: Persistent user progress across sessions
- **Admin Dashboard**: User management and platform statistics

## Supported Data Structures

- Arrays and Linked Lists (Single & Doubly)
- Stacks and Queues (including Priority Queues)
- Binary Trees and Binary Search Trees
- Hash Tables (Separate Chaining & Open Addressing)
- Graph Algorithms (DFS/BFS)
- Advanced Algorithms (A*, Huffman Coding)

## Installation

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

### Quick Start

1. **Clone or download** the project files to your desired directory

2. **Install dependencies** (choose one method):
   
   **Method 1: Using requirements.txt (recommended)**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Method 2: Using setup script**
   ```bash
   python setup.py
   ```
   
   **Method 3: Manual installation**
   ```bash
   pip install flask flask-sqlalchemy flask-login werkzeug email-validator
   ```

3. **Configure environment** (optional but recommended):
   
   The application will work with default settings, but you can customize by editing `.env` file:
   ```bash
   SESSION_SECRET=your-strong-secret-key-here
   DATABASE_URL=sqlite:///instance/visudsa.db
   FLASK_ENV=development
   ```

4. **Run the application**:
   
   **Windows:**
   ```bash
   start_visudsa.bat
   ```
   
   **macOS/Linux:**
   ```bash
   ./start_visudsa.sh
   ```
   
   **Or manually:**
   ```bash
   python main.py
   ```

5. **Access the platform**:
   Open your browser and navigate to: `http://localhost:5000`

## Default Admin Account

- **Username**: admin
- **Password**: admin123

## Project Structure

```
visudsa/
├── app.py                 # Flask app configuration
├── main.py               # Application entry point
├── models.py             # Database models
├── routes.py             # Application routes
├── code_executor.py      # Secure code execution
├── data/
│   ├── theory_content.py # Educational content
│   └── quiz_data.py      # Quiz questions
├── static/
│   ├── css/
│   │   └── custom.css    # Custom styling
│   └── js/
│       ├── main.js       # Core JavaScript
│       ├── code_editor.js # Code editor functionality
│       ├── quiz.js       # Quiz interactions
│       └── visualizer.js # Data structure visualizations
├── templates/
│   ├── base.html         # Base template
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── admin_dashboard.html # Admin dashboard
│   ├── theory.html       # Theory content
│   ├── code_editor.html  # Code editor
│   ├── visualizer.html   # Visualizations
│   └── quiz.html         # Quiz interface
└── instance/
    └── visudsa.db        # SQLite database (created automatically)
```

## Configuration

### Database

The application uses SQLite by default. To use a different database:

1. Install the appropriate database driver (e.g., `psycopg2-binary` for PostgreSQL)
2. Set the `DATABASE_URL` environment variable:
   ```bash
   # PostgreSQL example
   export DATABASE_URL=postgresql://username:password@localhost/visudsa
   ```

### Security

For production deployment:

1. Set a strong `SESSION_SECRET` environment variable
2. Use HTTPS
3. Configure a production database (PostgreSQL recommended)
4. Update the default admin password

## Usage

### For Students

1. **Register** a new account or use the platform anonymously
2. **Learn Theory**: Read comprehensive explanations of data structures
3. **Practice Coding**: Use the live code editor to implement algorithms
4. **Visualize**: Interact with data structure demonstrations
5. **Take Quizzes**: Test your knowledge with interactive questions
6. **Track Progress**: Monitor your learning journey

### For Administrators

1. **Login** with admin credentials
2. **Monitor Users**: View user registrations and activity
3. **Review Submissions**: Check code submissions and quiz attempts
4. **Platform Statistics**: Access comprehensive usage data

## Development

### Adding New Data Structures

1. **Theory Content**: Add content to `data/theory_content.py`
2. **Quiz Questions**: Add questions to `data/quiz_data.py`
3. **Visualizations**: Extend `static/js/visualizer.js`
4. **Styling**: Update `static/css/custom.css` as needed

### Code Execution Security

The platform includes security measures for code execution:
- Subprocess isolation
- Import restrictions
- Execution timeouts
- Resource limitations

## Technologies Used

- **Backend**: Flask, SQLAlchemy, Flask-Login
- **Frontend**: Bootstrap 5, CodeMirror, Font Awesome
- **Database**: SQLite (configurable)
- **Visualization**: SVG with D3.js-style interactions
- **Security**: Werkzeug password hashing

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Database not found**: The database is created automatically on first run
2. **Permission errors**: Ensure Python has write access to the project directory
3. **Port conflicts**: Change the port in `main.py` if 5000 is in use
4. **Code execution fails**: Check Python installation and security settings

### Support

For technical support or questions:
- Check the console logs for error messages
- Ensure all dependencies are installed correctly
- Verify environment variables are set properly

## License

This project is created for educational purposes. Feel free to use and modify for learning data structures and algorithms.

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**VisuDSA** - Making data structures visual, interactive, and accessible to everyone.