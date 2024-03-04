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
    cars = db.relationship('Car', backref='Owner', foreign_keys='Car.userID')
    bookedCars = db.relationship('Car', backref='Booker', foreign_keys='Car.bookerID')
    is_admin = db.Column(db.Boolean, default = False, nullable=False)
    password_hash = db.Column(db.String, nullable = False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

   
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
   
    @app.route('/sign-up', methods = ['POST'])
    def sign_up():
        data = request.get_json()
        if not all(key in data for key in['name', 'email', 'password']):
         return jsonify({'error': "Invalid data provided"}), 400
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error" : "Email address already registered"}), 400

        new_user = User(name = data['name'], email = data['email'])
        new_user.set_password(data['password'])

        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message" : "User successfully created/registered"}), 200   

    @app.route('/login', methods =['GET', 'POST'])
    def login():
       if request.method == 'GET':
         return jsonify({'error' : 'Path not yet defined'}), 401    
       elif request.method == 'POST':
          data = request.get_json()
          if not all(key in data for key in['email', 'password']):
             return jsonify({'error': "Must enter both mail and password"}), 400
          #Verify.
          returnData = {}
          email = data['email']
          for usr in User.query.all():
             if usr.email == email:
                if usr.check_password(data['password']):
                   returnData['token'] = create_access_token(identity=email)
                   returnData['user'] = usr.serialize()
                   return jsonify(returnData), 200
                else:
                   return jsonify({'error': "Incorrect password", "errorCode": 2}), 401
          return jsonify({'error' : 'Path not yet defined'}), 401   

    def __repr__(self):
        return '<user {}: {}, email: {}, is_admin: {}>'.format(self.id, self.name, self.email, self.is_admin)
   
    def serialize(self):
        return dict(test="Test")
