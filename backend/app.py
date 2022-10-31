from unittest import result
from flask import Flask, jsonify, request, json
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from ComputerGraphics import *
from NaturalLanguageProcessing import *
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/gentute"
mongodb_client = PyMongo(app)
db_cations = mongodb_client.db.cation_test

@app.route('/process-experiment/',methods=['GET','POST'])
def process_experiment():
    try:
        if request.method == 'POST':
            experiment=json.loads(request.data)
            steps=sent_tokenize(experiment["text"])
            nlp(experiment["text"])
            cgi()
            data={}
            for i,step in enumerate(steps):
                data[str(i+1)]=str(step)
            print(data)
            #data={"post":"works"}
            data={"steps":steps}
            return json.dumps(data)
        elif request.method=='GET':
            return jsonify({'steps':"psych"})
    except Exception as e:
        print(e)
        data={'steps':""}
        return jsonify(data)

@app.route('/salt-analysis/', methods=['GET'])
def query_records():
    eid = request.args.get('eid')
    res = db_cations.find({"EID":int(eid)})
    out = [{'ID':i['EID'],'OBS':i['OBS']} for i in res]
    print(res)
    if not res:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(out)
