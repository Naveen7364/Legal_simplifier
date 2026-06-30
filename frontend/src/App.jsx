import { useState } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

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
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚖️ Legal Simplifier</h1>
        <p>Upload any legal document and we'll explain it in plain English</p>
      </header>
      <main className="main">
        <Upload onUpload={handleUpload} loading={loading} />
        {error && <div className="error">{error}</div>}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your document...</p>
          </div>
        )}
        {analysis && <Results analysis={analysis} />}
      </main>
    </div>
  );
}

export default App;