from flask import Blueprint
from flask import jsonify
from flask import request

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement

bp = Blueprint('ad', __name__)

@bp.route('/ad/<string:obj_id>', methods = ['GET'])
def ad(obj_id):
    # data = request.get_json() #For other requests than get
    if request.method == 'GET':
        ads = db['advertisement']
        objID = ObjectId(obj_id)

        cursor = ads.find_one({'_id' : objID})
        if cursor is None:
            return jsonify({'error': "No advertisement with that id"}), 404
        query = dict(cursor)
        print(query)
        try: 
            advert = advertisement.Advertisement(query)
            return jsonify(advert.serialise_client()), 200
        except Exception as e:
            print(e) 
            return jsonify({'error': "Advert object in database was invalid", 'errorCode' : 41}), 503