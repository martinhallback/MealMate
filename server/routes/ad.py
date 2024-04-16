from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement, user

bp = Blueprint('ad', __name__)

@bp.route('/ad/<string:obj_id>', methods = ['GET', 'PUT', 'DELETE'])
def ad(obj_id):
    # data = request.get_json() #For other requests than get
    ads = db['advertisement']
    objID = ObjectId(obj_id)

    cursor = ads.find_one({'_id' : objID})
    if cursor is None:
        return jsonify({'error': "No advertisement with that id"}), 404
    query = dict(cursor)
    if request.method == 'GET':    
        try: 
            advert = advertisement.Advertisement(query)
            return jsonify(advert.serialise_client()), 200
        except Exception as e:
            print(e) 
            return jsonify({'error': "Advert object in database was invalid", 'errorCode' : 41}), 503
    if request.method == 'PUT':
        data = request.get_json()   
        """ads.update_one({'_id' : objID}, {'$set' : data})
        return jsonify({'success' : "The user was updated successfully"}), 200"""
        
        for key in data:
            query[key] = data[key]
        try:
            advert = advertisement.Advertisement(query)
            advert.unserialise_from_client()
        except Exception as e:
            print(e)
            return jsonify({'error' : "All provided parameters are not part of an advertisement"}), 401
        
        updateResult = ads.update_one({'_id' : objID}, {'$set' : advert.serialise_db()})
        if updateResult.modified_count == 1:
            return jsonify({'success' : "The advertisement was updated successfully"}), 200
        elif updateResult.modified_count > 1:
            return jsonify({'success' : "The advertisement was updated", 'error' : "More than one user was modified, contact backend", 'errorCode' : 99}), 200
        else:
            return jsonify({'error' : "advertisement was not updated"})

    if request.method == 'DELETE':
        """data = request.get_json(force = True)
        if data is None or 'user' not in data:
            print(data)
            print(data['user'])
            return jsonify({'error' : "user object from authentification must be included", 'errorCode' : 5}), 401
        usr = ObjectId(data['user'])
        
        delete_result = ads.delete_one({'_id' : objID, 'sellerID' : usr})"""
        delete_result = ads.delete_one({'_id' : objID})
        print(delete_result)
        if delete_result.deleted_count > 0:
            return jsonify({'success' : "Your advertisement has been deleted"}), 200
        else:
            return jsonify({'error' : "The given ad was not yours"}), 403
        


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
        advert.set_seller_id(usr._id)    

        ads = db['advertisement']
        ads.insert_one(advert.serialise_db())
        return jsonify({'success' : "Your advertisement has been published"}), 200
    return jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401