from flask import Blueprint, request, jsonify
from database import init_db  # Import init_db to get the db connection

user_bp = Blueprint('user', __name__)

# Initialize the database connection
db = init_db()  # Call init_db to get the db connection

@user_bp.route('/create', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validate input
    if not data.get("email") or not data.get("password"):
        return jsonify({"message": "Email and password are required!"}), 400

    # Check if the user already exists
    if db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists!"}), 409

    # Create new user
    db.users.insert_one({
        "name": data["name"],
        "surname": data["surname"],
        "phone": data["phone"],
        "email": data["email"],
        "password": data["password"]
    })
    return jsonify({"message": "User registered successfully!"}), 201


@user_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    # Validate input
    if not data.get("email") or not data.get("password"):
        return jsonify({"message": "Email and password are required!"}), 400

    # Check if user exists
    user = db.users.find_one({"email": data["email"]})
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    # Verify password (note: in real apps, passwords should be hashed)
    if user["password"] != data["password"]:  # You should use hashing in production
        return jsonify({"message": "Invalid email or password"}), 401

    # Send a success response if credentials are valid
    return jsonify({"message": "Login successful!"}), 200


# New route for Forgot Password
@user_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()

    email = data.get('email')
    if not email:
        return jsonify({"message": "Email is required"}), 400

    # Check if user exists
    user = db.users.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Simulate sending the reset email (this should be handled with a proper email service like SendGrid)
    # For example, you can send a password reset token to the user's email address.
    # You can also generate a reset token and send it to the user via email.

    return jsonify({"message": "A password reset link has been sent to your email"}), 200