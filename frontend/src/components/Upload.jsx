function Upload({ onUpload, loading }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Please upload a PDF file only");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Please drop a PDF file only");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="upload-box"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="upload-icon">⚖️</div>
      <h2>Upload Your Legal Document</h2>
      <p>
        Drag & drop your PDF here or click the button below
        <br />
        Supports rental agreements, contracts, T&C, offer letters
      </p>
      <label className="upload-btn">
        {loading ? "⏳ Analyzing..." : "📄 Choose PDF File"}
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          disabled={loading}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}

export default Upload;