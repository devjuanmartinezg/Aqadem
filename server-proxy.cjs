// server-proxy.cjs
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

// Parsear JSON en requests
app.use(bodyParser.json());

// 🔹 Middleware CORS global para Ionic
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 🔹 Proxy para login
app.post('/api/login_check', async (req, res) => {
  console.log('🔥 Proxy login body recibido:', req.body); // solo muestra username, password y codigoHost

  try {
    const { data } = await axios.post(
      'https://api-dev.reqorda.net/api/login_check',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    console.log('✅ Proxy login token devuelto:', data.token || '(sin token)');
    res.json(data);
  } catch (error) {
    console.error('❌ Error proxy login:', error.response?.data || error.message || error);
    res.status(error.response?.status || 500).json({
      error: 'Error occurred while trying to proxy login request',
      details: error.response?.data || error.message
    });
  }
});

// 🔹 Proxy general para APIs de Aqadem
app.use('/api/AQADEM', async (req, res) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200);

  try {
    const url = `https://api-dev.reqorda.net${req.originalUrl}`;
    const headers = { ...req.headers, host: 'api-dev.reqorda.net' };
    if (req.headers['authorization']) headers['Authorization'] = req.headers['authorization'];

    const { data } = await axios({
      method: req.method,
      url,
      headers,
      data: req.body,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error proxy general:', error.response?.data || error.message || error);
    res.status(error.response?.status || 500).json({
      error: 'Proxy error',
      details: error.response?.data || error.message
    });
  }
});

app.listen(4300, () => {
  console.log('✅ Proxy activo en http://localhost:4300 → https://api-dev.reqorda.net');
});
