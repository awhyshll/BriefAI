import React, { useState } from "react";

const PopUp = () => {
  const [summary, setSummary] = useState("Click the button to summarize!");

  const handleSummarize = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        { target: { tabId: tabs[0].id }, files: ["content.js"] },
        () => console.log("Content script injected")
      );
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.summary) setSummary(message.summary);
    });
  };

  return (
    <div style={{ padding: "10px", width: "300px" }}>
      <h2>Gemini Summarizer</h2>
      <button onClick={handleSummarize}>Summarize Page</button>
      <p>{summary}</p>
    </div>
  );
};

export default PopUp;
