from bson import ObjectId
from flask import jsonify
from flask import Blueprint
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity


from main import db

# import relevant classes
from classes import user

bp = Blueprint('user', __name__)


@bp.route('/user', methods=['GET', 'PUT'])
@jwt_required()
def user_profile():
    current_user = get_jwt_identity()
    cursor = db['user'].find_one({'email' : current_user}, {'pwHash' : 0, 'isAdmin' : 0})
    if cursor is None:
        return jsonify({'error': "Your user could not be found"}), 400
    usr = user.User(dict(cursor))

    if request.method == 'GET':
        return jsonify(usr.serialise_client()), 200
    
    elif request.method == 'PUT':
        data = request.get_json()
             
        removeData = {}

        if data['university'] == '':
            data.pop('university')
            removeData['university'] = ''

        if data['location'] == '':
            data.pop('location')
            removeData['location'] = ''

        if data['PNumber'] == '':
            data.pop('PNumber')
            removeData['PNumber'] = ''

        if data['address'] == '':
            data.pop('address')
            removeData['address'] = ''
        
        changes = user.User(data)
        changes.unserialise_from_client()
        result = db['user'].update_one({'_id': usr._id}, {'$set': changes.serialise_db(), '$unset': removeData})
        return jsonify({'success' : "Successfully updated the user"}), 200
        


@bp.route('/user/<string:id>', methods=['GET'])
def redacted_user(id):
    try:
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    if request.method == 'GET':
        user_collection = db["user"]
        cursor = user_collection.find_one({"_id": oid}, {'pwHash': 0, 'phoneNumber': 0, 'PNumber': 0, 'address': 0, 'isAdmin': 0})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        us = user.User(query)
        return jsonify(us.serialise_client()), 200



@bp.route('/seller/<string:id>', methods=['GET'])
@jwt_required()
def contact_seller_info(id):
    try:
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    cursor = db['user'].find_one({"_id": oid}, {'phoneNumber' : 1, 'name' : 1, 'email' : 1})
    if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
    query = dict(cursor)
    seller = user.User(query)
    return jsonify(seller.serialise_client()), 200
    