from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import university

bp = Blueprint('universities', __name__)

universities_collection = db['university']


@bp.route('/universities', methods = ['GET'])
def universities():
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        universities_collection = db['university']
        cursor = universities_collection.find({})
        if cursor is None:
            return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
        query = list(cursor)
        universities = []
        for item in query:
            uni = dict(item)
            try:
                universities.append(university.University(uni))
            except Exception as e:
                print(e) 
        json_universities = [item.serialise_client() for item in universities]
        return jsonify(json_universities), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401