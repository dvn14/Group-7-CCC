from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
import json

AVAILABLE_AREAS = ["aus", "nsw"]
LOCAL_DATA_DIR = "data/"
COUCHDB_TIMEOUT = 10
CONFIG_FILE = "config.json"

app = Flask(__name__)
cors = CORS(app)
config = None

with open(CONFIG_FILE) as config_file:
    config = json.load(config_file)

@app.route("/areas")
def areas():
    resultText = json.dumps(AVAILABLE_AREAS)
    return Response(resultText, mimetype="application/json")
    
@app.route("/summaries/<area>")
def summaries(area):
    resultText = ""

    if area not in AVAILABLE_AREAS:
        return resultText, 404
    
    try:
        result = requests.get(config["couchDbUrl"] 
            + area + "-summary", timeout=COUCHDB_TIMEOUT)
        resultText = result.text
    except:
        with open(LOCAL_DATA_DIR + area + "-summary.json") as local_file:
            resultText = local_file.readlines()
            
    return Response(resultText, mimetype="application/json")

@app.route("/indices/<area>")
def indices(area):
    resultText = ""

    if area not in AVAILABLE_AREAS:
        return resultText, 404
    
    try:
        result = requests.get(config["couchDbUrl"] 
            + area + "_aurin_indexes", timeout=COUCHDB_TIMEOUT)
        resultText = result.text
    except:
        with open(LOCAL_DATA_DIR + area + "-index.json") as local_file:
            resultText = local_file.readlines()

    return Response(resultText, mimetype="application/json")

if __name__ == '__main__':
    app.run(debug=False)
