from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from main import db

from classes import purchase

from routes.admin import verify_admin

bp = Blueprint('purchases', __name__)

purchases_collection = db['purchase']


@bp.route('/purchases', methods = ['GET'])
@jwt_required()
def purchases():
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    cursor = purchases_collection.find({})
    if cursor is None:
        return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
    query = list(cursor)
    purchases = []
    for item in query:
        pur = dict(item)
        try:
            purchases.append(purchase.Purchase(pur))
        except Exception as e:
            print(e) 
    json_purchases = [item.serialise_client() for item in purchases]
    return jsonify(json_purchases), 200



@bp.route('/purchases/<string:role>', methods = ['GET'])
@jwt_required()
def user_purchases(role):
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    oid = db['user'].find_one({'email' : current_user}, {'_id' : 1})
    
    if request.method == 'GET':
        if role == 'buyer':
            cursor = purchases_collection.find({"buyer": oid['_id']})
        elif role == 'seller':
            cursor = purchases_collection.find({"seller": oid['_id']})
        else:
            return jsonify({'error' : "Invalid URL"}), 404
        if cursor is None:
            return 204
        query = list(cursor)
        purchases = []
        for item in query:
            pur = dict(item)
            try:
                purchases.append(purchase.Purchase(pur))
            except Exception as e:
                print(e) 
        json_purchases = [item.serialise_client() for item in purchases]
        return jsonify(json_purchases), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401