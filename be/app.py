from flask import Flask, request, jsonify
from create_dataset import start_capture
from create_classifier import train_classifier
from Detector import main_app  
from flask_cors import CORS


from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="my_geocoder")

app = Flask(__name__)
CORS(app)  


@app.route('/add-name', methods=['POST'])
def add_name():
    try:
        # Extract the name from the request body
        data = request.json
        name = data.get('name')
        
        # Open the file in append mode and write the name
        with open('name.txt', 'a') as file:
            file.write(name + '\n')
        
        return jsonify({'message': f'Name "{name}" added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/capture-dataset', methods=['POST'])
# def capture_dataset():
#     username = ??
#     num_images = start_capture(username) 
#     return jsonify({'message': f'Dataset captured successfully. Number of images: {num_images}'}), 200

@app.route('/capture-dataset', methods=['POST'])
def capture_dataset():
    # Read the last username from the name.txt file
    with open('name.txt', 'r') as file:
        lines = file.readlines()
        username = lines[-1].strip()

    # Start the dataset capture process with the obtained username
    num_images = start_capture(username) 

    return jsonify({'message': f'Dataset captured successfully. Number of images: {num_images}'}), 200


@app.route('/train-model', methods=['POST'])
def train_model():
    # username = 'hi'
    with open('name.txt', 'r') as file:
        lines = file.readlines()
        username = lines[-1].strip()

    num_images = 310
    if not username:
        return jsonify({'error': 'Username not provided'}), 400

    if num_images < 300:
        return jsonify({'error': 'Not enough data. Capture at least 300 images'}), 400

    train_classifier(username)

    return jsonify({'message': 'Model trained successfully'}), 200

@app.route('/face-recognition', methods=['POST'])
def face_recognition():
    with open('name.txt', 'r') as file:
        lines = file.readlines()
        username = lines[-1].strip()
    try:
        data = request.json
        
        name = username
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        to_email = data.get('to_email')

        result = main_app(name, latitude, longitude, to_email)

        if result:
            return jsonify({'message': 'Face recognition completed', 'result': result}), 200
        else:
            return jsonify({'message': 'Face recognition failed :('}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/face-recognition', methods=['POST'])
# def face_recognition():
#     try:
#         data = request.json
        
#         # Extract necessary data from the request
#         name = data.get('name')
#         latitude = data.get('latitude')
#         longitude = data.get('longitude')
#         to_email = data.get('to_email')

#         # Make a request to the main.py script to perform face recognition
#         response = requests.post('http://localhost:8000/face-recognition', json=data)
#         result = response.json()

#         # Return the result to the client
#         return jsonify(result), response.status_code
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/geocode-address')
def geocode_address():
    try:
        address = "Mumbai"
        location = geolocator.geocode(address)
        if location:
            return jsonify({'message': f'Location: {location.latitude}, {location.longitude}'})
        else:
            return jsonify({'error': 'Address not found.'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/reverse-geocode', methods=['GET'])
def reverse_geocode():
    try:
        latitude = 19.0760
        longitude = 72.8777
        location = geolocator.reverse((latitude, longitude))
        if location:
            return jsonify({'message': f'Address: {location.address}'})
        else:
            return jsonify({'error': 'Coordinates not found.'})
    except Exception as e:
        return jsonify({'error': str(e)})
    


@app.route('/tryy', methods=['GET'])
def tryy():
    return jsonify({'message': 'hi'}), 200


if __name__ == '__main__':
    app.run(debug=True)