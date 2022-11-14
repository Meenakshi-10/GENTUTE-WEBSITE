import nltk
from nltk.tokenize import sent_tokenize, word_tokenize 
from nltk.text import Text
from nltk.stem import WordNetLemmatizer 
from nltk.tokenize import regexp_tokenize
from nltk.tag import pos_tag
import re
import json
lemmatizer = WordNetLemmatizer()

#Done by Naveen
def startPos(tag):
    return tag[0]
def preprocess(txt,lines):
    steps=sent_tokenize(txt)
    json={}
    stepNum=1
    for step in steps:
        regexTags=[]
        for rule in lines:
            tag,regex=rule.split('->')
            regex=regex.strip()
            for match in re.finditer(regex, step):
                regexTags.append([match.start(),match.end(),match.group(),tag])
        start=0
        regexTags.sort(key=startPos)
        print(regexTags)
        json[stepNum]=[]
        if len(regexTags)==0:
            """ words=nltk.word_tokenize(step)
            tags=pos_tag(words)
            json[stepNum]+=tags """
        else:
            for tag in regexTags:
                """ words=nltk.word_tokenize(step[start:tag[0]])
                tags=pos_tag(words) """
                if not tag[2][-1].isalnum():
                    tag[2]=tag[2][:(len(tag[2])-1)]
                json[stepNum]+=([(tag[2].strip(),tag[3])])
                start=tag[1]
            """ words=nltk.word_tokenize(step[start:])
            tags=pos_tag(words)
            json[stepNum]+=tags """
        stepNum+=1
    return json

#Done by Meenakshi
def generate_json(d):
    step = 1
    step_dic = {}
    while step in d:
        step_list = []
        action=[]
        for tag in d[step]:
            print(tag)
            if tag[1] in ["heat","add","filter"]:
                dic={tag[1]:tag[0]}

                action.append(dic)
                continue
            matchObj = re.search(r"[\s]?([a-z]+)[-](metal|salt|solution|crystal|flame|precipitate|litmus)[\s\.]?", tag[1])
            if(matchObj!=None):
                dic = {}
                dic[matchObj.group(2)] = matchObj.group(1)
                chem = {}
                chem["chemicals/"+matchObj.group(2)] = matchObj.group(1)
                #print(chem)
                step_list.append(chem)
            else:
                dic = {}
                dic[tag[1]] = tag[0]
                #print(dic)
                step_list.append(dic)
        step_dic[step] = action+step_list
        step += 1
    step_json = json.dumps(step_dic, indent=4)
    with open("tagged_text.json", "w") as outfile:
        outfile.write(step_json)
    return step_json
            
def nlp(inputText):
    file=open(r'./regexTags.txt',"r")
    lines=file.readlines()
    d = preprocess(inputText,lines)
    return generate_json(d)