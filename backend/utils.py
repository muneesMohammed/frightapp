from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from models import UserRole, Role

def role_required(role_name):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            current_user = get_jwt_identity()
            user_roles = UserRole.query.filter_by(user_id=current_user['id']).all()
            user_role_names = [Role.query.get(role.role_id).role_name for role in user_roles]
            
            if role_name not in user_role_names:
                return jsonify({"msg": "Permission denied"}), 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator
