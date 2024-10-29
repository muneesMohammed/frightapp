from app import db
from sqlalchemy.orm import relationship
from datetime import datetime

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship with UserRole, with cascading delete
    roles = relationship('UserRole', cascade='all, delete-orphan', backref='user')




    

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50), unique=True, nullable=False)



class UserRole(db.Model):
    __tablename__ = 'user_roles'
    # Composite primary key: no need for an extra `id` column
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)

    # Relationship to get the Role model data
    role = db.relationship('Role', backref='user_roles')






# CRM MOdel





# Define the Job Model
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.String(50), unique=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    freight_type = db.Column(db.String(50))  # e.g., Air, Sea, Road
    status = db.Column(db.String(50))        # e.g., Pending, In Transit, Delivered
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Other relevant job fields...

# Function to generate Job ID
def generate_job_id(freight_type):
    current_date = datetime.now().strftime("%Y%m%d")  # E.g., 20241014
    latest_job = Job.query.filter_by(freight_type=freight_type).order_by(Job.id.desc()).first()
    
    if latest_job:
        # Increment the last job's numeric part
        last_job_num = int(latest_job.job_id.split('-')[-1])
        new_job_num = last_job_num + 1
    else:
        new_job_num = 1  # First job for the day

    # Generate Job ID like "AIR-20241014-001"
    return f"{freight_type}-{current_date}-{str(new_job_num).zfill(3)}"


