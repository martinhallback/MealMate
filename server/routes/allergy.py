from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import allergy

bp = Blueprint('allergy', __name__)

def get_allergy(string_id):
    allergy_collection = db["allergy"]
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        print("Invalid oid")
        return False
    cursor = allergy_collection.find_one({"_id": oid})
    if cursor is None:
        return None
    query = dict(cursor)
    return allergy.Allergy(query)


@bp.route('/allergy/<string:id>', methods=['GET'])
def specific_allergy(id):
    if request.method == 'GET':
        allergy_collection = db["allergy"]
        try:
            # Convert the string ID to an ObjectId
            oid = ObjectId(id)
        except:
            return jsonify({"error": "Invalid ID format"}), 400
        # Use the ObjectId to query the database
        cursor = allergy_collection.find_one({"_id": oid})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        alg = allergy.Allergy(query)
        json_allergy = alg.serialise_client()
        return jsonify(json_allergy), 200
    else:
        return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401