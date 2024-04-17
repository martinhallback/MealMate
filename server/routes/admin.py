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

@bp.route('/admin', methods = ['GET'])
@jwt_required()
def admin_view():
    current_user = get_jwt_identity()
    if not verify_admin(current_user):
        return jsonify({'error' : "You don't have the autority for this request"}), 403
    return jsonify({'error' : "functionality not yet implemented, but you are an admin", 'errorcode' : 0})