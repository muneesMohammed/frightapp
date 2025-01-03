from app import db
from datetime import datetime

class Customer(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(15))
    address=db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # company_name
    # contact_person	
    # Additional fields as necessary


	
