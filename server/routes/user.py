from bson import ObjectId
from flask import jsonify
from flask import Blueprint
from flask import request

from main import db

# import relevant classes
from classes import user

bp = Blueprint('user', __name__)

user_collection = db["user"]


@bp.route('/user/<string:id>', methods=['GET', 'PUT'])
def specific_user(id):
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    if request.method == 'GET':
        # Should only be allowed for GET
        # Use the ObjectId to query the database
        cursor = user_collection.find_one({"_id": oid}, {'pwHash': 0, 'phoneNumber': 0, 'PNumber': 0, 'address': 0, 'isAdmin': 0})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        us = user.User(query)
        return jsonify(us.serialise_client()), 200
    
    elif request.method == 'PUT':
        data = request.get_json()
        try:
            # Convert the string ID to an ObjectId
            oid = ObjectId(id)
        except:
            return jsonify({"error": "Invalid ID format"}), 400
        
        result = user_collection.update_one({'_id': oid}, {'$set': data})
        
        # Print the result
        print(result.modified_count)  # This will print the number of documents modified (should be 1 if successful)
        return '', 200
        


@bp.route('/user/<string:id>/full', methods=['GET'])
def full_user(id):
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    if request.method == 'GET':
        # Should only be allowed for GET
        # Use the ObjectId to query the database
        cursor = user_collection.find_one({"_id": oid})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        us = user.User(query)
        return jsonify(us.serialise_client()), 200


@bp.route('/user', methods=['PUT'])
def update_user():
        data = request.get_json()
        us = user.User(data.get('user'))
        us.set_all_attributes(data.get('attributes'))
        us.unserialise_from_client()
        newUser = us.serialise_db()
        id =newUser.pop('_id')
        print(newUser)
        result = user_collection.update_one({'_id': id}, {'$set': newUser})
        
        # Print the result
        print(result.modified_count)  # This will print the number of documents modified (should be 1 if successful)
        return jsonify(us.serialise_client()), 200
    