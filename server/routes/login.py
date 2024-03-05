from flask import jsonify
from flask import request
from flask_jwt_extended import create_access_token 

from flask import Blueprint, current_app

from main import bcrypt


bp = Blueprint('login', __name__)



@bp.route('/login' , methods=['POST'])
def login():
    #Just send an authorisation token for now before log-in functionality has been implemented
        
    return jsonify({"error": "Functionality has not yet been implemented"}), 401
