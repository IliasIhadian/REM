from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/python" , methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/todos", methods=["POST"])
def create_todo_item():
    data = request.get_json()
    
    image = data.get("image")
    if not image:
        return {"error": "image is required"}, 400
    
    trimap = data.get("trimap")
    if not image:
        return {"error": "trimap is required"}, 400

    
    return null, 201

