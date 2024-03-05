#!/usr/bin/env python3
from flask import Flask
from flask import abort
from flask import jsonify
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token 
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'password123456'
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String, nullable=False)
    model = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return '<Car {}: {} {}'.format(self.id, self.make, self.model)

    def serialize(self):
        user_info = self.user.serialize() if self.user else None
        return dict(id=self.id, make=self.make, model=self.model, user=user_info)
    
class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    cars = db.relationship('Car', backref='user', lazy=True)
    is_admin = db.Column(db.Boolean, default = False)

    def __repr__(self):
        return '<User {}: {} {}'.format(self.id, self.name, self.email)

    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email, is_admin=self.is_admin)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf8')

    
@app.route('/sign-up', methods = ['POST'])
def sign_up():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': 'User already exists'}), 409

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : "User created successfully"}), 201

@app.route('/hello')
def hello():
    return jsonify("Hello, World!")


@app.route('/cars' , methods=['GET', 'POST'])
@jwt_required()
def cars():
     if request.method == 'GET':
        all_cars = Car.query.all() 
        cars_list = [car.serialize() for car in all_cars]  
        return jsonify(cars_list)  
     elif request.method == 'POST':
        data = request.get_json()
        new_car = Car(make=data['make'], model=data['model'])

        if 'user_id' in data:
            user = User.query.get(data['user_id'])
            if user:
                new_car.user = user

        db.session.add(new_car) # Lägg till bil
        db.session.commit()  # Spara nya bilen i databasen
        return jsonify(new_car.serialize()), 201 

@app.route('/cars/<int:car_id>' , methods=['GET', 'PUT' , 'DELETE'])
@jwt_required()
def get_car(car_id):
    car = Car.query.get(car_id)  
    if car is None:
        abort(404) 

    if request.method == 'GET':
        return jsonify(car.serialize())  
    
    elif request.method == 'PUT':
         data = request.get_json()
         if 'make' in data:
            car.make = data['make']
         if 'model' in data:
            car.model = data['model']
         if 'user_id' in data and data['user_id'] is not None:
            user = User.query.get(data['user_id'])
            car.user = user if user else abort(404) 
         else: 
             car.user = None

         db.session.commit()  #Sparar ändring i databasen
         return jsonify(car.serialize()), 200
    
    elif request.method == 'DELETE':
        db.session.delete(car)
        db.session.commit()
        return '', 200
    
@app.route('/users' , methods=['GET', 'POST'])
@jwt_required()
def users():
     if request.method == 'GET':
        all_users = User.query.all() 
        user_list = [user.serialize() for user in all_users]  
        return jsonify(user_list)  
     elif request.method == 'POST':
        data = request.get_json()
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user) # Lägg till kund
        db.session.commit()  # Spara nya kunden i databasen
        return jsonify(new_user.serialize()), 201 
     

@app.route('/users/<int:user_id>' , methods=['GET', 'PUT' , 'DELETE'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)  
    if user is None:
        abort(404) 

    if request.method == 'GET':
        return jsonify(user.serialize())  
    
    elif request.method == 'PUT':
         data = request.get_json()
         if 'name' in data:
            user.name = data['name']
         if 'email' in data:
            user.email = data['email']
         if 'is_admin' in data:
             user.is_admin = data['is_admin']
         db.session.commit()

         return jsonify(user.serialize()), 200
    
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return '', 200
    

@app.route('/users/<int:user_id>/cars')
@jwt_required()
def get_user_cars(user_id):    
        user = User.query.get(user_id)  
        if user is None:
            abort(404)

        all_cars = user.cars
        cars_list = [{"id": car.id, "make": car.make, "model": car.model} for car in all_cars]  
        return jsonify(cars_list) 


@app.route("/")
def client():
  return app.send_static_file("client.html")

@app.route('/login' , methods=['POST'])
def login():
    login_candidate = request.get_json()
    user_list = User.query.all()

    for user in user_list:
        if login_candidate['email'] == user.email and bcrypt.check_password_hash(user.password_hash, login_candidate['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify(token = access_token, user = user.serialize())
        
    return jsonify({"msg": "Wrong username or password"}), 401


@app.route('/cars/<int:car_id>/booking', methods=['POST'])
@jwt_required()
def bookingcar(car_id):
    car = Car.query.get(car_id)
    if request.method == 'POST':
        data = request.get_json()
        if 'user_id' in data:
            if User.query.get(data['user_id']) and car.user_id == None:
                car.user_id = data['user_id']
                db.session.commit()

                return jsonify(True)

        return jsonify(False)
        
if __name__ == "__main__": 
    app.run(port=5002) # På MacOS, byt till 5001 eller dylikt
