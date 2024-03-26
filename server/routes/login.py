from flask import jsonify
from flask import request
from flask_jwt_extended import create_access_token 

from flask import Blueprint, current_app

from main import bcrypt, db

#import relevant classes
"""import sys
sys.path.append('../classes/')
from user import User """
from classes import user

bp = Blueprint('login', __name__)



@bp.route('/login' , methods=['POST'])
def login():
    data = request.get_json()
    if not all (key in data for key in ['email', 'password']):
        return jsonify({'error': "Must enter both email and password"}), 400
    auth = {}
    email = data['email']
    
    #getting the correct user
    users = db["user"]
    cursor = users.find_one({'email' : email})
    if cursor is None:
        return jsonify({'error': "no user with this email", 'errorCode' : 1}), 401
    query = dict(cursor)
    print(query)
    pw_hash = query['PW_hash']
    #Checking pw_hash
    usr = user.User(query['_id'], email=email, pwHash=pw_hash)
    if (usr.check_password(data['password'])):
        auth['token'] = usr.create_access_token(identity=email)
        auth['user'] = usr.serialize()
        return jsonify({'authentification': auth}), 200
    else:
        return jsonify({'error' : "Incorrect password", 'errorCode' : 2}), 401