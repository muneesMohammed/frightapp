from app import db
from sqlalchemy.orm import relationship
from datetime import datetime



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