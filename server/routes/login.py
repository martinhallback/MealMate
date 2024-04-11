from flask import jsonify
from flask import request
from flask import Blueprint
from flask_jwt_extended import create_access_token

from main import db

#import relevant classes
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
    
    #Checking pw_hash
    pw_hash = query['pwHash']
    authenticate = dict(_id = query['_id'], email=email, pwHash=pw_hash)
    usr = user.User(authenticate)
    if (usr.check_password(data['password'])):
        auth['token'] = create_access_token(identity=email)
        auth['user'] = str(usr._id)
        return jsonify(auth), 200
    else:
        return jsonify({'error' : "Incorrect password", 'errorCode' : 2}), 401