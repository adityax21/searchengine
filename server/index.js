const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Require the cors module

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = ' AIzaSyAAxniqeCkKfL5td2lEMikK7XdNVVKsUoo '; // Replace with your Google Custom Search API key
const SEARCH_ENGINE_ID = '26c0ba5f1031845db'; // Replace with your Search Engine ID

app.post('/get_company_url', async (req, res) => {
    const companyName = req.body.company_name;

    try {
        const searchQuery = encodeURIComponent(companyName);
        const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

        const response = await axios.get(apiUrl);
        const items = response.data.items;

        if (items && items.length > 0) {
            res.json({ url: items[0].link });
        } else {
            res.status(404).json({ error: 'Company URL not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
