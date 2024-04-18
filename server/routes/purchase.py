from bson import ObjectId
from flask import jsonify
from flask import Blueprint
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main import db

#import relevant classes
from classes import purchase
from classes import user

bp = Blueprint('purchase', __name__)

purchase_collection = db["purchase"]

@bp.route('/purchase/<string:id>', methods = ['GET', 'PUT'])
@jwt_required()
def specific_purchase(id):
    current_user = get_jwt_identity()
    cursor = db['user'].find_one({'email' : current_user}, {'pwHash' : 0, 'isAdmin' : 0})
    usr = user.User(dict(cursor))
    
    try:
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    if (request.method == 'GET'):       
        cursor = purchase_collection.find_one({'$or' : [{"_id": oid, 'seller' : usr._id}, {"_id": oid, 'buyer' : usr._id}]})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists, or it wasn't yours"}), 404 
        query = dict(cursor)
        pur = purchase.Purchase(query)
        return jsonify(pur.serialise_client()), 200
    elif (request.method == 'PUT'):
        data = request.get_json()
        cursor = purchase_collection.find_one({'$or' : [{"_id": oid, 'seller' : usr._id}, {"_id": oid, 'buyer' : usr._id}]}, {"date" : 0})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists, or it wasn't yours"}), 404
        query = dict(cursor)
        for key in data:
            query[key] = data[key]
        try:
            psch = purchase.Purchase(query)
            psch.unserialise_from_client()
        except:
            return jsonify({'error': "Corrupted document"}), 400
        updateResult = purchase_collection.update_one({'_id' : oid}, {'$set' : psch.serialise_db()})
        if updateResult.modified_count == 1:
            return jsonify({'success' : "The advertisement was updated successfully"}), 200
        elif updateResult.modified_count > 1:
            return jsonify({'success' : "The advertisement was updated", 'error' : "More than one user was modified, contact backend", 'errorCode' : 99}), 200
        else:
            return jsonify({'error' : "advertisement was not updated"})



@bp.route('/purchase', methods = ['POST'])
@jwt_required()
def new_purchase():
    data = request.get_json()
    current_user = get_jwt_identity()
    cursor = db['user'].find_one({'email' : current_user}, {'pwHash' : 0, 'isAdmin' : 0})
    usr = user.User(dict(cursor))
    try:
        pur = purchase.Purchase(data)
    except Exception as e:
        print("Contact backend!!!\n", e)
        return jsonify({'error' : "purchase is invalid"}), 401
    pur.unserialise_from_client()
    pur.buyer= usr._id
    purchase_collection.insert_one(pur.serialise_db())
    return jsonify({'success' : "Purchase has been stored in the database"}), 200