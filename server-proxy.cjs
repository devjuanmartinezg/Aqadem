const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, codigoHost'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 🔹 LOGIN
app.post('/api/login_check', async (req, res) => {
  const codigoHostHeader = (req.headers['codigohost'] || 'TESTAQ').toUpperCase();

  console.log('🔥 Proxy login body recibido:', req.body);
  console.log('🧩 Header codigoHost:', codigoHostHeader);

  try {
    const { data } = await axios.post(
      'https://api-dev.reqorda.net/api/login_check',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'codigoHost': codigoHostHeader
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    console.log('✅ Token recibido:', data.token ? '(token OK)' : '(sin token)');
    res.json(data);
  } catch (error) {
    console.error('❌ Error proxy login:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Proxy login error',
      details: error.response?.data || error.message,
    });
  }
});

// 🔹 Proxy para resto de APIs
app.use('/api/AQADEM', async (req, res) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200);

  try {
    const url = `https://api-dev.reqorda.net${req.originalUrl}`;
    const headers = {
      ...req.headers,
      host: 'api-dev.reqorda.net',
      'codigoHost': (req.headers['codigohost'] || 'TESTAQ').toUpperCase(),
    };

    console.log(`🔹 Proxy general → ${req.method} ${req.originalUrl}`);
    const { data } = await axios({
      method: req.method,
      url,
      headers,
      data: req.body,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error proxy general:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Proxy general error',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(4300, () => {
  console.log('✅ Proxy activo en http://localhost:4300 → https://api-dev.reqorda.net');
});
