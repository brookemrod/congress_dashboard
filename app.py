from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json

# Create an instance of Flask
app = Flask(__name__)

file_data = {}

with open('data/legislators-historical.json') as f:
    file_data= json.load(f)


print(file_data)




client = MongoClient('localhost', 27017)
db = client['congress_db']
first_name = db['name']['first']
last_name = db['name']['last']
dob = db['bio']['birthday']
gender = db['bio']['gender']
state = db['terms']['state']
startTerm = db['terms']['start']
endTerm = db['terms']['end']
party = db['terms']['party']
legislatorType = db['terms']['type']

# Use PyMongo to establish Mongo connection

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    destination_data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", vacation=destination_data)


if __name__ == "__main__":
    app.run(debug=True)
