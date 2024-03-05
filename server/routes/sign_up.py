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
from flask import Blueprint, current_app
from main import db


bp = Blueprint('sign_up', __name__)



@bp.route('/sign-up', methods = ['POST'])
def sign_up():
    data = request.get_json()

    return jsonify({'error' : "Functionality not yet implemented"}), 401