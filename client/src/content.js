(() => {
  chrome.runtime.sendMessage(
    { action: "scrape_and_summarize", url: window.location.href },
    (response) => {
      console.log("Summarized text:", response.summary);
    }
  );
})();
