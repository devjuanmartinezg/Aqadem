// server-proxy.cjs
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Parsear JSON
app.use(bodyParser.json());

// CORS para Ionic
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Proxy manual
app.post('/api/login_check', async (req, res) => {
  try {
    const { data } = await axios.post(
      'https://api-dev.reqorda.net/api/login_check',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // ignora certificado
      }
    );

    res.json(data);
  } catch (error) {
    console.error('❌ Error proxy:', error.message || error);
    res.status(error.response?.status || 500).json({
      error: 'Error occurred while trying to proxy request',
      details: error.response?.data || error.message
    });
  }
});

app.listen(4300, () => {
  console.log('✅ Proxy activo en http://localhost:4300 → https://api-dev.reqorda.net');
});
