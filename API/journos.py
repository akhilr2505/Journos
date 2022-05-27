from flask import Flask, request
import ktrain
from flask_cors import CORS
from flask_restful import Resource, Api
import json


app = Flask(__name__)
CORS(app)
api = Api(app)

def find_emotion(journal):
    predictor = ktrain.load_predictor("models_opt/")
    model_builder = ktrain.get_predictor(predictor.model, predictor.preproc)
    sample_de = 'I was very excited today as it was my first day in college and explore the surroundings of the campus. At the same time, I also had a strange feeling on how would I cope with others. The college was very big and my classroom was very spacious. Since it was the first day of my college, I wanted to create a good impression on teachers. Initially, I was a bit shy but somehow gave a short introduction about myself. In the evening, I was feeling a tad unhappy as i had to forego my old friends'
    parts = journal.split(".")
    joy=0
    sadness=0
    anger=0
    fear=0
    neutral=0
    for i in parts:
        predictions = model_builder.predict(i)
        if predictions == 'joy':
            joy+=1
        elif predictions == 'sadness':
            sadness+=1
        
        elif predictions == 'anger':
            anger+=1
            
        if predictions == 'neutral':
            neutral+=1
            
        elif predictions == 'fear':
            fear+=1
    emotion_arr=[anger, fear, sadness, neutral, joy]

    finalString=json.dumps(str(emotion_arr))

    return finalString





class journos(Resource):

    def get(self):
        query = request.args.get('query')

        emotion_values= find_emotion(query)

        return emotion_values

api.add_resource(journos, '/')

if __name__ == '__main__':
    app.run(debug=True)