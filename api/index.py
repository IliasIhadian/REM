import base64
from flask import Flask, request
from flask_cors import CORS
from PIL import Image 
import requests
from io import BytesIO

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/api/python" , methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/inputs", methods=["POST"], )
def create_todo_item():
    data = request.get_data()
    byte_array = bytearray(data)

    encoded_data = base64.b64encode(bytes(byte_array)).decode('utf-8') # Encode bytearray to base64)
    img = Image.open(BytesIO(base64.b64decode(encoded_data)))
    img.show()



    
    """image = data.get("image")
    if not image:
        return {"error": "image is required"}, 400
    
    trimap = data.get("trimap")
    if not image:
        return {"error": "trimap is required"}, 400
    """
    
    return "data", 201

