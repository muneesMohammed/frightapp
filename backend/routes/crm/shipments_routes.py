# your_project/routes/crm/shipments_routes.py

from flask import Blueprint, jsonify, request

shipments_bp = Blueprint('shipments', __name__)

@shipments_bp.route('/', methods=['POST'])
def create_shipment():
    # Logic to create a new shipment
    return jsonify({"message": "Shipment created"}), 201

@shipments_bp.route('/<int:shipment_id>', methods=['GET'])
def get_shipment(shipment_id):
    # Logic to get shipment details
    return jsonify({"shipment_id": shipment_id, "shipment": "Shipment details"})

@shipments_bp.route('/<int:shipment_id>', methods=['PUT'])
def update_shipment(shipment_id):
    # Logic to update a shipment
    return jsonify({"message": "Shipment updated"})

@shipments_bp.route('/<int:shipment_id>', methods=['DELETE'])
def delete_shipment(shipment_id):
    # Logic to delete a shipment
    return jsonify({"message": "Shipment deleted"})

@shipments_bp.route('/', methods=['GET'])
def list_shipments():
    # Logic to list all shipments
    return jsonify({"shipments": "List of shipments"})
