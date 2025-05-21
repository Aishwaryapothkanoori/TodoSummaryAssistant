import React from "react";
import axios from "axios";

const SummaryButton = ({ onSummaryComplete }) => {
  const handleSummarize = async () => {
    try {
      const res = await axios.post("http://localhost:5000/summarize");
      onSummaryComplete("Summary sent successfully!");
    } catch (error) {
      console.error(error);
      onSummaryComplete("Failed to send summary.");
    }
  };

  return (
    <button
      onClick={handleSummarize}
      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
    >
      Summarize & Send to Slack
    </button>
  );
};

export default SummaryButton;
