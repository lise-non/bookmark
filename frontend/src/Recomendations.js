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
    <div>
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Thinking..." : "✨ Get Recommendations"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendations.map((book, i) => (
        <div key={i}>
          <strong>{book.title}</strong> by {book.author}
          <p>{book.reason}</p>
        </div>
      ))}
    </div>
  );
}

export default Recomendations;
