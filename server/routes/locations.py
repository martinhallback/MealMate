from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import location

bp = Blueprint('locations', __name__)


@bp.route('/locations', methods = ['GET'])
def locations():
    if request.method == 'GET':
        # data = request.get_json() #For other requests than get
        locations_collection = db['location']
        cursor = locations_collection.find({})
        if cursor is None:
            return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
        query = list(cursor)
        locations = []
        for item in query:
            loc = dict(item)
            try:
                locations.append(location.Location(loc))
            except Exception as e:
                print(e) 
        json_locations = [item.serialise_client() for item in locations]

        return jsonify(json_locations), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401