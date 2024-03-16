#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from serverAuth import credentialConfig

import certifi
ca = certifi.where()


#Application configuration
app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SECRET_KEY'] = "d23796e2834c3ed59ac6482bb656a802273e8aa755c851469aabe23347ab3b29" #Protects versus cross site access
uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/?retryWrites=true&w=majority&appName={}".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)
#db = SQLAlchemy(app)

databaseClient = MongoClient(uri,  tlsCAFile=ca)
db = databaseClient["mealMate"]
def testFunction():
    print(databaseClient.list_database_names())
    print(db)
    testTable = db["testTable"]
    print(databaseClient.list_database_names())

    testData = {"test1" : 6, "test2": 2}
    print(db.list_collection_names())
    test = testTable.insert_one(testData)
    testQuery= testTable.find({"test1" : 6})
    for test in testQuery:
        print(test)

if db is not None:
    print("db initialised")
else:
    print("db did not initialise properly")
#Project files
#import userClasses


#Route import
from os.path import dirname, basename, isfile, join #isfile was used in addition to isfile(f) in the if statement
import glob

route_files = glob.glob(join(dirname(__file__), "routes", "*.py"))
for route in route_files:
    if isfile(route) and not route.endswith('__init__.py'):
        module_name = basename(route)[:-3]
        module = __import__(f'routes.{module_name}', fromlist=[''])  # Import module
        if hasattr(module, 'bp'):  # Check if module has a 'bp' attribute (Blueprint)
            app.register_blueprint(module.bp)

if __name__ == "__main__":
   app.run(port=5002, debug=True) # På MacOS, byt till 5001 eller dylikt