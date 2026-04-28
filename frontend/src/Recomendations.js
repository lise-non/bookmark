import "./App.css";
import React, { useState } from "react";

function Recomendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/recommendations/");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setRecommendations(data.recommendations);
    }
    setLoading(false);
  };

  return (
    <div className="rec-section">
      <div className="rec-header">
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            ✨ AI Recommendations
          </h2>
          <p className="rec-description">
            Based on your completed books, Claude will suggest what to read next.
          </p>
        </div>
        <button className="btn btn-accent" onClick={fetchRecommendations} disabled={loading}>
          {loading ? "Thinking..." : "Get Recommendations"}
        </button>
      </div>

      {error && <div className="rec-error">{error}</div>}

      {recommendations.length > 0 && (
        <div className="rec-list">
          {recommendations.map((book, i) => (
            <div key={i} className="rec-card">
              <div className="rec-number">{i + 1}</div>
              <div className="rec-content">
                <div className="rec-title">{book.title}</div>
                <div className="rec-author">by {book.author}</div>
                <div className="rec-reason">{book.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && recommendations.length === 0 && !error && (
        <p className="rec-empty">
          Mark some books as completed, then click the button for personalized recommendations.
        </p>
      )}
    </div>
  );
}

export default Recomendations;
