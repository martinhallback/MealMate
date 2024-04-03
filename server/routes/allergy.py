from flask import jsonify
from flask import request
from flask import Blueprint
from flask_jwt_extended import create_access_token

from main import db

#import relevant classes
from classes import user

bp = Blueprint('allergy', __name__)



@bp.route('/allergies' , methods=['GET'])
def allergies():
    allergies_collection = db["allergy"]
    allergies = allergies_collection.find({},{ "_id": 0})
    allergies_list = list(allergies)[1:] #remove the first element of the list, which is the validation rule
    return jsonify(allergies_list), 200


""""@bp.route('/allergies', methods=['POST'])
def add_allergy():
    allergies_collection = db["allergy"]
    data = request.get_json()
    allergy = {"type" : data["type"]}
    allergies_collection.insert_one(allergy)
    return jsonify({"message" : "Allergy added"}), 200"""""


    

