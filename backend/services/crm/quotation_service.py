# app/services/quotation_service.py
from models import Quotation
from extensions import db 
import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

def create_quotation(data):
    new_quotation = Quotation(**data)
    db.session.add(new_quotation)
    try:
        db.session.commit()
    except Exception as e:
        logger.error(f"Error committing to database: {str(e)}")
        db.session.rollback()
        raise

    return new_quotation

def get_all_quotations():
    return Quotation.query.all()

def get_quotation_by_id(quotation_id):
    return Quotation.query.filter_by(id=quotation_id).first()

def update_quotation(quotation_id, updates):
    quotation = Quotation.query.filter_by(id=quotation_id).first()
    if quotation:
        for key, value in updates.items():
            setattr(quotation, key, value)
        db.session.commit()
    return quotation

def delete_quotation(quotation_id):
    quotation = Quotation.query.filter_by(id=quotation_id).first()
    if quotation:
        db.session.delete(quotation)
        db.session.commit()
    return quotation
