# routes/auth_routes.py
from flask import Blueprint, request, jsonify
from services.auth_service import authenticate_user  # Ensure this service is implemented correctly
from flask_jwt_extended import create_access_token
from models import User, Role, UserRole
from werkzeug.security import check_password_hash
from marshmallow import Schema, fields, ValidationError

# Initialize the Blueprint
auth_bp = Blueprint('auth', __name__)

# Define a schema for input validation
class LoginSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate incoming data
    try:
        validated_data = LoginSchema().load(data)
    except ValidationError as err:
        return jsonify({"msg": "Missing username or password", "errors": err.messages}), 400

    # Find user by username
    user = User.query.filter_by(username=validated_data['username']).first()

    # Check for user existence and password validity
    if not user or not check_password_hash(user.password_hash, validated_data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Get the roles associated with the user
    user_roles = [user_role.role.role_name for user_role in user.roles]

    # Create JWT token
    access_token = create_access_token(identity={
        'id': user.id,
        'username': user.username,
        'role': user_roles
    })

    return jsonify(access_token=access_token), 200




# @auth_routes.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user, access_token = authenticate_user(data)
#     if user:
#         return jsonify(access_token=access_token), 200
#     return jsonify({"msg": "Invalid credentials"}), 401