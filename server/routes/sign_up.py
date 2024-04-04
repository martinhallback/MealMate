from flask import Blueprint
from flask import jsonify
from flask import request

from main import db

#import relevant classes
from classes import user

bp = Blueprint('sign_up', __name__)

@bp.route('/sign-up', methods = ['POST'])
def sign_up():
    data = request.get_json()
    if not all (key in data for key in['email', 'password', 'name', 'phoneNumber', 'university', 'studentID']):
        return jsonify({'error': "Invalid sign-up information", 'errorCode' : 1}), 400

    users = db['user']
    cursor = users.find_one({'email' : data['email']})
    if cursor is not None:
        return jsonify({'error': "User with this email already exists", 'errorCode' : 11}), 400
    try:
        pw = data.pop('password')
        usr = user.User(data)
        usr.set_password(pw)
        users.insert_one(usr.serialise_existing())
        return jsonify({'success' : "User was successfully added to the database"}), 200
    except:
        usrDict = dict(email=data['email'], fullName=data['name'], phoneNumber=data['phoneNumber'], 
                        uni=data['university'], studentID=data['studentID'])
        usr = user.User(usrDict)
        usr.set_password(data['password'])
        users.insert_one(usr.serialise_existing())
        return jsonify({'success' : "User was successfully added to the database, but not with all attributes in the provided data"}), 200


    
