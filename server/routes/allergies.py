from flask import jsonify
from flask import request
from flask import Blueprint


from main import db

#import relevant classes
from classes import allergy

bp = Blueprint('allergies', __name__)

def query_to_allergies(query):
    allergies = []
    for item in query:
        alg = dict(item)
        try:
            allergies.append(allergy.Allergy(alg))
        except Exception as e:
            print(e)
    return allergies
            


@bp.route('/allergies', methods = ['GET'])
def allergies():
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        allergies_collection = db['allergy']
        cursor = allergies_collection.find({})
        if cursor is None:
            return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
        allergies = query_to_allergies(list(cursor))

        json_allergies = [item.serialise_client() for item in allergies]
        return jsonify(json_allergies), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401





    

