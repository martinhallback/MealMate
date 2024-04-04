from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

from classes import Purchase

bp = Blueprint('purchase', __name__)

@bp.route('/purchase', methods = ['GET'])
def purchases():
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        purchases_collection = db['purchase']
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