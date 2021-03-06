from flask import Flask, render_template, Response, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

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
    # Return template and data
    congress = mongo.db.collection.find()
    return render_template("index.html", congress=congress)

@app.route("/data")
def data():
    congress_dict = []
    # Find one record of data from the mongo database
    for results in db.congressman.find():
        congress_dict.append(results)
    
    return JSONEncoder().encode(congress_dict)

if __name__ == "__main__":
    app.run(debug=True)
