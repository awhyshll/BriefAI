import { useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Section() {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const geminiAI = new GoogleGenerativeAI("AIzaSyB_4WPWLaDBYFBKjPVsraNSHXltmDiICDA");
    const model = geminiAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = event.target.url.value;
        if (!url) return;

        setLoading(true);
        setError('');
        setSummary('');

        try {
            // scradpped data
            const { data } = await axios.post('http://localhost:5000/scrape', { url });
            const pageText = data.summary;

            // summarization by gemini
            const prompt = `
                Summarize the following content while following these guidelines:
                - **Use headings** to organize key topics.
                - **Use bullet points** for easy readability.
                - **Explain in simple terms** so anyone can understand.
                - **Ensure the summary is at least 30%** of the original text.
                - **Suggest related resources give link** for further reading.

                Here is the document content: 
                ${pageText}
            `;

            const result = await model.generateContent(prompt);
            const geminiSummary = await result.response.text(); 

            setSummary(geminiSummary);
        } catch (err) {
            setError("❌ Failed to summarize the webpage. Please try again.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="text-white text-center py-20">
            <h1 className="text-4xl font-bold">Summarize Documents Instantly</h1>
            <p className="mt-4 text-lg">Save time with AI-powered document summarization.</p>

            <div className="flex flex-col items-center justify-center md:flex-row gap-6 p-6 rounded-lg">
                <div className="w-full md:w-1/2 bg-sky-50 p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Summarize from URL</h2>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="url"
                            placeholder="Enter URL"
                            required
                            className="border text-black border-gray-300 p-2 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Summarizing..." : "Summarize URL"}
                        </button>
                    </form>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {summary && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-800 text-left">
                            <h3 className="font-bold text-lg mb-2">📜 Extracted Summary:</h3>
                            <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Section;
