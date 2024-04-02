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

"""collection.insert_one({"type" : "Beef", "class" : "Meat"})
collection.insert_one({"type" : "Pork", "class" : "Meat"})
collection.insert_one({"type" : "Lamb", "class" : "Meat"})
collection.insert_one({"type" : "Venison", "class" : "Meat"})
collection.insert_one({"type" : "Other", "class" : "Meat"})"""

"""collection.insert_one({"type" : "Chicken", "class" : "Poultry"})
collection.insert_one({"type" : "Turkey", "class" : "Poultry"})
collection.insert_one({"type" : "Duck", "class" : "Poultry"})
collection.insert_one({"type" : "Other", "class" : "Poultry"})"""

"""collection.insert_one({"type" : "Salmon", "class" : "Fish"})
collection.insert_one({"type" : "Tuna", "class" : "Fish"})
collection.insert_one({"type" : "Cod", "class" : "Fish"})
collection.insert_one({"type" : "Herring", "class" : "Fish"})
collection.insert_one({"type" : "Other", "class" : "Fish"})"""

"""collection.insert_one({"type" : "Shrimp", "class" : "Seafood"})
collection.insert_one({"type" : "Crab", "class" : "Seafood"})
collection.insert_one({"type" : "Other", "class" : "Seafood"})"""

"""collection.insert_one({"type" : "Cheese", "class" : "Vegetarian"})
collection.insert_one({"type" : "Cottage cheese", "class" : "Vegetarian"})
collection.insert_one({"type" : "Quark", "class" : "Vegetarian"})
collection.insert_one({"type" : "Eggs", "class" : "Vegetarian"})
collection.insert_one({"type" : "Other", "class" : "Vegetarian"})"""

"""collection.insert_one({"type" : "Beans", "class" : "Vegan"})
collection.insert_one({"type" : "Tofu", "class" : "Vegan"})
collection.insert_one({"type" : "Lentils", "class" : "Vegan"})
collection.insert_one({"type" : "Chickpeas", "class" : "Vegan"})
collection.insert_one({"type" : "Other", "class" : "Vegan"})"""

#Populating the Allergy collection
collection = db["allergy"]

"""collection.insert_one({"type" : "Peanuts"})
collection.insert_one({"type" : "Tree nuts"})
collection.insert_one({"type" : "Milk"})
collection.insert_one({"type" : "Eggs"})
collection.insert_one({"type" : "Wheat"})
collection.insert_one({"type" : "Gluten"})
collection.insert_one({"type" : "Soy"})
collection.insert_one({"type" : "Fish"})
collection.insert_one({"type" : "Shellfish"})
collection.insert_one({"type" : "Sesame seeds"})
collection.insert_one({"type" : "Mustard"})
collection.insert_one({"type" : "Other"})"""
# For the "Other" option there should be a text right beside it that instructs the seller to include in the description all allergies that are not shown in the given list.
