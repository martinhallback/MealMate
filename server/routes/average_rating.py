from bson import ObjectId
from flask import jsonify
from flask import Blueprint

from main import db

#import relevant classes
from classes import purchase


bp = Blueprint('review', __name__)

#purchase_collection = db["purchase"]



@bp.route('/averageRating/<string:id>', methods = ['GET'])
def get_review(id):
    try:
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    
    cursor = db['purchase'].find({'seller' : oid})
    if cursor is None:
        return jsonify({'message': "No previous purchases made", 'averageRating' : None, 'numberOfReviews' : 0}), 200
    query = list(cursor)
    purchases = []
    for item in query:
        pur = dict(item)
        try:
            purchases.append(purchase.Purchase(pur))
        except Exception as e:
            print(e) 
    total_rating = 0
    number_ratings = 0
    for psch in purchases:
        if psch.sellerRating is not None:
            total_rating += psch.sellerRating
            number_ratings += 1
    if number_ratings == 0:
        return jsonify({'message': "No reviews have been submitted", 'averageRating' : None, 'numberOfReviews' : 0}), 200
    else:    
        average_rating = total_rating/number_ratings
        return jsonify({'averageRating' : float(average_rating), 'numberOfReviews' : number_ratings}), 200