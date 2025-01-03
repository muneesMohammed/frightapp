from app import db
from datetime import datetime

class Interaction(db.Model):
    __tablename__ = 'interactions'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    interaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)
    interaction_type = db.Column(db.String(50))  # e.g., Email, Call, Meeting
    # Additional fields as necessary
