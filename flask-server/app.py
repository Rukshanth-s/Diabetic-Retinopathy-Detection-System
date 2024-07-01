# app.py
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import io

app = Flask(__name__)
model = load_model('model/retina_weights.hdf5')

class_names = []
with open('model/labels.txt', 'r') as f:
    class_names = [a.strip().split(' ')[1] for a in f.readlines()]

@app.route('/classify', methods=['POST'])
def classify_image():
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read()))

    image = ImageOps.fit(image, (256, 256), Image.LANCZOS)
    image_array = np.asarray(image, dtype=np.float32) / 255.0
    data = image_array.reshape(-1, 256, 256, 3)

    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    return jsonify({
        'className': class_name,
        'confidenceScore': float(confidence_score)
    })

if __name__ == '__main__':
    app.run(port=5001)
