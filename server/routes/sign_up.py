from flask import Blueprint
from flask import jsonify
from flask import request

from main import db

#import relevant classes
from classes import user

bp = Blueprint('sign_up', __name__)


@bp.route('/sign-up', methods = ['POST'])
def sign_up():
    data = request.json()
    if not all (key in data for key in['email', 'password', 'name', 'phonenumber', 'university', 'student_ID']):
        return jsonify({'error': "Invalid sign-up information", 'errorCode' : 1}), 400

    

    db.mealMate.insert({
        "random" : "user",
        "What" : "is up?"
    })
    data = request.get_json()

    return jsonify({'error' : "Functionality not yet implemented"}), 401