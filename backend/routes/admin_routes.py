# routes/admin_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from utils.decorators import role_required
from services.user_service import delete_user, edit_user, register_user


admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_user_route(user_id):
    return delete_user(user_id)

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def edit_user_route(user_id):
    data = request.get_json()
    return edit_user(user_id, data)




@admin_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return register_user(data)

