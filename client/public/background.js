import cheerio from "cheerio"; // Import Cheerio (must bundle it for Chrome)

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "scrape_and_summarize") {
    try {
      const response = await fetch(message.url);
      const html = await response.text();

      // Load the HTML into Cheerio
      const $ = cheerio.load(html);
      
      // Extract text from specific elements (e.g., paragraphs)
      let extractedText = "";
      $("p").each((i, elem) => {
        extractedText += $(elem).text() + "\n";
      });

      console.log("Extracted Text:", extractedText);

      // Send this text to Gemini API for summarization
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=AIzaSyB_4WPWLaDBYFBKjPVsraNSHXltmDiICDA",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Summarize this:\n\n${extractedText}`,
            max_tokens: 300
          })
        }
      );

      const geminiData = await geminiResponse.json();
      sendResponse({ summary: geminiData.candidates[0].output || "Error generating summary" });

    } catch (error) {
      sendResponse({ summary: "Error: " + error.message });
    }
  }
  return true;
});
