import base64
import re
import string
from flask import Flask, request
from flask_cors import CORS
from PIL import Image 
from pyparsing import Regex
import requests
from io import BytesIO

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/api/python" , methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/inputs", methods=["POST"], )
def create_todo_item():
    """  tmp = request.form.get("Image")
    print(request, request.form, tmp, request.get_data()) """

    tmp = request.get_json()
    
    img = tmp["Image"]
    img = Image.open(BytesIO(base64.b64decode(img)))
    img.show()
    
    tri = tmp["Trimap"]
    tri = Image.open(BytesIO(base64.b64decode(tri)))
    tri.show()


    """print(request.get_data("Image"))
    print(request.values)
    print(request.values.get("image.png")) """



    """  image = request.get_data("Image")
    trimap = request.get_data("Trimap")

    
    image_byte_array = bytearray(image)
    image_encoded_data = base64.b64encode(bytes(image_byte_array)).decode('utf-8') # Encode bytearray to base64)
    with open('out.txt', 'w') as f:
        print(( image_encoded_data), file=f)  # Python 3.x
    img = Image.open(BytesIO(base64.b64decode(image_encoded_data)))
    
    trimap_byte_array = bytearray(trimap)
    trimap_encoded_data = base64.b64encode(bytes(trimap_byte_array)).decode('utf-8') # Encode bytearray to base64)
    tri = Image.open(BytesIO(base64.b64decode(trimap_encoded_data)))

    
    img.show()
    tri.show() """



    
    """image = data.get("image")
    if not image:
        return {"error": "image is required"}, 400
    
    trimap = data.get("trimap")
    if not image:
        return {"error": "trimap is required"}, 400
    """
    
    return "data", 201

