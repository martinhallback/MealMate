#!/usr/bin/env python3
import certifi
from pymongo import MongoClient, ASCENDING
from serverAuth import credentialConfig

#MongoDB connection
ca = certifi.where()
uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/admin?retryWrites=true&w=majority&appName={}".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
databaseClient = MongoClient(uri,  tlsCAFile=ca)

#db setup
db = databaseClient["mealMate"]

#Collection setup


#Allergy collection
allergy = db["allergy"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["type"],
        "properties" : {
            "type" : {
                "bsonType" : "string",
                "description" : "Type of allergen, required"
            } 
        }
    }
}
#initialising fields in collection
"""
allergy.create_index([("type", ASCENDING)], unique=True)
allergy.insert_one(validation_rule)
allergy.insert_one({"type" : "laktos"})"""


#Protein collection
protein = db["protein"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["type", "class"],
        "properties" : {
            "type" : {
                "bsonType" : "string",
                "description" : "Type of protein source"
            },
            "class" : {
                "bsonType" : "string",
                "description" : "What sort of protein it is, e.g prok, beans"
            } 
        }
    }
}
#initialiser object
"""
protein.create_index([("type", ASCENDING)], unique=True)
protein.insert_one(validation_rule)
protein.insert_one({"type" : "bacon", "class" : "pork"})"""


# Advertisement
ad = db["advertisement"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["dishName", "cookDate", "quantity", "portionPrice", "sellerID"],
        "properties" : {
            "dishName" : {
                "bsonType" : "string",
                "description" : "Name of the food"
            },
            "description" : {
                "bsonType" : "string",
                "description" : "description of the food"
            },
            "cookDate" : {
                "bsonType" : "string",
                "description" : "date of cooking"
            },
            "quantity" : {
                "bsonType" : "int",
                "description" : "number of portions"
            },
            "portionPrice" : {
                "bsonType" : "double",
                "description" : "price of each portion"
            },
            "imagePath" : {
                "bsonType" : "string",
                "description" : "filepath to the image"
            },
            "sellerID" : {
                "bsonType" : "objectId",
                "description" : "Id to the seller"
            }
        }
    }
}
ad.insert_one(validation_rule)
