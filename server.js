const express = require('express');
const fetch = require('node-fetch');
const config = require('config');
const app = express();

const PORT = config.get('port') || 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Error: URL query parameter is required');
  }

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
