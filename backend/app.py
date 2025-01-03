from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from extensions import db, migrate
from routes import main_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    db.init_app(app)
    migrate.init_app(app, db)
    jwt = JWTManager(app)

    # Import models to ensure tables are registered with SQLAlchemy
    with app.app_context():
        from models import user_model, crm_model  # Ensure models are correctly structured
        app.register_blueprint(main_bp)  # Register main blueprint

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
