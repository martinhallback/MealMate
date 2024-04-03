from flask import jsonify
from flask import request
from flask import Blueprint
from flask_jwt_extended import create_access_token

from main import db

#import relevant classes
from classes import user

bp = Blueprint('locations', __name__)


@bp.route('/locations' , methods=['GET'])
def locations():
    locations_collection = db["location"]
    locations = locations_collection.find({},{ "_id": 0})
    locations_list = list(locations)[1:] #remove the first element of the list, which is the validation rule
    return jsonify(locations_list), 200