# app/routes/quotation_routes.py
from flask import Blueprint, request, jsonify
from services.crm.quotation_service import (
    create_quotation,
    get_all_quotations,
    get_quotation_by_id,
    update_quotation,
    delete_quotation,
)

quotation_bp = Blueprint('quotations', __name__)

@quotation_bp.route('/quotations', methods=['POST'])
def create():
    data = request.json
    quotation = create_quotation(data)
    return jsonify({"message": "Quotation created", "data": quotation.id}), 201

@quotation_bp.route('/quotations', methods=['GET'])
def get_all():
    quotations = get_all_quotations()
    return jsonify({"data": [q.as_dict() for q in quotations]}), 200

@quotation_bp.route('/quotations/<int:id>', methods=['GET'])
def get_by_id(id):
    quotation = get_quotation_by_id(id)
    if not quotation:
        return jsonify({"message": "Quotation not found"}), 404
    return jsonify({"data": quotation.as_dict()}), 200

@quotation_bp.route('/quotations/<int:id>', methods=['PUT'])
def update(id):
    updates = request.json
    quotation = update_quotation(id, updates)
    if not quotation:
        return jsonify({"message": "Quotation not found"}), 404
    return jsonify({"message": "Quotation updated", "data": quotation.as_dict()}), 200

@quotation_bp.route('/quotations/<int:id>', methods=['DELETE'])
def delete(id):
    quotation = delete_quotation(id)
    if not quotation:
        return jsonify({"message": "Quotation not found"}), 404
    return jsonify({"message": "Quotation deleted"}), 200
