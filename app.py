from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import cv2
from flask_cors import CORS, cross_origin
import base64
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model


app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})

mod = load_model('model.h5')


@app.route('/')
@cross_origin()
def index():
    return "connection established"


@app.route('/predict', methods=['GET', 'POST'])
# @cross_origin()
def process():
    pred = ""
    if request.method == 'GET':
        return 'This is a GET request'
    elif request.method == 'POST':
        base64_image = request.get_data()
        image_data = base64.b64decode(base64_image.split(b',')[1])
        image_bytes = base64.b64decode(image_data)
        image_array = np.frombuffer(image_data, dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        # print(image)
        down_width = 100
        down_height = 100
        down_points = (down_width, down_height)
        img = cv2.resize(image, down_points, interpolation=cv2.INTER_LINEAR)
        reshape_img = img.reshape(1, 100, 100, 3)
        pred = predict(reshape_img)
        return pred


def predict(img):
    y_pred = mod.predict(img)
    y_pred = y_pred > 0.5
    if(y_pred == 0):
        pred = 'Dog'
    else:
        pred = 'Cat'

    return pred


if __name__ == '__main__':
    app.run()
