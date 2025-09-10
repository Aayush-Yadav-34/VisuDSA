from app import app
import os

if __name__ == '__main__':
    # Let Docker handle host/port
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)