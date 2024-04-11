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
    db.command("collMod", "user",  validator=allergy_validation)


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
#initialiser object

#Location
location = db["location"]
validation_rule = {
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

"""location.insert_one(validation_rule)
location.insert_one({"city" : "Linköping", "area" : "Ryd"})"""""

#Location


"""user.create_index([("email", ASCENDING)], unique=True)
#user.create_index([("PW_hash", ASCENDING)], unique=True)
user.insert_one(validation_rule)"""""
#user.insert_one({"email" : "johan.loven@gmail.com", "PW_hash" : "1234", "phoneNumber" : "0701234567", "name" : "Johan Loven", "PN" : "19990101-1234", "isVerified" : True, "university" : "Linköping University", "student_ID" : "abc123", "address" : "Storgatan 1", "location" : ObjectId("6601494cc589dfa2b4c4bf30")})



#Location collection
location = db["location"]
validation_rule = {
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

#location.create_index([("city", ASCENDING), ("area", ASCENDING)], unique=True)
"""location.insert_one(validation_rule)
location.insert_one({"city" : "Linköping", "area" : "Ryd"})"""""




#User collection
user = db["user"]
validation_rule = {
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
#user.insert_one(validation_rule)


#Location
location = db["location"]
validation_rule = {
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

"""location.insert_one(validation_rule)
location.insert_one({"city" : "Linköping", "area" : "Ryd"})"""""

#Location
user = db["user"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["email", "PW_hash", "phoneNumber", "name", "PN", "isVerified", "university", "student_ID", "address", "location"],
        "properties" : {
            "email" : {
                "bsonType" : "string",
                "description" : "Email of user"
            },
            "PW_hash" : {
                "bsonType" : "string",
                "description" : "Hashed password"
            },
             "phoneNumber" : {
                "bsonType" : "string",
                "description" : "Phone number of user"
            },
            "name" : {
                "bsonType" : "string",
                "description" : "Name of user"
            },
            "PN" : {
                "bsonType" : "string",
                "description" : "Personal number of user"
            },
             "isVerified" : {
                "bsonType" : "bool",
                "description" : "If user is verified"
            },
             "university" : {
                "bsonType" : "string",
                "description" : "University of user"
            },
             "student_ID" : {
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
        }
    }
}
"""user.create_index([("email", ASCENDING)], unique=True)
#user.create_index([("PW_hash", ASCENDING)], unique=True)
user.insert_one(validation_rule)"""""
#user.insert_one({"email" : "johan.loven@gmail.com", "PW_hash" : "1234", "phoneNumber" : "0701234567", "name" : "Johan Loven", "PN" : "19990101-1234", "isVerified" : True, "university" : "Linköping University", "student_ID" : "abc123", "address" : "Storgatan 1", "location" : ObjectId("6601494cc589dfa2b4c4bf30")})





# Advertisement collection
ad = db["advertisement"]
validation_rule = {
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

#ad.insert_one(validation_rule)
#ad.insert_one({"dishName" : "Köttbullar", "description" : "Bra mat", "cookDate" : datetime.datetime(2021,5,1), "quantity" : 5, "portionPrice" : 20.0, "imagePath" : "image.jpg", "sellerID" : ObjectId("60f0b1b3c589dfa2b4c4bf2f")})



# Ad_contains_protein collection
ad_contains_protein = db["ad_contains_protein"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["advertisement", "protein"],
        "properties" : {
            "advertisement" : {
                "bsonType" : "objectId",
                "description" : "Id of advertisement"
            },
            "protein" : {
                "bsonType" : "objectId",
                "description" : "Type of protein"
            } 
        }
    }
}

#ad_contains_protein.create_index([("advertisement", ASCENDING), ("protein", ASCENDING)], unique=True)
#ad_contains_protein.insert_one(validation_rule)
"""ad_contains_protein.insert_one({"advertisement" : ObjectId("660153bed6271ac7cda390aa"), "protein" : ObjectId("65f58feaa5d9518927339597")})"""""


# Ad_contains_allergy collection
ad_contains_allergy= db["ad_contains_allergy"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["advertisement", "allergy"],
        "properties" : {
            "advertisement" : {
                "bsonType" : "objectId",
                "description" : "Id of advertisement"
            },
            "allergy" : {
                "bsonType" : "objectId",
                "description" : "Type of allergy"
            } 
        }
    }
}

#ad_contains_allergy.create_index([("advertisement", ASCENDING), ("allergy", ASCENDING)], unique=True)
#ad_contains_allergy.insert_one(validation_rule)
#ad_contains_allergy.insert_one({"advertisement" : ObjectId("660153bed6271ac7cda390aa"), "allergy" : ObjectId("65f58b8a760b3ad4e3459265")})


# Purchase collection
purchase = db["purchase"]
validation_rule = {
    "$jsonSchema" : {
        "bsonType" : "object",
        "required" : ["date", "totalPrice", "quantity", "sellerRating", "reviewText", "buyer", "seller", "advertisement"],
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
#purchase.insert_one(validation_rule)
"""purchase.insert_one({"date" : datetime.datetime(2021,5,1) ,
                    "totalPrice" : 20.0, 
                    "quantity" : 5, 
                    "sellerRating" : 4.5, 
                    "reviewText" : "Bra mat", 
                    "buyer" : ObjectId("6601539871f145239905fc1a"), 
                    "seller" : ObjectId("6601539871f145239905fc1a"),
                    "advertisement" : ObjectId("660153bed6271ac7cda390aa")})"""

