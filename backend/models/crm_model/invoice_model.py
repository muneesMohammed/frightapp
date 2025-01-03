from app import db
from datetime import datetime

class Invoice(db.Model):
    __tablename__ = 'invoices'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))
    amount_due = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    issued_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50))  # e.g., Unpaid, Paid
    created_at = db.Column(db.DateTime, default=datetime.utcnow)





