from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement, user

bp = Blueprint('admin', __name__)

#Helper functions:
def verify_admin(verify):
    cursor = db['user'].find_one({'email' : verify})
    admin = user.User(dict(cursor))
    return admin.isAdministrator()

@bp.route('/admin/is_admin', methods = ['GET'])
@jwt_required()
def isAdmin():
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return 404
    else:
        return 204


@bp.route('/admin/users', methods = ['GET'])
@jwt_required()
def admin_view():
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    cursor = db['user'].find({})
    query = list(cursor)
    users = []
    for item in query:
        usr = dict(item)
        try:
            users.append(users.User(usr))
        except Exception as e:
            print(e)
    return jsonify([item.serialise_client() for item in users]), 200

@bp.route('/admin/verify/<string:id>', methods = ['PUT'])
@jwt_required()
def verify_user(id):
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the authority for this request"}), 403
    try:
        obj_id = ObjectId(id)
    except:
        return 400
    update_result = db['user'].update_one({'_id' : obj_id}, {'$set' : {'isVerified' : True}})
    if update_result.modified_count == 1:
        return jsonify({'success' : "user is now verified"}), 200
    else:
        return jsonify({'error' : "User was not found, or already verified"}), 400


@bp.route('/admin/admin/<string:id>', methods = ['PUT'])
@jwt_required()
def verify_user(id):
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the authority for this request"}), 403
    try:
        obj_id = ObjectId(id)
    except:
        return 400
    update_result = db['user'].update_one({'_id' : obj_id}, {'$set' : {'isAdmin' : True}})
    if update_result.modified_count == 1:
        return jsonify({'success' : "user is now an admin"}), 200
    else:
        return jsonify({'error' : "User was not found, or already an admin"}), 400
