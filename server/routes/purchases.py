from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from main import db

from classes import purchase
from classes import user

from routes.admin import verify_admin

bp = Blueprint('purchases', __name__)


@bp.route('/purchases', methods = ['GET'])
@jwt_required()
def purchases():
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    cursor = db['purchase'].find({})
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
    cursor = db['user'].find_one({'email' : current_user})
    beller = user.User(dict(cursor))

    if role == 'buyer':
        cursor = db['purchase'].find({"buyer": beller._id})
    elif role == 'seller':
        cursor = db['purchase'].find({"seller": beller._id})
    else:
        return jsonify({'error' : "Invalid URL"}), 404
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