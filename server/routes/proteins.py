from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import protein

bp = Blueprint('proteins', __name__)


@bp.route('/proteins', methods = ['GET'])
def proteins():
    # data = request.get_json() #For other requests than get
    proteins_collection = db['protein']
    cursor = proteins_collection.find({})
    if cursor is None:
        return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
    query = list(cursor)
    proteins = []
    for item in query:
        prot = dict(item)
        try:
            proteins.append(protein.Protein(
                objID=prot['_id'], type=prot['type'], source=prot['source']
                ))
        except Exception as e:
            print(e) 
    json_proteins = [item.serialise_client() for item in proteins]

    return jsonify(json_proteins), 200



    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401