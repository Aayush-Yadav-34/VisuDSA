
[<img src="https://img.shields.io/badge/Live%20Demo-VisuDSA-blue?logo=render&style=for-the-badge" alt="View Live on Render" />](https://visudsa.onrender.com){:target="_blank"}

# VisuDSA - Interactive Data Structures Learning Platform

A comprehensive Flask-based web application for learning data structures through theory, hands-on coding, visual demonstrations, and interactive quizzes.

## Features

- **User Authentication**: Registration, login, and admin dashboard
- **Theory Learning**: Comprehensive educational content for data structures
- **Code Editor**: Live code execution with Python support
- **Interactive Visualizers**: SVG-based animations for data structures
  - Built-in step-by-step explanations for every operation
  - Predefined demo values so you can explore immediately
- **Quiz System**: Interactive quizzes with progress tracking
- **Progress Tracking**: Persistent user progress across sessions
- **AI Chatbot**: Intelligent assistant powered by OpenRouter API for real-time help
- **Admin Dashboard**: User management and platform statistics

## Supported Data Structures

- Arrays and Linked Lists (Single & Doubly)
- Stacks and Queues (including Priority Queues)
- Binary Trees and Binary Search Trees
- Hash Tables (Separate Chaining & Open Addressing)
- Graph Algorithms (DFS/BFS)
- Advanced Algorithms (A*, Huffman Coding)

## Installation
### Option 1: Docker (Recommended)

#### Prerequisites
- Docker Desktop (Windows/macOS) or Docker Engine (Linux)

#### Quick Start with Docker Compose
1. Open a terminal in the project directory.
2. Build and start the app:
   ```powershell
   docker compose up --build
   ```
3. Open your browser to: [http://localhost:5000](http://localhost:5000)

#### Stopping the app
```powershell
docker compose down
```

#### Environment Variables
You can set environment variables in `docker-compose.yml`:
```yaml
SESSION_SECRET=your-strong-secret-key-here
DATABASE_URL=sqlite:///instance/visudsa.db
# AI Chatbot Configuration (optional)
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=openrouter/auto
```

### Option 2: Local Python
### Prerequisites
- Python 3.11 or higher
- pip (Python package manager)

#### Quick Start

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
   
   The application will work with default settings, but you can customize by creating a `.env` file:
   ```bash
   SESSION_SECRET=your-strong-secret-key-here
   DATABASE_URL=sqlite:///instance/data_structures_platform.db
   FLASK_ENV=development
   # Optional: AI Chatbot configuration
   OPENROUTER_API_KEY=your-openrouter-api-key
   OPENROUTER_MODEL=openrouter/auto
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
   **Or view the live deployment at: [https://visudsa.onrender.com](https://visudsa.onrender.com)**

## Usage

### Running with Docker
1. Make sure Docker is running.
2. Run:
   ```powershell
   docker compose up --build
   ```
3. Visit [http://localhost:5000](http://localhost:5000)

### Running Locally (Windows)
1. Double-click `start_visudsa.bat` or run in terminal:
   ```powershell
   .\start_visudsa.bat
   ```

### Running Locally (macOS/Linux)
1. Run in terminal:
   ```bash
   ./start_visudsa.sh
   ```

### Manual Run
```powershell
python main.py
```

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
    └── data_structures_platform.db  # SQLite database (created automatically)
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

### AI Chatbot Setup (Optional)

The platform includes an AI-powered chatbot for real-time assistance. To enable it:

1. **Get an API Key**: Sign up at [OpenRouter](https://openrouter.ai) and get your API key
2. **Configure Environment Variables**:
   ```bash
   # For Docker
   OPENROUTER_API_KEY=your-api-key-here
   OPENROUTER_MODEL=openrouter/auto  # or specify a model like openrouter/meta-llama/llama-3.1-8b-instruct
   
   # For local development
   export OPENROUTER_API_KEY=your-api-key-here
   export OPENROUTER_MODEL=openrouter/auto
   ```
3. **Restart the Application**: The chatbot will be available as a floating button on all pages

**Note**: Without an API key, the chatbot feature will be disabled but the platform remains fully functional.

### Security

For production deployment:

1. Set a strong `SESSION_SECRET` environment variable
2. Use HTTPS
3. Configure a production database (PostgreSQL recommended)
4. Update the default admin password
5. Secure your AI API keys and never commit them to version control

## Usage

### For Students

1. **Register** a new account or use the platform anonymously
2. **Learn Theory**: Read comprehensive explanations of data structures
3. **Practice Coding**: Use the live code editor to implement algorithms
4. **Visualize**: Interact with data structure demonstrations
5. **Take Quizzes**: Test your knowledge with interactive questions
6. **Track Progress**: Monitor your learning journey
7. **Get AI Help**: Use the floating chatbot for instant assistance with concepts

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
- **AI Integration**: OpenRouter API for intelligent chatbot assistance
- **Security**: Werkzeug password hashing
- **Containerization**: Docker, Docker Compose

## Requirements

All dependencies are listed in `requirements.txt` and `pyproject.toml`.

Main packages:
- Flask
- Flask-SQLAlchemy
- Flask-Login
- Werkzeug
- SQLAlchemy
- email-validator
- gunicorn (optional, for production)
- psycopg2-binary (optional, for PostgreSQL)
- PyJWT, oauthlib (security)

## Troubleshooting

### Common Issues

1. **Database not found**: The database is created automatically on first run
2. **Permission errors**: Ensure Python has write access to the project directory
3. **Port conflicts**: Change the port in `main.py` if 5000 is in use
4. **Code execution fails**: Check Python installation and security settings
5. **Chatbot not working**: Verify your OpenRouter API key is correctly set in environment variables
6. **Docker build fails**: Ensure Docker is running and you have sufficient disk space

### Support

For technical support or questions:
- Check the console logs for error messages
- Ensure all dependencies are installed correctly
- Verify environment variables are set properly
- For AI chatbot issues, check your OpenRouter API key and internet connection

## License

This project is created for educational purposes. Feel free to use and modify for learning data structures and algorithms.

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including Docker setup)
5. Update documentation if needed
6. Submit a pull request

### Development Setup

For contributors:
1. Clone the repository
2. Install development dependencies: `pip install -r requirements.txt`
3. Set up environment variables (see Configuration section)
4. Run the application: `python main.py`
5. Make your changes and test locally
6. Test with Docker: `docker compose up --build`

---

**VisuDSA** - Making data structures visual, interactive, and accessible to everyone.
