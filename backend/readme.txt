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

 flask db stamp head                           //for remigrate
flask db migrate -m "Checking model updates"
flask db upgrade







from app import create_app
from app.extensions import db

app = create_app()

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
