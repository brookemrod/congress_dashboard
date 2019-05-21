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
    db.collection.drop()
    with open('data/legislators-historical.json') as data_file:
        data = json.load(data_file)
        for item in data:
            # key = {"id": item['id']['govtrack']}
            # data = {first_name: item['name']['first'],
            #     last_name: item['name']['last'],
            #     dob: item['bio']['birthday'],
            #     gender: item['bio']['gender'],
            #     state: item['terms']['state'],
            #     startTerm: item['terms']['start'],
            #     endTerm: item['terms']['end'],
            #     party: item['terms']['party'],
            #     legislatorType: item['terms']['type']
            #     }
            mongo.db.collection.insert_one.(item)
    # Find one record of data from the mongo database
    congress_data = mongo.db.collection.find_all.()
    
    # Return template and data
    return render_template("index.html", congress_data=congress_data)


if __name__ == "__main__":
    app.run(debug=True)
