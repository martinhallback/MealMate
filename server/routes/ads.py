from flask import Blueprint
from flask import jsonify
from flask import request

from main import db

#import relevant classes
from classes import ad

bp = Blueprint('ads', __name__)

@bp.route('/ads', methods = ['GET'])
def ads():
    return  jsonify({'error' : "functionality not yet implemented", 'errorCode' : 0}), 401