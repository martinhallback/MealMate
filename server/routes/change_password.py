from flask import Blueprint
from flask import jsonify
from flask import request
from bson import ObjectId
from main import bcrypt

from main import db

#import relevant classes
from classes import user

bp = Blueprint('change_password', __name__)


@bp.route('/change-password/<string:id>', methods = ['PUT'])
def change_password(id):
    data = request.get_json()
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    
    user_collection = db["user"]
    cursor = user_collection.find_one({"_id": oid})
    if cursor is None:
        return jsonify({'error': "No object with the given ID exists."}), 404
    query = dict(cursor)
    us = user.User(query)

    currentPw = data['currentPassword']
    newPw = data['newPassword']
    if bcrypt.check_password_hash(us.pwHash, currentPw):
        newPwHash = bcrypt.generate_password_hash(newPw).decode('utf8')
        result = user_collection.update_one({'_id': oid}, {'$set': {'pwHash': newPwHash}})

        # Print the result
        print(result.modified_count)  # This will print the number of documents modified (should be 1 if successful)
        return jsonify({'success' : "Successful password change"}), 200
    else:
        return jsonify({'error' : "Incorrect current password", 'errorCode' : 2}), 401