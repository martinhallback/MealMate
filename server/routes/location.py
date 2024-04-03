from flask import jsonify
from flask import request
from flask import Blueprint
from bson import ObjectId

from main import db

#import relevant classes
from classes import location

bp = Blueprint('location', __name__)



@bp.route('/location/<string:id>', methods=['GET'])
def location(id):
    location_collection = db["location"]
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    # Use the ObjectId to query the database
    location = location_collection.find_one({"_id": oid}, {"_id": 0})
    if location:
        return jsonify(location), 200
    else:
        return jsonify({"error": "Location not found"}), 404