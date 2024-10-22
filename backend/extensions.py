# extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()  # Define the SQLAlchemy instance here
migrate = Migrate()
