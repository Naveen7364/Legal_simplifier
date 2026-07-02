# ⚖️ Legal Simplifier

An AI-powered web app that simplifies complex legal documents into plain English. Upload any PDF contract, rental agreement, or terms & conditions document and instantly get a summary, key points, red flags, and a risk score.

## 🌐 Live Demo

- **Frontend:** [legal-simplifier-fjgukcch5-naveen-futurebuilders.vercel.app](https://legal-simplifier-fjgukcch5-naveen-futurebuilders.vercel.app)
- **Backend API:** [legal-simplifier-backend-g0eq.onrender.com](https://legal-simplifier-backend-g0eq.onrender.com)

## 🎯 Problem It Solves

Most people sign legal documents without fully understanding what they're agreeing to. Legal Simplifier reads the document for you and explains it in simple, everyday language — helping users make informed decisions and spot risky clauses before signing.

## ✨ Features

- 📄 Upload any PDF legal document (drag & drop supported)
- 📋 Get a plain-English summary
- ✅ Extract key points and obligations
- 🚨 Automatically detect red flags and risky clauses
- ⚠️ Risk score (1-10) with color-coded visual indicator
- 🎨 Clean, modern dark-themed UI
- ⚡ Real-time AI analysis

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Axios, CSS3 |
| Backend | Python, Flask, Flask-CORS |
| AI Model | OpenRouter API (Llama 3.1 8B Instruct) |
| PDF Processing | PyMuPDF (fitz) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

## 🚀 How It Works

1. User uploads a PDF document via the React frontend
2. Flask backend receives the file and extracts text using PyMuPDF
3. Extracted text is sent to Llama 3.1 via OpenRouter API with a structured prompt
4. AI returns a structured analysis (summary, key points, red flags, risk score)
5. Frontend parses and displays results in an organized, visual format

## 🏗️ Project Structure

legal-simplifier/
├── backend/
│   ├── app.py              # Flask server & API routes
│   ├── .env                # API key (not committed)
│   └── requirements.txt
└── frontend/
└── src/
├── App.jsx         # Main React component
├── App.css         # Styling
└── components/
├── Upload.jsx  # PDF upload with drag & drop
└── Results.jsx # Analysis results display

## 📦 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenRouter API key (free at openrouter.ai)

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors PyMuPDF openai python-dotenv
```

Create a `.env` file in the backend folder:

OPENROUTER_API_KEY=********

Run the backend:
```bash
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## ☁️ Deployment

This project is deployed using free tier services:

- **Frontend** → Deployed on **Vercel** (automatic deployment from GitHub)
- **Backend** → Deployed on **Render** (Python Flask server)

## 🔮 Future Improvements

- Chat with the document (ask follow-up questions)
- Multi-language support (Telugu, Hindi)
- Word document (.docx) support
- OCR for scanned documents using pytesseract
- Document comparison feature
- Export analysis as PDF report
- Legality detection for fraudulent documents
- User authentication and history

## 👤 Author

**Naveen Varma**
Final Year B.Tech CSE — CMR College of Engineering & Technology, Hyderabad

## 📄 License

This project is for educational purposes as part of a final year academic project.