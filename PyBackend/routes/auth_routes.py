import os
from flask import Blueprint, request, jsonify, redirect, url_for
from authlib.integrations.flask_client import OAuth
from database import init_db
from dotenv import load_dotenv
load_dotenv()


auth_bp = Blueprint('auth', __name__)

# Initialize the database connection
db = init_db()

# Set up OAuth for Google
oauth = OAuth()
google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    client_kwargs={'scope': 'openid profile email'},
)

# Set up OAuth for Facebook
facebook = oauth.register(
    name='facebook',
    client_id=os.getenv('FACEBOOK_CLIENT_ID'),
    client_secret=os.getenv('FACEBOOK_CLIENT_SECRET'),
    authorize_url='https://www.facebook.com/v9.0/dialog/oauth',
    access_token_url='https://graph.facebook.com/v9.0/oauth/access_token',
    client_kwargs={'scope': 'email'},
)

# Google Login Route
@auth_bp.route('/login/google', methods=['GET'])
def login_with_google():
    redirect_uri = url_for('auth.auth_with_google', _external=True)
    return google.authorize_redirect(redirect_uri)

# Google Callback Route
@auth_bp.route('/auth/google', methods=['GET'])
def auth_with_google():
    token = google.authorize_access_token()
    user = google.parse_id_token(token)
    email = user.get('email')

    # Check if the user already exists
    existing_user = db.users.find_one({"email": email})
    if not existing_user:
        db.users.insert_one({
            "email": email,
            "name": user.get('name'),
            "surname": "",  # You can extend this
            "phone": "",  # You can extend this
            "password": "",  # Not needed for social login
        })

    return jsonify({"message": "Login successful!", "user": user}), 200

# Facebook Login Route
@auth_bp.route('/login/facebook', methods=['GET'])
def login_with_facebook():
    redirect_uri = url_for('auth.auth_with_facebook', _external=True)
    return facebook.authorize_redirect(redirect_uri)

#
