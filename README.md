
# TinyLlama Chat Application

This project is a modern chat interface that connects to a TinyLlama language model running on a Flask backend.

## Project Structure

- **Frontend**: React application with TypeScript and Tailwind CSS
- **Backend**: Python Flask server that connects to a local Ollama instance running TinyLlama

## Frontend Setup

The frontend is built with React, TypeScript, and Tailwind CSS.

### Running the frontend:

```bash
# Navigate to the project directory
cd tinyLlama-chat

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

## Backend Setup

The backend requires Python with Flask and some additional packages.

### 1. Install Python dependencies:

```bash
pip install flask flask-cors requests
```

### 2. Make sure you have Ollama installed and TinyLlama pulled:

Download Ollama from [https://ollama.ai/](https://ollama.ai/)

Then pull the TinyLlama model:

```bash
ollama pull tinyllama
```

### 3. Save the following code as `server.py`:

```python
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
```

### 4. Run the backend server:

```bash
python server.py
```

The server will run at `http://localhost:5050`.

## Using the Application

1. Start the backend server
2. Start the frontend application
3. Open your browser to `http://localhost:8080`
4. Begin chatting with TinyLlama!

## Note

- Ensure Ollama is running with the TinyLlama model available
- The backend expects Ollama to be accessible at `http://localhost:11434`
- The frontend expects the backend to be accessible at `http://localhost:5050`
