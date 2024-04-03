from flask import Blueprint
from flask import jsonify
from flask import request


from main import db

#import relevant classes
from classes import advertisement

bp = Blueprint('ads', __name__)

@bp.route('/ads', methods = ['GET'])
def ads():
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        ads = db['advertisement']
        cursor = ads.find({})
        if cursor is None:
            return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
        query = list(cursor)
        advertisements = []
        for advert in query:
            ad = dict(advert)
            try:
                advertisements.append(advertisement.Advertisement(ad))
            except Exception as e:
                print(e) 
        json_ads = [advert.serialise_client() for advert in advertisements]
        return jsonify(json_ads), 200
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401