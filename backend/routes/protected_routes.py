# backend/routes/protected_routes.py
from flask import Blueprint

protected_routes = Blueprint('protected', __name__)

@protected_routes.route('/api/protected')
def protected_route():
    return {"message": "This is a protected route."}
