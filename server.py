
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "tinyllama", "prompt": user_input, "stream": True},
            stream=True
        )

        complete_response = ""
        for line in response.iter_lines():
            if line:
                try:
                    chunk = line.decode('utf-8')
                    data = json.loads(chunk)
                    complete_response += data.get("response", "")
                except json.JSONDecodeError:
                    print("Failed to decode:", chunk)
                    continue

        return jsonify({"response": complete_response.strip()})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
