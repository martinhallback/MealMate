from flask import Blueprint
from flask import jsonify
from flask import request
from bson import ObjectId
from main import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity


from main import db

#import relevant classes
from classes import user

bp = Blueprint('change_password', __name__)


@bp.route('/change-password', methods = ['PUT'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_user = get_jwt_identity()
    cursor = db['user'].find_one({"email" : current_user})
    us = user.User(dict(cursor))
    

    currentPw = data['currentPassword']
    newPw = data['newPassword']
    if bcrypt.check_password_hash(us.pwHash, currentPw):
        newPwHash = bcrypt.generate_password_hash(newPw).decode('utf8')
        result = db['user'].update_one({'_id': us._id}, {'$set': {'pwHash': newPwHash}})
        
        return jsonify({'success' : "Successful password change"}), 200
    else:
        return jsonify({'error' : "Incorrect current password", 'errorCode' : 2}), 401