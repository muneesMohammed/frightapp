from flask import Blueprint, request, jsonify
from app import db
from models import User, Role, UserRole
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from utils import role_required

auth_routes = Blueprint('auth', __name__)
protected_routes = Blueprint('protected', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(username=data['username'], password_hash=data['password_hash'],email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password_hash=data['password_hash']).first()
    if not user:
        return jsonify({"msg": "Invalid credentials"}), 401

       # Get the roles associated with the user
    user_roles = [user_role.role.role_name for user_role in user.roles] 
    access_token = create_access_token(identity={'id': user.id, 'username': user.username,'role':user_roles})
    return jsonify(access_token=access_token), 200

@protected_routes.route('/admin', methods=['GET'])
@role_required('admin')  # Check if the user has the 'admin' role
@jwt_required()
def admin():
    return jsonify({"msg": "Welcome, admin!"})
