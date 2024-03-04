#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity



app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

#Project files
import userClasses



#Route import
from os.path import dirname, basename, isfile, join #isfile was used in addition to isfile(f) in the if statement
import glob
"""
modules = glob.glob(join(dirname(__file__), "routes", "*.py"))
__all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]
"""

route_files = glob.glob(join(dirname(__file__), "routes", "*.py"))
for route in route_files:
    if isfile(route) and not route.endswith('__init__.py'):
        module_name = basename(route)[:-3]
        module = __import__(f'routes.{module_name}', fromlist=[''])  # Import module
        if hasattr(module, 'bp'):  # Check if module has a 'bp' attribute (Blueprint)
            app.register_blueprint(module.bp)



if __name__ == "__main__":
   app.run(port=5001, debug=True) # På MacOS, byt till 5001 eller dylikt