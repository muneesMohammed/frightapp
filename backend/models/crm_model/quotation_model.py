# app/models/quotation_model.py
from app import db
from datetime import datetime
from sqlalchemy.orm import validates
from sqlalchemy.event import listen


class Quotation(db.Model):
    __tablename__ = 'quotations'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    quotation_id = db.Column(db.String(100), nullable=False)  # Assuming it's an identifier
    date_of_issue = db.Column(db.Date)  # Date field for issuing the quotation
    expiration_date = db.Column(db.Date)  # Date field for expiration
    client_name = db.Column(db.String(100), nullable=False)
    contact_person = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(100), nullable=False)
    client_address = db.Column(db.Text, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    mode_of_transport = db.Column(db.String(50), nullable=False)  # E.g., air, sea, land
    incoterms = db.Column(db.String(50), nullable=False)
    cargo_type = db.Column(db.String(50), nullable=False)
    weight = db.Column(db.Float)  # Weight as a float (e.g., kg, tons)
    volume = db.Column(db.Float)  # Volume as a float (e.g., cubic meters)
    base_freight_charges = db.Column(db.Float)  # Float for currency values
    total_amount = db.Column(db.Float)  # Float for currency values
    additional_charges = db.Column(db.Float)  # Float for additional fees
    discount = db.Column(db.Float)  # Float for discounts
    currency = db.Column(db.String(50), nullable=False)  # E.g., USD, EUR
    services_included = db.Column(db.Text)  # List of services as a string (or JSON for more complex data)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    delivery_time_estimate = db.Column(db.Integer)  # Integer for delivery time (e.g., days)
    special_instructions = db.Column(db.Text)  # Longer text for instructions
    remarks = db.Column(db.Text, default="")  # Optional remarks

    # Optional: You could add indexing or unique constraints if needed
    __table_args__ = (
        db.Index('idx_quotation_id', 'quotation_id'),
    )


    # Generate quotation_id automatically
    @staticmethod
    def generate_quotation_id():
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")  # Timestamp for uniqueness
        return f"QTN-{timestamp}"

    @validates('quotation_id')
    def validate_quotation_id(self, key, value):
        if not value:
            return Quotation.generate_quotation_id()
        return value


# Listen for `before_insert` to set `quotation_id`
def set_quotation_id(mapper, connection, target):
    if not target.quotation_id:
        target.quotation_id = Quotation.generate_quotation_id()

listen(Quotation, 'before_insert', set_quotation_id)
