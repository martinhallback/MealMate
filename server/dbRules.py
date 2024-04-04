#!/usr/bin/env python3
import certifi
from pymongo import MongoClient, ASCENDING
from serverAuth import credentialConfig
from bson.objectid import ObjectId
import datetime
#MongoDB connection
ca = certifi.where()
uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/admin?retryWrites=true&w=majority&appName={}&authSource=admin&ssl=true".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
databaseClient = MongoClient(uri,  tlsCAFile=ca)

#db setup
db = databaseClient["mealMate"]



#User
schema = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["email", "phoneNumber","pwHash", "university","studentID"],
        "properties" : {
            "email" : {
                "bsonType" : "string",
                "description" : "email of the user"
            },
            "phoneNumber" : {
                "bsonType" : "string",
                "description" : "phone number of the user"
            },
            "pwHash" : {
                "bsonType" : "string",
                "description" : "password hash"
            },
            "university" : {
                "bsonType" : "string",
                "description" : "university of the user"
            },
            "studentID" : {
                "bsonType" : "string",
                "description" : "student ID of the user"
            }     
        }
    }
}

validation_options = {
    "validator": schema,
    "validationLevel": "strict"  # blocks all docs not conforming to collection schema
}
db.command({'collMod':'user', 'validator' : schema, 'validationLevel' : 'strict'})







#ads
ad = db["advertisement"]
schema = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["dishName", "description", "cookDate", "quantity", "portionPrice", "imagePath", "sellerID"],
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
                "bsonType" : "date",
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

validation_options = {
    "validator": schema,
    "validationLevel": "strict"  # blocks all docs not conforming to collection schema
}
db.command({'collMod':'advertisement', 'validator' : schema, 'validationLevel' : 'strict'})