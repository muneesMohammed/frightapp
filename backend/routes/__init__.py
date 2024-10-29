# routes/__init__.py
from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .admin_routes import admin_routes
# routes/__init__.py
from .auth_routes import auth_routes
from .protected_routes import protected_routes

# Expose these routes at the package level
__all__ = ['auth_routes', 'protected_routes']

def register_blueprints(app):
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(admin_routes, url_prefix='/admin')
