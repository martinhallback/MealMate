from flask import Blueprint, current_app
from flask import Flask
from flask import abort
from flask import jsonify
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token 
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

bp = Blueprint('sign_up', __name__)



@bp.route('/sign-up', methods = ['POST'])
def sign_up():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': 'User already exists'}), 409

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : "User created successfully"}), 201