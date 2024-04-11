from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

from classes import purchase

bp = Blueprint('purchases', __name__)

purchases_collection = db['purchase']


@bp.route('/purchases', methods = ['GET'])
def purchases():
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
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
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401



@bp.route('/purchases/<string:id>/<string:role>', methods = ['GET'])
def user_purchases(id, role):
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        if role == 'buyer':
            cursor = purchases_collection.find({"buyer": oid})
        elif role == 'seller':
            cursor = purchases_collection.find({"seller": oid})
        else:
            return jsonify({'error' : "Invalid URL"}), 404
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
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401