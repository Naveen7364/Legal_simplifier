import { useState } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  const messages = [
    "📄 Reading your document...",
    "🔍 Identifying key clauses...",
    "⚖️ Analyzing legal terms...",
    "🚨 Detecting red flags...",
    "📊 Calculating risk score...",
    "✅ Almost done...",
  ];

  const handleUpload = async (file) => {
    setAnalysis(null);
    setLoading(true);
    setError(null);
    setFilename(file.name);

    let i = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingMsg(messages[i]);
    }, 2000);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://legal-simplifier-backend-g0eq.onrender.com/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setFilename("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚖️ Legal Simplifier</h1>
        <p>Upload any legal document and we'll explain it in plain English</p>
      </header>

      <main className="main">
        <Upload onUpload={handleUpload} loading={loading} />

        {filename && !loading && (
          <div className="filename-tag">
            📄 {filename}
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>{loadingMsg}</p>
          </div>
        )}

        {analysis && (
          <>
            <div className="disclaimer">
              ⚠️ This analysis is AI-generated and not a substitute for
              professional legal advice. Always consult a qualified lawyer
              for important decisions.
            </div>
            <Results analysis={analysis} />
            <button className="reset-btn" onClick={handleReset}>
              🔄 Upload New Document
            </button>
          </>
        )}
      </main>

      <footer className="footer">
        <p>
Built by <strong>Naveen</strong> <span style={{color: "#ef4444"}}>❤️</span> 
<span style={{color: "#334155"}}>|</span>{" "}
          <a href="https://github.com/Naveen7364/Legal_simplifier" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </p>
        <p className="footer-sub">
          Powered by React · Flask · PyMuPDF · OpenRouter AI
        </p>
      </footer>
    </div>
  );
}

export default App;