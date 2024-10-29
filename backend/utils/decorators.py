# utils/decorators.py
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask import jsonify

def role_required(required_role):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            identity = get_jwt_identity()
            roles = identity.get('role', [])
            if required_role not in roles:
                return jsonify({"msg": "Permission denied"}), 403
            return f(*args, **kwargs)
        return wrapper
    return decorator
