function Results({ analysis }) {
  const sections = {
    summary: "",
    keyPoints: [],
    redFlags: [],
    riskScore: "",
    riskReason: "",
  };

  const lines = analysis.split("\n");
  let current = "";

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    if (trimmed.includes("SUMMARY") && trimmed.includes(":")) {
      current = "summary";
    } else if (trimmed.includes("KEY POINTS") && trimmed.includes(":")) {
      current = "keyPoints";
    } else if (trimmed.includes("RED FLAGS") && trimmed.includes(":")) {
      current = "redFlags";
    } else if (trimmed.includes("RISK SCORE") && trimmed.includes(":")) {
      current = "riskScore";
    } else if ((trimmed.startsWith("*") || trimmed.startsWith("-")) && current === "keyPoints") {
      const point = trimmed.replace(/^[\*\-]\s*/, "").trim();
      if (point) sections.keyPoints.push(point);
    } else if ((trimmed.startsWith("*") || trimmed.startsWith("-")) && current === "redFlags") {
      const flag = trimmed.replace(/^[\*\-]\s*/, "").trim();
      if (flag) sections.redFlags.push(flag);
    } else if (current === "summary" && trimmed && !trimmed.includes("SUMMARY")) {
      sections.summary += trimmed + " ";
    } else if (current === "riskScore" && trimmed && !trimmed.includes("RISK SCORE")) {
      const parts = trimmed.split(/\s*-\s*/);
      if (parts[0]) sections.riskScore = parts[0].trim();
      if (parts[1]) sections.riskReason = parts.slice(1).join(" - ").trim();
    }
  });

  const riskNumber = parseInt(sections.riskScore);
  const riskClass =
    riskNumber <= 3 ? "risk-low" : riskNumber <= 6 ? "risk-medium" : "risk-high";
  const riskLabel =
    riskNumber <= 3 ? "Low Risk" : riskNumber <= 6 ? "Medium Risk" : "High Risk";

  return (
    <div className="results">
      <div className="results-top">
        {/* Summary */}
        <div className="result-card summary-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h2>Summary</h2>
          </div>
          <p>{sections.summary.trim() || "No summary available."}</p>
        </div>

        {/* Key Points */}
        <div className="result-card">
          <div className="card-header">
            <span className="card-icon">✅</span>
            <h2>Key Points</h2>
          </div>
          <ul className="key-points-list">
            {sections.keyPoints.length > 0 ? (
              sections.keyPoints.map((point, i) => <li key={i}>{point}</li>)
            ) : (
              <li>No key points found.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Red Flags */}
      <div className="result-card red-flags-card">
        <div className="card-header">
          <span className="card-icon">🚨</span>
          <h2>Red Flags</h2>
        </div>
        {sections.redFlags.length > 0 ? (
          <ul className="red-flags-list">
            {sections.redFlags.map((flag, i) => (
              <li key={i}>{flag}</li>
            ))}
          </ul>
        ) : (
          <p className="no-flags">✅ No major red flags found!</p>
        )}
      </div>

      {/* Risk Score */}
      <div className="result-card risk-score-card">
        <div className="card-header">
          <span className="card-icon">⚠️</span>
          <h2>Risk Score</h2>
        </div>
        <div className="risk-score-content">
          <div className={`risk-circle ${riskClass}`}>
            <span className="risk-number">{sections.riskScore || "?"}</span>
            <span className="risk-label">{riskLabel}</span>
          </div>
          <p className="risk-reason">
            <strong>{riskLabel}</strong>
            {sections.riskReason || "No risk details provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Results;