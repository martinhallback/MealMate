from flask import Blueprint
from flask import jsonify
from flask import request
from bson.objectid import ObjectId


from main import db

#import relevant classes
from classes import advertisement

bp = Blueprint('ads', __name__)

@bp.route('/ads', methods = ['GET'])
def ads():
    # data = request.get_json() #For other requyests than get
    ads = db['advertisement']
    cursor = ads.find({})



    #Should return a list of all current ads, with the information: image, title, description and seller

    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401