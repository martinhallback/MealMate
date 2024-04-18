from flask import Blueprint
from flask import jsonify
from flask import request
from werkzeug.exceptions import BadRequest

from bson import ObjectId


from main import db

#import relevant classes
from classes import advertisement

from routes import allergy

bp = Blueprint('ads', __name__)

def query_to_adverts(inDict):
    advertisements = []
    for advert in inDict:
            ad = dict(advert)
            try:
                advertisements.append(advertisement.Advertisement(ad))
            except Exception as e:
                print(e) 
    return advertisements

def query_to_allergies(inDict):


    return None

def query_to_protiens(inDict):
    return None

def query_to_protein_source(inDict):
    return None


# GET for all ads
@bp.route('/ads', methods = ['GET'])
def ads():
    ads = db['advertisement']
    cursor = ads.find({})
    if cursor is None:
        return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
    query = list(cursor)
    adverts = []
    for item in query:
        ad = dict(item)
        try:
            adverts.append(advertisement.Advertisement(ad))
        except Exception as e:
            print(e) 
    json_ads = [item.serialise_client() for item in adverts]
    return jsonify(json_ads), 200
    

# GET all ads for a given sellerID
@bp.route('/ads/<string:id>', methods = ['GET'])
def sellerAds(id):
    try:
        oid = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
    ads = db['advertisement']
    cursor = ads.find({"sellerID": oid})
    if cursor is None:
        return jsonify({'error': "Database collection could not be accessed ", 'errorCode' : 31}), 503
    query = list(cursor)
    adverts = []
    for item in query:
        ad = dict(item)
        try:
            adverts.append(advertisement.Advertisement(ad))
        except Exception as e:
            print(e) 
    json_ads = [item.serialise_client() for item in adverts]
    return jsonify(json_ads), 200


# GET all ads with filtering
@bp.route('/ads/filter', methods=['GET'])
def adverts():
    data={}
    try:
        if request.args.get('portionPrice') is not None:
            data['portionPrice'] = int(request.args.get('portionPrice'))
        if request.args.get('proteinType') is not None:
            data['proteinType'] = request.args.get('proteinType').split(',')
        if request.args.get('allergy') is not None:
            data['allergy'] = request.args.get('allergy').split(',')
        if request.args.get('proteinSource') is not None:    
            data['proteinSource'] = request.args.get('proteinSource').split(',')
    except BadRequest as e: 
        data = None
        return jsonify({'error': "Missing body for filter functionality",}), 404
    ads = db['advertisement']
    query_parameters={}
    def purge_false(dic):
        ret = {}
        for k in dic:
            if dic[k]:
                ret[k]=dic[k]
        return ret
    data = purge_false(data)
    
    if 'portionPrice' in data:
        #Exclude adverts who are more expensive than given portionPrice
        maxPrice = data['portionPrice']
        query_parameters["portionPrice"] = {"$lte": maxPrice}
    if 'proteinType' in data:        
        #Exclude protein types
        protein_oid = [ObjectId(obj_id) for obj_id in data['proteinType']]
        query_parameters["protein"] = {"$nin" : protein_oid}
    if 'allergy' in data:
        #exclude allergies
        #allergies = [allergy.get_allergy(allergy_id) for allergy_id in data['allergy']]
        allergies_oid = [ObjectId(obj_id) for obj_id in data['allergy']]
        query_parameters["allergy"] = {"$nin" : allergies_oid}
    if 'proteinSource' in data:
        #Exclude Protein sources/groups
        protein_groups = data['proteinSource']
        cursor = db['protein'].find({"source" : {"$in" : protein_groups}}, {'_id' : 1})
        forbidden_proteins = [ObjectId(obj['_id']) for obj in cursor]
        
        if 'protein' in query_parameters:
            query_parameters['protein']['$nin'].append(forbidden_proteins)
        else:
            query_parameters["protein"] = {"$nin" : forbidden_proteins}

    if query_parameters:
        filtered_ads = query_to_adverts(ads.find(query_parameters))
        return jsonify([ad.serialise_client() for ad in filtered_ads]), 200
    else:
        return jsonify({'error': "No valid query parameters were passed "}), 404