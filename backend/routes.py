from flask import Blueprint, request, jsonify
from app import db
from models import User, Role, UserRole
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from utils import role_required

auth_routes = Blueprint('auth', __name__)
protected_routes = Blueprint('protected', __name__)

# User Registration
@auth_routes.route('/UserManagement', methods=['POST'])
def register():
    data = request.get_json()

    # Validate incoming data
    if not all(k in data for k in ('username', 'password', 'email', 'role')):
        return jsonify({"msg": "Missing required fields"}), 400

    # Check if the email or username is already taken
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already taken"}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already taken"}), 400

    # Hash the password
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    # Create new user
    new_user = User(username=data['username'], password_hash=hashed_password, email=data['email'])
    db.session.add(new_user)
    db.session.commit()

    # Assign role
    role = Role.query.filter_by(role_name=data['role']).first()
    if not role:
        return jsonify({"msg": "Role not found"}), 404
    
    user_role = UserRole(user_id=new_user.id, role_id=role.id)
    db.session.add(user_role)
    db.session.commit()

        # Include roles in the response
    user_roles = [role.role_name] if role else []  # Ensure it's an array
    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "roles": user_roles,
        "msg": "User registered successfully"
    }), 201








@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Find user by username
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password_hash, data['password_hash']):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Get the roles associated with the user
    user_roles = [user_role.role.role_name for user_role in user.roles]

    # Create JWT token
    access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': user_roles})
    return jsonify(access_token=access_token), 200

# Fetch all users (Admin only)
@protected_routes.route('/api/users', methods=['GET'])
@jwt_required()
@role_required('admin')  # Only admins can view all users
def get_all_users():
    users = User.query.all()  # Query all users from the database
    users_list = []
    
    # Prepare a response with relevant user details
    for user in users:
        users_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'roles': [role.role.role_name for role in user.roles]  # Extract user roles
        })

    return jsonify(users_list), 200

# Delete a user (Admin only)
@protected_routes.route('/api/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')  # Only admins can delete users
def delete_user(user_id):
    user = User.query.get_or_404(user_id)

    # First, delete all associated user roles
    UserRole.query.filter_by(user_id=user_id).delete()

    # Now, delete the user
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"}), 200


# Edit (Update) a user (Admin only)
@protected_routes.route('/api/users/<int:user_id>', methods=['PUT'])
@jwt_required()
@role_required('admin')  # Only admins can edit users
def edit_user(user_id):
    data = request.get_json()

    # Find the user by ID
    user = User.query.get_or_404(user_id)

    # Update user details (username, email, password)
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        user.password_hash = hashed_password

    db.session.commit()

    # Update user roles if provided
    if 'role' in data:
        role = Role.query.filter_by(role_name=data['role']).first()
        if not role:
            return jsonify({"msg": "Role not found"}), 404
        
        # Remove the old role and assign a new one
        user.roles.clear()
        new_user_role = UserRole(user_id=user.id, role_id=role.id)
        db.session.add(new_user_role)
        db.session.commit()

    return jsonify({"msg": "User updated successfully"}), 200
