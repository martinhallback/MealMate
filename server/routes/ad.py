from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement, user

bp = Blueprint('ad', __name__)

@bp.route('/ad/<string:obj_id>', methods = ['GET', 'PUT'])
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
    if request.method == 'PUT':
        return jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401

@bp.route('/ad', methods=['POST'])
#@jwt_required()
def post_ads():
    data = request.get_json()
    try:
        usr = user.User(data['user'])
    except Exception as e:
        print("Contact backend!!!\n", e)
        return jsonify({'error' : "Your user is invalid"}), 401
    usr.unserialise_from_client()
    if usr.isVerified:
        try:
            advert = advertisement.Advertisement(data['ad'])
        except Exception as e:
            print("Contact backend!!!\n", e)
            return jsonify({'error' : "advert is invalid"}), 401
        #Rework ad object.
        advert.unserialise_from_client()
        advert.set_seller_info(usr)    

        ads = db['advertisement']
        ads.insertOne(advert.serialise_db())
        return jsonify({'success' : "Your advertisement has been published"}), 200
    return jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401