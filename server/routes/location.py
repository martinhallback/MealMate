from flask import jsonify
from flask import request
from flask import Blueprint
from bson import ObjectId

from main import db

#import relevant classes
from classes import location

bp = Blueprint('location', __name__)


@bp.route('/location/<string:id>', methods=['GET'])
def specific_location(id):
    if request.method == 'GET':
        location_collection = db["location"]
        try:
            # Convert the string ID to an ObjectId
            oid = ObjectId(id)
        except:
            return jsonify({"error": "Invalid ID format"}), 400
        # Use the ObjectId to query the database
        cursor = location_collection.find_one({"_id": oid})
        if cursor is None:
            return jsonify({'error': "No object with the given ID exists."}), 404
        query = dict(cursor)
        loc = location.Location(query)
        json_location = loc.serialise_client()
        return jsonify(json_location), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401
    