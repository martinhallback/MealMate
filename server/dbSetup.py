#!/usr/bin/env python3
import certifi
from pymongo import MongoClient, ASCENDING
from serverAuth import credentialConfig
from bson import ObjectId
import datetime
#MongoDB connection
ca = certifi.where()
#uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/admin?retryWrites=true&w=majority&appName={}".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
admin_uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/?retryWrites=true&w=majority&appName={}&authSource=admin".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])

databaseClient = MongoClient(admin_uri,  tlsCAFile=ca)

#db setup
db = databaseClient["mealMate"]

#Collection setup

#EXAMPLE COLLECTION FROM W3
"""book_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["title", "authors", "publication_date", "type", \
        "copies"],
        "properties": {
            "title": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "authors": {
                "bsonType": "array",
                "description": "must be an array and is required",
                "items": {
                    "bsonType": "objectId",
                    "description": "must be an objectId and is required"
                },
                "minItems": 1,
            },
            "publication_date": {
                "bsonType": "date",
                "description": "must be a date and is required"
            },
            "type": {
                "enum": ["hardcover", "paperback"],
                "description": "can only be one of the enum values and \
                is required"
            },
            "copies": {
                "bsonType": "int",
                "description": "must be an integer greater than 0 and \
                is required",
                "minimum": 0
            }
        }
    }
}
library_db.command("collMod", "book", validator=book_validator)
"""
#User
user = db["user"]
user_validation = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["email", "pwHash", "name"],
        "properties" : {
            "email" : {
                "bsonType" : "string",
                "description" : "Email of user"
            },
            "pwHash" : {
                "bsonType" : "string",
                "description" : "Hashed password"
            },
             "name" : {
                "bsonType" : "string",
                "description" : "Name of user"
            },
            "phoneNumber" : {
                "bsonType" : "string",
                "description" : "Phone number of user"
            },
            "PNumber" : {
                "bsonType" : "string",
                "description" : "Personal number of user"
            },
             "isVerified" : {
                "bsonType" : "bool",
                "description" : "If user is verified"
            },
             "university" : {
                "bsonType" : "objectId",
                "description" : "University of user"
            },
             "studentID" : {
                "bsonType" : "string",
                "description" : "Student ID of user"
            },
             "address" : {
                "bsonType" : "string",
                "description" : "Address of user"
            },
             "location" : {
                "bsonType" : "objectId",
                "description" : "Location of user"
            },
            "isAdmin" : {
                "bsonType" : "bool",
                "description" : "If user is an admin"
            }
        }
    }
}
if __name__ == "__main__":
    db.command("collMod", "user",  validator=user_validation)



#Allergy collection
allergy_validation = {
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
if __name__ == "__main__":
    db.command("collMod", "allergy",  validator=allergy_validation)


#initialising fields in collection
"""
allergy.create_index([("type", ASCENDING)], unique=True)
allergy.insert_one(validation_rule)
allergy.insert_one({"type" : "laktos"})"""


#Protein collection
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["type", "source"],
        "properties" : {
            "type" : {
                "bsonType" : "string",
                "description" : "The specific type of protein, for example pork, beef, salmon etc."
            },
            "source" : {
                "bsonType" : "string",
                "description" : "The source of protein, for example meat, fish, vegan etc."
            } 
        }
    }
}
if __name__ == "__main__":
    db.command("collMod", "protein",  validator=allergy_validation)
#initialiser object

#Location
location = db["location"]
location_validation = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["city", "area"],
        "properties" : {
            "city" : {
                "bsonType" : "string",
                "description" : "Name of city"
            },
            "area" : {
                "bsonType" : "string",
                "description" : "Name of area"
            } 
        }
    }
}

if __name__ == "__main__":
    db.command("collMod", "location",  validator=location_validation)

"""location.insert_one(validation_rule)
location.insert_one({"city" : "Linköping", "area" : "Ryd"})"""""



# Advertisement collection
advert_validation = {
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
#if __name__ == "__main__":
    #db.command("collMod", "advertisement",  validator=advert_validation)


# Purchase collection
purchase_validation = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["totalPrice", "quantity", "buyer", "seller", "advertisement"],
        "properties" : {
            "date" : {
                "bsonType" : "date",
                "description" : "Date of purchase"
            },
            "totalPrice" : {
                "bsonType" : "double",
                "description" : "Total price of purchase"
            },
            "quantity" : {
                "bsonType" : "int",
                "description" : "Number of portions"
            },
            "sellerRating" : {
                "bsonType" : "double",
                "description" : "Rating of seller"
            },
            "reviewText" : {
                "bsonType" : "string",
                "description" : "Review of seller"
            },
            "buyer" : {
                "bsonType" : "objectId",
                "description" : "Id to the buyer"
            },
            "seller" : {
                "bsonType" : "objectId",
                "description" : "Id to the seller"
            },
            "advertisement" : {
                "bsonType" : "objectId",
                "description" : "Id to the advertisement"
            }
        }
    }
}
if __name__ == "__main__":
    db.command("collMod", "purchase",  validator=purchase_validation)

