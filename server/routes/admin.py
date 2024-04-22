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
    return admin.isAdmin

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
