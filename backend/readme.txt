

# Use application context to create all tables
with app.app_context():
    db.create_all()




    from app import db



run this in pyton to migrate to db 