from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

@app.route("/recommend", methods=["POST"])
def recommend():
    film_name = request.get_json().get("film_name")

    if not film_name:
        return jsonify({"error": "film_name is required"}), 400
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f'Watched "{film_name}". What should I watch next? Respond in less than 50 words'
        )
        return jsonify({"recommendation": response.text})
    except Exception:
        return jsonify({"error": "Could not get a recommendation"}), 502
    
if __name__ == "__main__":
    app.run(port=5001, debug=True)