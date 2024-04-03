from bson import ObjectId
from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import protein

bp = Blueprint('protein', __name__)


@bp.route('/protein/<string:id>', methods=['GET'])
def specific_protein(id):
    protein_collection = db["protein"]
    try:
        # Convert the string ID to an ObjectId
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    # Use the ObjectId to query the database
    cursor = protein_collection.find_one({"_id": oid})
    if cursor is None:
        return jsonify({'error': "No object with the given ID exists."}), 404
    query = dict(cursor)
    prot = protein.Protein(objID=query['_id'], type=query['type'], source=query['source'])
    json_protein = prot.serialise_client()
    
    return jsonify(json_protein), 200



    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401