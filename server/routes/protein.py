from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import user

bp = Blueprint('protein', __name__)




@bp.route('/protein/<string:id>', methods=['GET'])
def get_protein(id):
    proteins_collection = db["protein"]
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    # Use the ObjectId to query the database
    protein = proteins_collection.find_one({"_id": oid}, {"_id": 0})
    if protein:
        return jsonify(protein), 200
    else:
        return jsonify({"error": "Protein not found"}), 404