from app import db
from datetime import datetime

class Shipment(db.Model):
    __tablename__ = 'shipments'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))
    shipment_date = db.Column(db.DateTime, default=datetime.utcnow)
    carrier = db.Column(db.String(50))
    status = db.Column(db.String(50))  # e.g., In Transit, Delivered
    tracking_number = db.Column(db.String(100), unique=True)
    weight=db.Column(db.String(50))
    volume_weight=db.Column(db.String(50))
    origin=db.Column(db.String(50))
    destination=db.Column(db.String(50))
    estimated_arrival=db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Additional fields as necessary




