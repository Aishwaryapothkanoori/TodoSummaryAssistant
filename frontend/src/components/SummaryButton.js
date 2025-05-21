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
    <button style={{
       backgroundColor: 'rgba(33, 132, 231, 0.55)',      
    color: 'rgba(1, 13, 25, 0.88)',                 
    border: 'rgba(11, 55, 216, 0.98)',    
    padding: '0.75rem',
    width: '40%',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    
    }}
      onClick={handleSummarize}
      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
    >
      Summarize & Send to Slack
    </button>
  );
};

export default SummaryButton;
