from backend import create_app
from flask_cors import CORS

app = create_app()
CORS(app)  # Enable CORS for all routes

if __name__ == '__main__':
    app.run(debug=True, port=4000)