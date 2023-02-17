from flask import Flask, render_template, request,jsonify
from flask_cors import CORS, cross_origin

from chat import get_response

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.get("/")
@cross_origin(supports_credentials=True)
def index_get():
    return render_template("base.html")

@app.post("/predict")
@cross_origin(supports_credentials=True)
def predict():
    text=request.get_json().get("message")
    # TODO: check if text is valid
    response=get_response(text)
    message={"answer":response}
    return jsonify(message)


if __name__=="__main__":
    app.run(debug=True)