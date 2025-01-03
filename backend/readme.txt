## start backend
python -m venv myenvh 
myenvh\Scripts\activate
cd backend
flask run --debug 



# Use application context to create all tables
with app.app_context():
    db.create_all()




    from app import db



run this in pyton to migrate to db 



real cmd to migrate models to db


flask db migrate -m "Checking model updates"
flask db upgrade