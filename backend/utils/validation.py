# app/utils/validation.py
def validate_quotation_data(data):
    required_fields = [
        "quotation_id", "client_name", "contact_person",
        "contact_info", "client_address", "origin",
        "destination", "mode_of_transport",
        "base_freight_charges", "total_amount"
    ]
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, None
