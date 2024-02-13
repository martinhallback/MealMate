#!/usr/bin/env python3
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)


@app.route('/hello')
def hello():
   return jsonify("Hello, World!")

if __name__ == "__main__":
   app.run(port=5001, debug=True) # På MacOS, byt till 5001 eller dylikt