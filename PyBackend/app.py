from flask import Flask
from database import init_db
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp

app = Flask(__name__)


CORS(app)  # This will allow all origins to access the backend
# Initialize the database connection
db = init_db()  # Remove app from here as we don't need to pass it

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/users')



# Call the function to update categories from Excel at app startup
def create_app():
    # Initialize any other app configurations or extensions here
    return app

# Define a test route to check if app is working
@app.route('/')
def index():
    return "Hello, Flask app is running!"

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0')

