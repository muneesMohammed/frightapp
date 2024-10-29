# from flask import Blueprint, request, jsonify
# from app import db
# from models import User, Role, UserRole
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from utils import role_required
# from datetime import datetime
# from sqlalchemy.exc import IntegrityError

# auth_routes = Blueprint('auth', __name__)
# protected_routes = Blueprint('protected', __name__)

# # User Registration
# @auth_routes.route('/UserManagement', methods=['POST'])
# def register():
#     data = request.get_json()

#     # Validate incoming data
#     if not all(k in data for k in ('username', 'password', 'email', 'role')):
#         return jsonify({"msg": "Missing required fields"}), 400

#     # Check if the email or username is already taken
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"msg": "Email already taken"}), 400
#     if User.query.filter_by(username=data['username']).first():
#         return jsonify({"msg": "Username already taken"}), 400

#     # Hash the password
#     hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

#     # Create new user
#     new_user = User(
#         username=data['username'],
#         password_hash=hashed_password,
#         email=data['email']
#     )
#     db.session.add(new_user)
#     db.session.commit()

#     # Assign role
#     role = Role.query.filter_by(role_name=data['role']).first()
#     if not role:
#         return jsonify({"msg": "Role not found"}), 404

#     user_role = UserRole(user_id=new_user.id, role_id=role.id)
#     db.session.add(user_role)
#     db.session.commit()

#     # Include roles in the response
#     user_roles = [role.role_name] if role else []
#     return jsonify({
#         "id": new_user.id,
#         "username": new_user.username,
#         "email": new_user.email,
#         "roles": user_roles,
#         "msg": "User registered successfully",
#     }), 201


# # User Login
# @auth_routes.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     # Find user by username
#     user = User.query.filter_by(username=data['username']).first()
#     if not user or not check_password_hash(user.password_hash, data['password']):
#         return jsonify({"msg": "Invalid credentials"}), 401

#     # Get the roles associated with the user
#     user_roles = [user_role.role.role_name for user_role in user.roles]

#     # Create JWT token
#     access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': user_roles})
#     return jsonify(access_token=access_token), 200


# # Fetch all users (Admin only)
# @protected_routes.route('/api/users', methods=['GET'])
# @jwt_required()
# @role_required('admin')
# def get_all_users():
#     users = User.query.all()
#     users_list = [{
#         'id': user.id,
#         'username': user.username,
#         'email': user.email,
#         'roles': [role.role.role_name for role in user.roles],
#         'created_at': user.created_at,
#         'last_updated': user.updated_at
#     } for user in users]
#     return jsonify(users_list), 200


# # Delete a user (Admin only, prevents deleting logged-in user)
# @protected_routes.route('/api/users/<int:user_id>', methods=['DELETE'])
# @jwt_required()
# @role_required('admin')
# def delete_user(user_id):
#     current_user_id = get_jwt_identity().get('id')
#     if user_id == current_user_id:
#         return jsonify({"msg": "You cannot delete your own account."}), 403

#     user = User.query.get_or_404(user_id)
#     UserRole.query.filter_by(user_id=user_id).delete()
#     db.session.delete(user)
#     db.session.commit()
#     return jsonify({"msg": "User deleted successfully"}), 200


# # Edit (Update) a user (Admin only)
# @protected_routes.route('/api/users/<int:user_id>', methods=['PUT'])
# @jwt_required()
# @role_required('admin')
# def edit_user(user_id):
#     try:
#         data = request.get_json()
#         user = User.query.get_or_404(user_id)

#         # Update user details
#         if 'username' in data:
#             user.username = data['username']
#         if 'email' in data:
#             user.email = data['email']
#         if 'password' in data:
#             hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
#             user.password_hash = hashed_password

#         # Update roles if provided
#         if 'role' in data:
#             role = Role.query.filter_by(role_name=data['role']).first()
#             if not role:
#                 return jsonify({"msg": "Role not found"}), 404
#             user.roles.clear()
#             new_user_role = UserRole(user_id=user.id, role_id=role.id)
#             db.session.add(new_user_role)

#         db.session.commit()
#         return jsonify({"msg": "User updated successfully"}), 200

#     except IntegrityError as e:
#         db.session.rollback()
#         if "Duplicate entry" in str(e):
#             if "username" in str(e):
#                 return jsonify({"error": "Username is already taken"}), 409
#             if "email" in str(e):
#                 return jsonify({"error": "Email is already taken"}), 409
#         return jsonify({"error": "An error occurred while updating the user"}), 500

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


# # Fetch all roles (Admin only)
# @protected_routes.route('/roles', methods=['GET'])
# @jwt_required()
# @role_required('admin')
# def get_roles():
#     roles = Role.query.all()
#     roles_list = [{"id": role.id, "name": role.role_name} for role in roles]
#     return jsonify(roles_list), 200
