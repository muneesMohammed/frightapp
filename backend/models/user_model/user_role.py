from extensions import db

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)

    # Relationship to get the Role model data
    role = db.relationship('Role', backref='user_roles')






