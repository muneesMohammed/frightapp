# services/user_service.py

from flask import jsonify  # Make sure this import is present
from models import User, Role, UserRole, db  # Import your User model
from extensions import db  # Ensure you have access to the db instance
from werkzeug.security import generate_password_hash


def get_all_users():
    users = User.query.all()
    users_list = [{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'roles': [role.role.role_name for role in user.roles],
        'created_at': user.created_at,
        'last_updated': user.updated_at
    } for user in users]
    return jsonify(users_list), 200

def get_all_roles():
    roles = Role.query.all()
    roles_list = [{"id": role.id, "name": role.role_name} for role in roles]
    return jsonify(roles_list), 200
  

def delete_user(user_id):
    UserRole.query.filter_by(user_id=user_id).delete()
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"}), 200

def edit_user(user_id, data):
    user = User.query.get(user_id)
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password_hash = generate_password_hash(data['password'], method='pbkdf2:sha256')
    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200





def register_user(data):
    # Validate incoming data
    if not all(k in data for k in ('username', 'password', 'email', 'role')):
        return {"msg": "Missing required fields"}, 400

    # Check if the email or username is already taken
    if User.query.filter_by(email=data['email']).first():
        return {"msg": "Email already taken"}, 400
    if User.query.filter_by(username=data['username']).first():
        return {"msg": "Username already taken"}, 400

    # Hash the password
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    # Create new user
    new_user = User(
        username=data['username'],
        password_hash=hashed_password,
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()

    # Assign role
    role = Role.query.filter_by(role_name=data['role']).first()
    if not role:
        return {"msg": "Role not found"}, 404

    user_role = UserRole(user_id=new_user.id, role_id=role.id)
    db.session.add(user_role)
    db.session.commit()

    # Include roles in the response
    user_roles = [role.role_name] if role else []
    return {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "roles": user_roles,
        "msg": "User registered successfully",
    }, 201
