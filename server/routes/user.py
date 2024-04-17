from bson import ObjectId
from flask import jsonify
from flask import Blueprint
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main import db

# import relevant classes
from classes import user

from routes.admin import verify_admin


bp = Blueprint('user', __name__)


@bp.route('/user', methods=['GET', 'PUT'])
@jwt_required
def specific_user():    
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    cursor = db['user'].find_one({'email' : current_user})
    
    if request.method == 'GET':
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        us = user.User(query)
        return jsonify(us.serialise_client()), 200

    elif request.method == 'PUT':
        data = request.get_json()
             
        removeData = {}

        if data['university'] == '':
            data.pop('university')
            removeData['university'] = ''

        if data['location'] == '':
            data.pop('location')
            removeData['location'] = ''
        
        usr = user.User(data)
        usr.unserialise_from_client()
        del usr._id

        user_collection = db["user"]
        result = user_collection.update_one({'_id': cursor['_id']}, {'$set': usr.serialise_db(), '$unset': removeData})
        
        # Print the result
        print(result.modified_count)  # This will print the number of documents modified (should be 1 if successful)
        return jsonify({'success' : "Successfully updated the user"}), 200
        


@bp.route('/user/<string:id>', methods=['GET'])
@jwt_required()
def redacted_user(id):
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    if request.method == 'GET':
        # Should only be allowed for GET
        # Use the ObjectId to query the database
        user_collection = db["user"]
        cursor = user_collection.find_one({"_id": oid}, {'pwHash': 0, 'phoneNumber': 0, 'PNumber': 0, 'address': 0, 'isAdmin': 0})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        us = user.User(query)
        return jsonify(us.serialise_client()), 200
    