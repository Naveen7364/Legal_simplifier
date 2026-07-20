function Results({ analysis }) {
  const sections = {
    summary: "",
    keyPoints: [],
    redFlags: [],
    riskScore: "",
    riskReason: "",
  };

  // First try to extract risk score from entire text
  const globalRiskMatch = analysis.match(/(\d+)\s*\/\s*10/);
  if (globalRiskMatch) {
    sections.riskScore = globalRiskMatch[1];
  }

  const lines = analysis.split("\n");
  let current = "";

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.includes("SUMMARY") && trimmed.includes(":")) {
      current = "summary";
    } else if (trimmed.includes("KEY POINTS") && trimmed.includes(":")) {
      current = "keyPoints";
    } else if (trimmed.includes("RED FLAGS") && trimmed.includes(":")) {
      current = "redFlags";
    } else if (trimmed.includes("RISK SCORE") && trimmed.includes(":")) {
      current = "riskScore";
      // Check if score is on same line as RISK SCORE:
      const sameLine = trimmed.split(":").slice(1).join(":").trim();
      if (sameLine) {
        const m = sameLine.match(/(\d+)\s*\/\s*10/);
        if (m) sections.riskScore = m[1];
        const di = sameLine.indexOf(" - ");
        if (di !== -1) sections.riskReason = sameLine.slice(di + 3).trim();
      }
    } else if (
      (trimmed.startsWith("*") || trimmed.startsWith("-")) &&
      current === "keyPoints"
    ) {
      const point = trimmed.replace(/^[\*\-]\s*/, "").replace(/\*\*/g, "").trim();
      if (point) sections.keyPoints.push(point);
    } else if (
      (trimmed.startsWith("*") || trimmed.startsWith("-")) &&
      current === "redFlags"
    ) {
      const flag = trimmed.replace(/^[\*\-]\s*/, "").replace(/\*\*/g, "").trim();
      if (flag) sections.redFlags.push(flag);
    } else if (current === "summary" && !trimmed.includes("SUMMARY")) {
      sections.summary += trimmed.replace(/\*\*/g, "") + " ";
    } else if (current === "riskScore" && !trimmed.includes("RISK SCORE")) {
      const m = trimmed.match(/(\d+)\s*\/\s*10/);
      if (m && !sections.riskScore) sections.riskScore = m[1];
      const di = trimmed.indexOf(" - ");
      if (di !== -1 && !sections.riskReason) {
        sections.riskReason = trimmed.slice(di + 3).replace(/\*\*/g, "").trim();
      } else if (!sections.riskReason && !m) {
        sections.riskReason = trimmed.replace(/\*\*/g, "").trim();
      }
    }
  });

  const riskNumber = parseInt(sections.riskScore);
  const riskClass =
    riskNumber <= 3 ? "risk-low" : riskNumber <= 6 ? "risk-medium" : "risk-high";
  const riskLabel =
    riskNumber <= 3 ? "Low Risk" : riskNumber <= 6 ? "Medium Risk" : "High Risk";
  const riskEmoji =
    riskNumber <= 3 ? "🟢" : riskNumber <= 6 ? "🟡" : "🔴";

  return (
    <div className="results">
      <div className="results-top">
        <div className="result-card summary-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h2>Summary</h2>
          </div>
          <p>{sections.summary.trim() || "No summary available."}</p>
        </div>

        <div className="result-card">
          <div className="card-header">
            <span className="card-icon">✅</span>
            <h2>Key Points</h2>
          </div>
          <ul className="key-points-list">
            {sections.keyPoints.length > 0 ? (
              sections.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))
            ) : (
              <li>No key points found.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="result-card red-flags-card">
        <div className="card-header">
          <span className="card-icon">🚨</span>
          <h2>Red Flags</h2>
          <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#64748b" }}>
            {sections.redFlags.length} found
          </span>
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

      <div className="result-card risk-score-card">
        <div className="card-header">
          <span className="card-icon">⚠️</span>
          <h2>Risk Score</h2>
          <span style={{ marginLeft: "auto", fontSize: "1.2rem" }}>
            {riskEmoji}
          </span>
        </div>
        <div className="risk-score-content">
          <div className={`risk-circle ${riskClass}`}>
            <span className="risk-number">
              {sections.riskScore || "?"}
            </span>
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