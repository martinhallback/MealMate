from flask import jsonify
from flask import request
from flask import Blueprint

from main import db

#import relevant classes
from classes import protein

bp = Blueprint('proteins', __name__)



@bp.route('/proteins' , methods=['GET'])
def proteins():
    proteins_collection = db["protein"]
    proteins = proteins_collection.find({},{ "_id": 0})
    proteins_list = list(proteins)[1:] #remove the first element of the list, which is the validation rule
    return jsonify(proteins_list), 200