const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());
app.post('/scrape', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });

        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(data);

        $('nav, footer, header, aside, .sidebar, .advertisement, .menu, .popup, .signup').remove();

        const paragraphs = $('article p, .content p, .blog-content p')
            .map((i, el) => $(el).text().trim())
            .get()
            .join('\n');

        res.json({summary: paragraphs });

    } catch (error) {
        console.error("Scraping Error:", error); // Log error
        res.status(500).json({ error: "Failed to scrape the webpage", details: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
