from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement, user

bp = Blueprint('ad', __name__)
       

@bp.route('/ad/<string:obj_id>', methods=['GET'])
def get_ad(obj_id):
    ads = db['advertisement']
    try:
        objID = ObjectId(obj_id)
    except:
        return jsonify({'error': "invalid id"}), 400

    cursor = ads.find_one({'_id': objID})
    if cursor is None:
        return jsonify({'error': "No advertisement with that id"}), 404

    query = dict(cursor)
    try:
        advert = advertisement.Advertisement(query)
        return jsonify(advert.serialise_client()), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Advert object in database was invalid", 'errorCode': 41}), 503


@bp.route('/ad/<string:obj_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def update_or_delete_ad(obj_id):
    current_user = get_jwt_identity()
    ads = db['advertisement']
    try:
        objID = ObjectId(obj_id)
    except:
        return jsonify({'error': "invalid id"}), 400

    cursor = db['user'].find_one({"email": current_user})
    usr = user.User(dict(cursor))

    if request.method == 'PUT':
        cursor = ads.find_one({'_id': objID, 'sellerID': usr._id})
        if cursor is None:
            return jsonify({'error': "None of your advertisements have that id"}), 404

        query = dict(cursor)
        data = request.get_json()
        for key in data:
            query[key] = data[key]

        try:
            advert = advertisement.Advertisement(query)
            advert.unserialise_from_client()
        except Exception as e:
            print(e)
            return jsonify({'error': "All provided parameters are not part of an advertisement"}), 401

        updateResult = ads.update_one({'_id': objID, 'sellerID': usr._id}, {'$set': advert.serialise_db()})
        if updateResult.modified_count == 1:
            return jsonify({'success': "The advertisement was updated successfully"}), 200
        elif updateResult.modified_count > 1:
            return jsonify({'success': "The advertisement was updated", 'error': "More than one user was modified, contact backend", 'errorCode': 99}), 200
        else:
            return jsonify({'error': "advertisement was not updated"}), 500

    elif request.method == 'DELETE':
        delete_result = ads.delete_one({'_id': objID})
        if delete_result.deleted_count > 0:
            return jsonify({'success': "Your advertisement has been deleted"}), 200
        else:
            return jsonify({'error': "The given ad is already deleted"}), 403


@bp.route('/ad', methods=['POST'])
@jwt_required()
def post_ads():
    data = request.get_json()
    current_user = get_jwt_identity()
    cursor = db['user'].find_one({"email": current_user})
    usr = user.User(dict(cursor))
    if usr.isVerified:
        try:
            print(data)
            advert = advertisement.Advertisement(data)
        except Exception as e:
            print("Contact backend!!!\n", e)
            return jsonify({'error' : "advert is invalid"}), 401
        #Rework ad object.
        advert.unserialise_from_client()
        advert.set_seller_id(usr._id)    
        print(advert)
        print(advert.serialise_db())
        ads = db['advertisement']
        ads.insert_one(advert.serialise_db())
        return jsonify({'success' : "Your advertisement has been published"}), 200
    return jsonify({'error' : "You need to log in"}), 401


@bp.route('/ad/quantity/<string:obj_id>', methods=['PUT'])
def change_quantity_ad(obj_id):
    try:
        objID = ObjectId(obj_id)
    except:
        return jsonify({'error': "invalid id"}), 400
    ads = db['advertisement']
    data = request.get_json()
    updateResult = ads.update_one({'_id': objID}, {'$set': {'quantity' : int(data['quantity'])}})
    if updateResult.modified_count == 1:
        return jsonify({'success': "The advertisement was updated successfully"}), 200
    else:
        return jsonify({'error': "Advertisement not found"}), 404