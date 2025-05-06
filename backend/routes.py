from flask import Blueprint, jsonify
from backend.ml_logic import generate_insights

api = Blueprint('api', __name__)

@api.route('/', methods=['GET'])
def insights():
    print("Root route accessed")
    data = generate_insights()
    return jsonify(data)

@api.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is running"})
def insights():
    print("Root route accessed")
    data = generate_insights()
    print("Generated data:", data)
    print("Type:", type(data))
    return jsonify(data)