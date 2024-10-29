

# services/auth_service.py
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import User, db
from datetime import datetime

# def register_user(data):
#     if User.query.filter_by(email=data['email']).first() or User.query.filter_by(username=data['username']).first():
#         return jsonify({"msg": "Email or username already taken"}), 400

#     hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
#     new_user = User(username=data['username'], password_hash=hashed_password, email=data['email'])
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({"msg": "User registered successfully"}), 201

def authenticate_user(data):
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity={'id': user.id, 'username': user.username})
        return user, access_token
    return None, None
