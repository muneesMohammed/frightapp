









# your_project/routes/__init__.py

from flask import Blueprint

# Import blueprints from individual route files
from .auth_routes import auth_bp
from .user_routes import user_bp 
from .admin_routes import admin_bp

# Import CRM-related blueprints from the CRM subfolder
from .crm import crm_bp

from .protected_routes import protected_routes

# Expose these routes at the package level
__all__ = ['auth_routes', 'protected_routes']
# Create a main blueprint that includes all routes
main_bp = Blueprint('main', __name__)

# Register individual blueprints to the main blueprint
main_bp.register_blueprint(auth_bp, url_prefix='/auth')
main_bp.register_blueprint(user_bp, url_prefix='/users')
main_bp.register_blueprint(admin_bp, url_prefix='/admin')
main_bp.register_blueprint(crm_bp, url_prefix='/crm')

def init_routes(app):
    """Initialize all routes."""
    app.register_blueprint(main_bp)
