# your_project/routes/crm/__init__.py

from flask import Blueprint

# Import blueprints from CRM route files
from .jobs_routes import jobs_bp
from .customers_routes import customers_bp
from .shipments_routes import shipments_bp
from .invoices_routes import invoices_bp
from .interactions_routes import interactions_bp

# Create a CRM blueprint
crm_bp = Blueprint('crm', __name__)

# Register CRM-specific blueprints
crm_bp.register_blueprint(jobs_bp, url_prefix='/jobs')
crm_bp.register_blueprint(customers_bp, url_prefix='/customers')
crm_bp.register_blueprint(shipments_bp, url_prefix='/shipments')
crm_bp.register_blueprint(invoices_bp, url_prefix='/invoices')
crm_bp.register_blueprint(interactions_bp, url_prefix='/interactions')
