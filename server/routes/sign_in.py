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



bp = Blueprint('sign_in', __name__)



@bp.route('/login' , methods=['POST'])
def login():
    login_candidate = request.get_json()
    user_list = User.query.all()

    for user in user_list:
        if login_candidate['email'] == user.email and bcrypt.check_password_hash(user.password_hash, login_candidate['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify(token = access_token, user = user.serialize())
        
    return jsonify({"msg": "Wrong username or password"}), 401
