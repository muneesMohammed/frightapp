import mysql.connector
import bcrypt
import jwt
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
app.config['SECRET_KEY'] = 'your_jwt_secret_key'  # Use a strong secret key

# MySQL database connection setup
db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'efright'
}

# Function to get a user from the database by username
def get_user_from_db(username):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)  # Return data as dictionary
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    conn.close()
    return user

# Function to add a new user to the database
def add_user_to_db(username, password_hash, email, role):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "INSERT INTO users (username, password_hash, email, role) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (username, password_hash, email, role))
    conn.commit()
    conn.close()

# Login route to authenticate users
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = get_user_from_db(username)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Verify the password using bcrypt
    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Generate a JWT token if authentication is successful
    token = jwt.encode({
        'username': user['username'],
        'role': user['role'],  # Adding role to token
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"token": token})

# Add user route (restricted to admin)
@app.route('/add-user', methods=['POST'])
def add_user():
    token = request.headers.get('Authorization')
    
    if not token or not token.startswith("Bearer "):
        return jsonify({"msg": "Missing or invalid token"}), 401
    
    token = token.split()[1]  # Extract the token part after 'Bearer'
    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        role = decoded_token.get('role')
        
        if role != 'admin':
            return jsonify({"msg": "Unauthorized: Only admins can add users"}), 403
    except jwt.ExpiredSignatureError:
        return jsonify({"msg": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"msg": "Invalid token"}), 401
    
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')

    if not username or not password or not email or not role:
        return jsonify({"msg": "Missing fields"}), 400

    # Hash the password
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Add the new user to the database

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert user into the database
        query = "INSERT INTO users (username, password_hash, email, role) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (username, hashed_password, email, role))
        conn.commit()
        conn.close()

        return jsonify({"msg": "User added successfully"}), 201

    except Error as e:
        # Handle database errors
        return jsonify({"msg": f"Database error: {str(e)}"}), 500    

if __name__ == '__main__':
    app.run(debug=True)




