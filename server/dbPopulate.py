#!/usr/bin/env python3
import certifi
from pymongo import MongoClient, ASCENDING
from serverAuth import credentialConfig
#MongoDB connection
ca = certifi.where()
uri = "mongodb+srv://{}:{}@tddd83.cs9janp.mongodb.net/admin?retryWrites=true&w=majority&appName={}".format(credentialConfig["username"],credentialConfig["password"], credentialConfig["app_name"])
databaseClient = MongoClient(uri,  tlsCAFile=ca)

#db setup
db = databaseClient["mealMate"]


#Populating the Location collection
collection = db["location"]

"""collection.insert_one({"city" : "Linköping", "area" : "Ryd"})
collection.insert_one({"city" : "Linköping", "area" : "Valla"})
collection.insert_one({"city" : "Linköping", "area" : "Vallastaden"})
collection.insert_one({"city" : "Linköping", "area" : "T1"})
collection.insert_one({"city" : "Linköping", "area" : "Lambohov"})
collection.insert_one({"city" : "Linköping", "area" : "Gottfridsberg"})
collection.insert_one({"city" : "Linköping", "area" : "Åbylund"})
collection.insert_one({"city" : "Linköping", "area" : "Vasastaden"})
collection.insert_one({"city" : "Linköping", "area" : "Skäggetorp"})
collection.insert_one({"city" : "Linköping", "area" : "Innerstaden"})
collection.insert_one({"city" : "Linköping", "area" : "Garnisonen"})
collection.insert_one({"city" : "Linköping", "area" : "Ramshäll"})
collection.insert_one({"city" : "Linköping", "area" : "Berga"})
collection.insert_one({"city" : "Linköping", "area" : "Johannelund"})
collection.insert_one({"city" : "Linköping", "area" : "Tannefors"})
collection.insert_one({"city" : "Linköping", "area" : "Other"})"""


#Populating the Protein collection
collection = db["protein"]

"""collection.insert_one({"type" : "Beef", "source" : "Meat"})
collection.insert_one({"type" : "Pork", "source" : "Meat"})
collection.insert_one({"type" : "Lamb", "source" : "Meat"})
collection.insert_one({"type" : "Venison", "source" : "Meat"})
collection.insert_one({"type" : "Other", "source" : "Meat"})"""

"""collection.insert_one({"type" : "Chicken", "source" : "Poultry"})
collection.insert_one({"type" : "Turkey", "source" : "Poultry"})
collection.insert_one({"type" : "Duck", "source" : "Poultry"})
collection.insert_one({"type" : "Other", "source" : "Poultry"})"""

"""collection.insert_one({"type" : "Salmon", "source" : "Fish"})
collection.insert_one({"type" : "Tuna", "source" : "Fish"})
collection.insert_one({"type" : "Cod", "source" : "Fish"})
collection.insert_one({"type" : "Herring", "source" : "Fish"})
collection.insert_one({"type" : "Other", "source" : "Fish"})"""

"""collection.insert_one({"type" : "Shrimp", "source" : "Seafood"})
collection.insert_one({"type" : "Crab", "source" : "Seafood"})
collection.insert_one({"type" : "Other", "source" : "Seafood"})"""

"""collection.insert_one({"type" : "Cheese", "source" : "Vegetarian"})
collection.insert_one({"type" : "Cottage cheese", "source" : "Vegetarian"})
collection.insert_one({"type" : "Quark", "source" : "Vegetarian"})
collection.insert_one({"type" : "Eggs", "source" : "Vegetarian"})
collection.insert_one({"type" : "Other", "source" : "Vegetarian"})"""

"""collection.insert_one({"type" : "Beans", "source" : "Vegan"})
collection.insert_one({"type" : "Tofu", "source" : "Vegan"})
collection.insert_one({"type" : "Lentils", "source" : "Vegan"})
collection.insert_one({"type" : "Chickpeas", "source" : "Vegan"})
collection.insert_one({"type" : "Other", "source" : "Vegan"})"""

#Populating the Allergy collection
collection = db["allergy"]

"""collection.insert_one({"type" : "Peanuts"})
collection.insert_one({"type" : "Tree nuts"})
collection.insert_one({"type" : "Milk"})
collection.insert_one({"type" : "Lactose"})
collection.insert_one({"type" : "Eggs"})
collection.insert_one({"type" : "Wheat"})
collection.insert_one({"type" : "Gluten"})
collection.insert_one({"type" : "Soy"})
collection.insert_one({"type" : "Fish"})
collection.insert_one({"type" : "Shellfish"})
collection.insert_one({"type" : "Sesame seeds"})
collection.insert_one({"type" : "Mustard"})"""

#Populating the University collection
collection = db["university"]

"""collection.insert_one({"name" : "Linköpings universitet"})"""
