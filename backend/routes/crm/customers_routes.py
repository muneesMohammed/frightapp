# your_project/routes/crm/customers_routes.py

from flask import Blueprint, jsonify, request

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/', methods=['POST'])
def create_customer():
    # Logic to create a customer
    return jsonify({"message": "Customer created"}), 201

@customers_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    # Logic to retrieve a customer by ID
    return jsonify({"customer_id": customer_id, "customer": "Customer details"})

@customers_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    # Logic to update customer details
    return jsonify({"message": "Customer updated"})

@customers_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    # Logic to delete a customer
    return jsonify({"message": "Customer deleted"})

@customers_bp.route('/', methods=['GET'])
def list_customers():
    # Logic to list all customers
    return jsonify({"customers": "List of customers"})
