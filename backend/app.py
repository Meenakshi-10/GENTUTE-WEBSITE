import logging

from flask import Flask, jsonify, request, json
from flask_cors import CORS
from nltk.tokenize import sent_tokenize

from ComputerGraphics import *
from NaturalLanguageProcessing import *

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
