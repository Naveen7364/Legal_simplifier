# ⚖️ Legal Simplifier

An AI-powered web app that simplifies complex legal documents into plain English. Upload any PDF contract, rental agreement, or terms & conditions document and instantly get a summary, key points, red flags, and a risk score.

## 🎯 Problem It Solves

Most people sign legal documents without fully understanding what they're agreeing to. Legal Simplifier reads the document for you and explains it in simple, everyday language — helping users make informed decisions and spot risky clauses before signing.

## ✨ Features

- 📄 Upload any PDF legal document
- 📋 Get a plain-English summary
- ✅ Extract key points and obligations
- 🚨 Automatically detect red flags and risky clauses
- ⚠️ Risk score (1-10) with explanation
- 🎨 Clean, modern dark-themed UI
- ⚡ Real-time AI analysis

## 🛠️ Tech Stack

**Frontend:** React, Vite, Axios, CSS3
**Backend:** Python, Flask, Flask-CORS
**AI:** OpenRouter API (Llama 3.1 8B Instruct)
**PDF Processing:** PyMuPDF (fitz)

## 🚀 How It Works

1. User uploads a PDF document via the React frontend
2. Flask backend extracts text using PyMuPDF
3. Extracted text is sent to an LLM via OpenRouter API with a structured prompt
4. AI returns a structured analysis (summary, key points, red flags, risk score)
5. Frontend parses and displays results in an organized, visual format

## 📦 Installation & Setup

### Backend
\`\`\`bash
cd backend
python -m venv venv
venv\\Scripts\\activate
pip install flask flask-cors PyMuPDF openai python-dotenv
\`\`\`

Create a `.env` file in the backend folder:
\`\`\`
OPENROUTER_API_KEY=your_api_key_here
\`\`\`

Run the backend:
\`\`\`bash
python app.py
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Visit `http://localhost:5173`

## 📸 Screenshots

*(Add screenshots here)*

## 🔮 Future Improvements

- Chat with the document (ask follow-up questions)
- Multi-language support
- Document comparison feature
- Export analysis as PDF report
- User authentication and history

## 👤 Author

**Naveen Varma**
Final Year B.Tech CSE Student

## 📄 License

This project is for educational purposes as part of a final year academic project.