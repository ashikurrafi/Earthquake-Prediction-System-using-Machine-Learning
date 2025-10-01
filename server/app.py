# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import tensorflow as tf
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models and scalers
try:
    # Load neural network model
    model = tf.keras.models.load_model('earthquake_model.h5')
    
    # Load scalers
    with open('scaler_X.pkl', 'rb') as f:
        scaler_X = pickle.load(f)
    with open('scaler_y.pkl', 'rb') as f:
        scaler_y = pickle.load(f)
    
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")

def predict_earthquake(timestamp, latitude, longitude):
    """Predict earthquake magnitude and depth"""
    # Prepare input
    X_input = np.array([[timestamp, latitude, longitude]], dtype='float32')
    
    # Scale input
    X_input_scaled = scaler_X.transform(X_input)
    
    # Predict
    y_pred_scaled = model.predict(X_input_scaled, verbose=0)
    y_pred = scaler_y.inverse_transform(y_pred_scaled)
    
    magnitude = float(y_pred[0][0])
    depth = float(y_pred[0][1])
    
    return magnitude, depth

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract parameters
        latitude = float(data.get('latitude'))
        longitude = float(data.get('longitude'))
        
        # If date is provided, convert to timestamp, otherwise use current time
        if 'date' in data and data['date']:
            date_str = data['date']
            dt = datetime.strptime(date_str, '%Y-%m-%d')
            timestamp = time.mktime(dt.timetuple())
        else:
            timestamp = time.time()
        
        # Validate inputs
        if not (-90 <= latitude <= 90):
            return jsonify({'error': 'Latitude must be between -90 and 90'}), 400
        
        if not (-180 <= longitude <= 180):
            return jsonify({'error': 'Longitude must be between -180 and 180'}), 400
        
        # Make prediction
        magnitude, depth = predict_earthquake(timestamp, latitude, longitude)
        
        # Prepare response
        response = {
            'latitude': latitude,
            'longitude': longitude,
            'timestamp': timestamp,
            'date': datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d'),
            'prediction': {
                'magnitude': round(magnitude, 2),
                'depth': round(depth, 2)
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)