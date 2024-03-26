#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from serverAuth import credentialConfig
from datetime import timedelta

import certifi
ca = certifi.where()

logout_timer = timedelta(days=1)

#Application configuration
app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SECRET_KEY'] = "d23796e2834c3ed59ac6482bb656a802273e8aa755c851469aabe23347ab3b29" #Protects versus cross site access

app.config["JWT_SECRET_KEY"] = "fhuiYUEFnpur3r276h54fh63era65qjhs6p84ki485jurje749rumaWHFn"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = logout_timer
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

#DB connection
uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/?retryWrites=true&w=majority&appName={}".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
databaseClient = MongoClient(uri,  tlsCAFile=ca)
db = databaseClient["mealMate"]

#Project files


# Do we need to import the classes? Probably not.


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