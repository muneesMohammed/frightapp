import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_jwt_secret_key'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/efright'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your_jwt_secret_key'



