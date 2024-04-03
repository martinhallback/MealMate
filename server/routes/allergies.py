from flask import jsonify
from flask import request
from flask import Blueprint


from main import db

#import relevant classes
from classes import allergy

bp = Blueprint('allergies', __name__)



@bp.route('/allergies' , methods=['GET'])
def allergies():
    allergies_collection = db["allergy"]
    allergies = allergies_collection.find({},{ "_id": 0})
    allergies_list = list(allergies)[1:] #remove the first element of the list, which is the validation rule
    return jsonify(allergies_list), 200





    

