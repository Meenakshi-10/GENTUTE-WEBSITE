from flask import Flask, jsonify, request, json
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from ComputerGraphics import *
from NaturalLanguageProcessing import *
from flask_mongoengine import MongoEngine

app = Flask(__name__)
CORS(app)

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

app.config['MONGODB_SETTINGS'] = {
    'db': 'gentute',
    'host': 'localhost',
    'port': 5000
}
db = MongoEngine()
db.init_app(app)

class Experiment(db.Document):
    eid = db.IntField()
    obs = db.StringField()
    def to_json(self):
        return {"eid": self.eid,
                "obs": self.obs}

@app.route('/salt-analysis/', methods=['GET'])
def query_records():
    eid = request.args.get('eid')
    experiment = Experiment.objects(eid=eid).first()
    if not experiment:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(experiment.to_json())
