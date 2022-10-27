#from crypt import methods
from urllib import request
from flask import Flask,jsonify,request
from NaturalLanguageProcessing import * 
from ComputerGraphics import *
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'GENTUTE SERVER!'

@app.route('/process_experiment',methods=['POST'])
def process_experiment():
    if request.method == 'POST':
        experiment=json.loads(request.data)
        steps=sent_tokenize(experiment["text"])
        nlp(experiment["text"])
        cgi()
        data={'steps':steps}
        return jsonify(data)
