from flask import Blueprint, jsonify
from backend.ml_logic import generate_insights

api = Blueprint('api', __name__)

@api.route('/api/insights', methods=['GET'])
def insights():
    data = generate_insights()
    return jsonify(data)
