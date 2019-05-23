from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json

# Create an instance of Flask
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/congress_app")

client = MongoClient('localhost', 27017)
db = client['congress_db']
collection = db['congressman']

# Use PyMongo to establish Mongo connection

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    with open('data/legislators-historical.json') as data_file:
        data = json.load(data_file)
    # Find one record of data from the mongo database
    for d in data:
        collection.insert_one(d)  
    # Return template and data
    congress_data = mongo.db.collection.find()
    return render_template("index.html", congress_data=congress_data)


if __name__ == "__main__":
    app.run(debug=True)
