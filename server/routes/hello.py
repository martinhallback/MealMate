from main import app
from flask import jsonify

@app.route('/hello')
def hello():
   return jsonify("Hello, World!")
