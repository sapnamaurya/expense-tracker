from flask import Flask, jsonify
from insights import generate_insights

app = Flask(__name__)

@app.route("/", methods=["GET"])
def insights():
    data = generate_insights()
    return jsonify(data)  # ✅ ye line zaroori hai!

if __name__ == "__main__":
    app.run(port=4000)
