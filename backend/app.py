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
db_observations = mongodb_client.db.cation_observation

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

@app.route('/salt-analysis/get-experiment', methods=['GET'])
def query_records():
    eid = request.args.get('eid')
    res = db_cations.find_one({"EID":int(eid)})
    #out = [{'ID':i['EID'],'OBS':i['OBS']} for i in res]
    print(res)
    if not res:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify({'EID':res['EID'],'OBS':res['OBS'], 'IMG':res['IMG'], 'OPTIONS': res['OPTIONS']})

@app.route('/salt-analysis/next-observation',methods=['POST'])
def next_observation():
    if request.method == "POST":
        data = json.loads(request.data)
        print(data)
        eid = int(data["eid"])
        obs = data["obs"]
        res = db_observations.find_one({"$and": [{"EID": eid},{"OPTION":obs}]})
        #out = [{"NEXT_OBS":i["NEXT_OBS"]} for i in res]
        #print(out)
        return jsonify({'next_obs':res["NEXT_OBS"]})

