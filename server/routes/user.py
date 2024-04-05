from bson import ObjectId
from flask import jsonify
from flask import Blueprint

from main import db

#import relevant classes
from classes import user

bp = Blueprint('user', __name__)


@bp.route('/user/<string:id>')
def specific_user(id):
    #Should only be allowed for GET
    user_collection = db["user"]
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    # Use the ObjectId to query the database
    cursor = user_collection.find_one({"_id": oid})
    if cursor is None:
        return jsonify({'error': "No object with the given ID exists."}), 404
    query = dict(cursor)
    us = user.User(query)
    return jsonify(us.serialise_client()), 200