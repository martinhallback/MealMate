from main import db
from main import bcrypt
from main import app
from flask import request
from flask import jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default = False, nullable=False)
    password_hash = db.Column(db.String, nullable = False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
   
    @app.route('/sign-up', methods = ['POST'])
    def sign_up():
        return jsonify({'error' : 'Path not yet defined'}), 401     

    @app.route('/login', methods =['GET', 'POST'])
    def login():
        if request.method == 'GET':
            return jsonify({'error' : 'Path not yet defined'}), 401    
        elif request.method == 'POST':
            return jsonify({'error' : 'Path not yet defined'}), 401   

    def __repr__(self):
        return '<user {}: {}, email: {}, is_admin: {}>'.format(self.id, self.name, self.email, self.is_admin)
   
    def serialize(self):
        return dict(test="Test")
