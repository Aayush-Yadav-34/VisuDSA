from app import app
import os

if __name__ == '__main__':
    # Let Docker handle host/port
<<<<<<< HEAD
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)
=======
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)

>>>>>>> 4ca8c344fabe770c5deb0742962d187fff6e6ce9
