from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        text = extract_text_from_pdf(file)

        if not text.strip():
            return jsonify({"error": "Could not extract text from PDF"}), 400

        prompt = f"""You are a legal document analyzer. Analyze this legal document and provide:

1. SUMMARY: A plain English summary of what this document is about (3-4 sentences)
2. KEY POINTS: List the 5 most important things the person is agreeing to
3. RED FLAGS: List any concerning clauses or things to watch out for
4. RISK SCORE: Give a risk score from 1-10 (1=very safe, 10=very risky) with a brief reason

Format your response exactly like this:
SUMMARY:
[your summary here]

KEY POINTS:
- [point 1]
- [point 2]
- [point 3]
- [point 4]
- [point 5]

RED FLAGS:
- [red flag 1]
- [red flag 2]

RISK SCORE:
[Write only number like 7]/10 - [reason]

Here is the document:
{text[:4000]}"""

        response = client.chat.completions.create(
    model="meta-llama/llama-3.1-8b-instruct",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.1
)

        result = response.choices[0].message.content
        print("RESULT:", result)
        return jsonify({"analysis": result})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Legal Simplifier API is running!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)