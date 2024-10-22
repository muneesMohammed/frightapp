from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Import CORS
from config import Config
from extensions import db, migrate  # Import the `db` and `migrate` instances

# db = SQLAlchemy()

def create_app():
    
    app = Flask(__name__)
    CORS(app, resources={r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Authorization", "Content-Type"],
        "supports_credentials": True
        }})
    app.config.from_object(Config)
   
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt = JWTManager(app)

    # Initialize CORS and allow requests from your React frontend
    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    with app.app_context():
        from models import User, Role, UserRole
        db.create_all()  # Create tables if they don't exist
        # Import and register routes
        from routes import auth_routes, protected_routes
        app.register_blueprint(auth_routes)
        app.register_blueprint(protected_routes)

        # Create all database tables
        db.create_all()

    return app



if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
