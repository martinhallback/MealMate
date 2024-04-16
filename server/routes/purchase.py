from bson import ObjectId
from flask import jsonify
from flask import Blueprint
from flask import request
from flask_jwt_extended import jwt_required

from main import db

#import relevant classes
from classes import purchase

bp = Blueprint('purchase', __name__)

purchase_collection = db["purchase"]

@bp.route('/purchase/<string:id>', methods = ['GET'])
def specific_purchase(id):
    #Should only be allowed for GET
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    # Use the ObjectId to query the database
    cursor = purchase_collection.find_one({"_id": oid})
    if cursor is None:
        return jsonify({'error': "No object with the given ID exists."}), 404
    query = dict(cursor)
    pur = purchase.Purchase(query)
    return jsonify(pur.serialise_client()), 200



@bp.route('/purchase', methods = ['POST'])
#@jwt_required()
def new_purchase():
    data = request.get_json()
    try:
        pur = purchase.Purchase(data)
    except Exception as e:
        print("Contact backend!!!\n", e)
        return jsonify({'error' : "purchase is invalid"}), 401
    pur.unserialise_from_client()
    purchase_collection.insert_one(pur.serialise_db())
    return jsonify({'success' : "Purchase has been stored in the database"}), 200