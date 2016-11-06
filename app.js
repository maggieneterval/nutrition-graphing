const express = require('express');
const app = express();
const path = require('path');
const requestify = require('requestify');
const USDA_API_KEY = process.env.USDA_API_KEY;

app.use(express.static(path.join('public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(process.env.PORT || 5000);
