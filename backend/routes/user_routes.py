# routes/user_routes.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from utils.decorators import role_required
from services.user_service import get_all_users, get_all_roles

user_bp = Blueprint('user', __name__)

@user_bp.route('/all', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_all_users_route():
    return get_all_users()


@user_bp.route('/roles', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_roles():
    return get_all_roles()
 



